import 'package:cloud_firestore/cloud_firestore.dart';

enum UserRole { admin, student, instructor }

enum StudentStatus { active, inactive, suspended, graduated }

enum LessonStatus { scheduled, completed, cancelled, noShow }

// ─── User ────────────────────────────────────────────────────────────────────

class UserModel {
  final String uid;
  final String email;
  final String displayName;
  final String? photoUrl;
  final UserRole role;
  final DateTime createdAt;
  final DateTime? lastLogin;

  const UserModel({
    required this.uid,
    required this.email,
    required this.displayName,
    this.photoUrl,
    required this.role,
    required this.createdAt,
    this.lastLogin,
  });

  factory UserModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return UserModel(
      uid: doc.id,
      email: data['email'] as String,
      displayName: data['displayName'] as String,
      photoUrl: data['photoUrl'] as String?,
      role: UserRole.values.firstWhere(
        (r) => r.name == (data['role'] as String? ?? 'student'),
        orElse: () => UserRole.student,
      ),
      createdAt: (data['createdAt'] as Timestamp).toDate(),
      lastLogin: data['lastLogin'] != null
          ? (data['lastLogin'] as Timestamp).toDate()
          : null,
    );
  }

  Map<String, dynamic> toFirestore() => {
        'email': email,
        'displayName': displayName,
        'photoUrl': photoUrl,
        'role': role.name,
        'createdAt': Timestamp.fromDate(createdAt),
        'lastLogin': lastLogin != null ? Timestamp.fromDate(lastLogin!) : null,
      };

  UserModel copyWith({
    String? displayName,
    String? photoUrl,
    UserRole? role,
    DateTime? lastLogin,
  }) {
    return UserModel(
      uid: uid,
      email: email,
      displayName: displayName ?? this.displayName,
      photoUrl: photoUrl ?? this.photoUrl,
      role: role ?? this.role,
      createdAt: createdAt,
      lastLogin: lastLogin ?? this.lastLogin,
    );
  }
}

// ─── Student ─────────────────────────────────────────────────────────────────

class StudentModel {
  final String id;
  final String userId;
  final String firstName;
  final String lastName;
  final String email;
  final String phone;
  final DateTime? birthDate;
  final String? address;
  final StudentStatus status;
  final int totalHours;       // Total hours booked
  final int completedHours;   // Hours completed
  final DateTime enrollmentDate;
  final String? instructorId;
  final String? notes;

  const StudentModel({
    required this.id,
    required this.userId,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    this.birthDate,
    this.address,
    required this.status,
    required this.totalHours,
    required this.completedHours,
    required this.enrollmentDate,
    this.instructorId,
    this.notes,
  });

  String get fullName => '$firstName $lastName';

  double get progressPercent =>
      totalHours > 0 ? (completedHours / totalHours).clamp(0.0, 1.0) : 0.0;

  factory StudentModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return StudentModel(
      id: doc.id,
      userId: data['userId'] as String,
      firstName: data['firstName'] as String,
      lastName: data['lastName'] as String,
      email: data['email'] as String,
      phone: data['phone'] as String? ?? '',
      birthDate: data['birthDate'] != null
          ? (data['birthDate'] as Timestamp).toDate()
          : null,
      address: data['address'] as String?,
      status: StudentStatus.values.firstWhere(
        (s) => s.name == (data['status'] as String? ?? 'active'),
        orElse: () => StudentStatus.active,
      ),
      totalHours: (data['totalHours'] as num? ?? 0).toInt(),
      completedHours: (data['completedHours'] as num? ?? 0).toInt(),
      enrollmentDate: (data['enrollmentDate'] as Timestamp).toDate(),
      instructorId: data['instructorId'] as String?,
      notes: data['notes'] as String?,
    );
  }

  Map<String, dynamic> toFirestore() => {
        'userId': userId,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone,
        'birthDate': birthDate != null ? Timestamp.fromDate(birthDate!) : null,
        'address': address,
        'status': status.name,
        'totalHours': totalHours,
        'completedHours': completedHours,
        'enrollmentDate': Timestamp.fromDate(enrollmentDate),
        'instructorId': instructorId,
        'notes': notes,
      };
}

// ─── Lesson ──────────────────────────────────────────────────────────────────

class LessonModel {
  final String id;
  final String studentId;
  final String instructorId;
  final DateTime scheduledAt;
  final int durationMinutes;
  final LessonStatus status;
  final String? notes;
  final double? grade;

  const LessonModel({
    required this.id,
    required this.studentId,
    required this.instructorId,
    required this.scheduledAt,
    required this.durationMinutes,
    required this.status,
    this.notes,
    this.grade,
  });

  factory LessonModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return LessonModel(
      id: doc.id,
      studentId: data['studentId'] as String,
      instructorId: data['instructorId'] as String,
      scheduledAt: (data['scheduledAt'] as Timestamp).toDate(),
      durationMinutes: (data['durationMinutes'] as num? ?? 60).toInt(),
      status: LessonStatus.values.firstWhere(
        (s) => s.name == (data['status'] as String? ?? 'scheduled'),
        orElse: () => LessonStatus.scheduled,
      ),
      notes: data['notes'] as String?,
      grade: (data['grade'] as num?)?.toDouble(),
    );
  }

  Map<String, dynamic> toFirestore() => {
        'studentId': studentId,
        'instructorId': instructorId,
        'scheduledAt': Timestamp.fromDate(scheduledAt),
        'durationMinutes': durationMinutes,
        'status': status.name,
        'notes': notes,
        'grade': grade,
      };
}

// ─── Stats ───────────────────────────────────────────────────────────────────

class DashboardStats {
  final int totalStudents;
  final int activeStudents;
  final int lessonsToday;
  final int lessonsThisWeek;
  final double revenueThisMonth;

  const DashboardStats({
    required this.totalStudents,
    required this.activeStudents,
    required this.lessonsToday,
    required this.lessonsThisWeek,
    required this.revenueThisMonth,
  });

  factory DashboardStats.empty() => const DashboardStats(
        totalStudents: 0,
        activeStudents: 0,
        lessonsToday: 0,
        lessonsThisWeek: 0,
        revenueThisMonth: 0,
      );
}

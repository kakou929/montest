import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../models/app_models.dart';

// ─── Auth Service ─────────────────────────────────────────────────────────────

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  Future<UserModel?> signIn(String email, String password) async {
    final credential = await _auth.signInWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    final user = credential.user;
    if (user == null) return null;

    // Update last login
    await _db.collection('users').doc(user.uid).update({
      'lastLogin': FieldValue.serverTimestamp(),
    });

    return getUserProfile(user.uid);
  }

  Future<UserModel> registerStudent({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String phone,
  }) async {
    final credential = await _auth.createUserWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    final user = credential.user!;

    await user.updateDisplayName('$firstName $lastName');

    final userModel = UserModel(
      uid: user.uid,
      email: email,
      displayName: '$firstName $lastName',
      role: UserRole.student,
      createdAt: DateTime.now(),
    );

    // Save user profile
    await _db.collection('users').doc(user.uid).set(userModel.toFirestore());

    // Create student record
    await _db.collection('students').add(StudentModel(
      id: '',
      userId: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      status: StudentStatus.active,
      totalHours: 0,
      completedHours: 0,
      enrollmentDate: DateTime.now(),
    ).toFirestore());

    return userModel;
  }

  Future<void> signOut() => _auth.signOut();

  Future<void> sendPasswordResetEmail(String email) =>
      _auth.sendPasswordResetEmail(email: email.trim());

  Future<UserModel?> getUserProfile(String uid) async {
    final doc = await _db.collection('users').doc(uid).get();
    if (!doc.exists) return null;
    return UserModel.fromFirestore(doc);
  }
}

// ─── Student Service ──────────────────────────────────────────────────────────

class StudentService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Stream<List<StudentModel>> watchAllStudents() {
    return _db
        .collection('students')
        .orderBy('lastName')
        .snapshots()
        .map((snap) => snap.docs.map(StudentModel.fromFirestore).toList());
  }

  Stream<List<StudentModel>> watchActiveStudents() {
    return _db
        .collection('students')
        .where('status', isEqualTo: StudentStatus.active.name)
        .orderBy('lastName')
        .snapshots()
        .map((snap) => snap.docs.map(StudentModel.fromFirestore).toList());
  }

  Future<StudentModel?> getStudentByUserId(String userId) async {
    final snap = await _db
        .collection('students')
        .where('userId', isEqualTo: userId)
        .limit(1)
        .get();
    if (snap.docs.isEmpty) return null;
    return StudentModel.fromFirestore(snap.docs.first);
  }

  Future<void> updateStudent(String id, Map<String, dynamic> data) async {
    await _db.collection('students').doc(id).update(data);
  }

  Future<void> updateStudentStatus(String id, StudentStatus status) async {
    await _db
        .collection('students')
        .doc(id)
        .update({'status': status.name});
  }

  Future<void> deleteStudent(String id) async {
    await _db.collection('students').doc(id).delete();
  }

  Future<DashboardStats> getDashboardStats() async {
    final now = DateTime.now();
    final startOfDay = DateTime(now.year, now.month, now.day);
    final startOfWeek = startOfDay.subtract(Duration(days: now.weekday - 1));

    final studentsSnap = await _db.collection('students').get();
    final activeStudents = studentsSnap.docs
        .where((d) => (d.data()['status'] as String?) == 'active')
        .length;

    final todayLessons = await _db
        .collection('lessons')
        .where('scheduledAt',
            isGreaterThanOrEqualTo: Timestamp.fromDate(startOfDay))
        .where('scheduledAt',
            isLessThan: Timestamp.fromDate(startOfDay.add(const Duration(days: 1))))
        .count()
        .get();

    final weekLessons = await _db
        .collection('lessons')
        .where('scheduledAt',
            isGreaterThanOrEqualTo: Timestamp.fromDate(startOfWeek))
        .count()
        .get();

    return DashboardStats(
      totalStudents: studentsSnap.docs.length,
      activeStudents: activeStudents,
      lessonsToday: todayLessons.count ?? 0,
      lessonsThisWeek: weekLessons.count ?? 0,
      revenueThisMonth: 0, // TODO: implement payment tracking
    );
  }
}

// ─── Lesson Service ───────────────────────────────────────────────────────────

class LessonService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Stream<List<LessonModel>> watchStudentLessons(String studentId) {
    return _db
        .collection('lessons')
        .where('studentId', isEqualTo: studentId)
        .orderBy('scheduledAt', descending: true)
        .snapshots()
        .map((snap) => snap.docs.map(LessonModel.fromFirestore).toList());
  }

  Future<String> scheduleLesson(LessonModel lesson) async {
    final ref = await _db.collection('lessons').add(lesson.toFirestore());
    return ref.id;
  }

  Future<void> updateLessonStatus(String id, LessonStatus status) async {
    await _db.collection('lessons').doc(id).update({'status': status.name});
  }
}

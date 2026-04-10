import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/app_models.dart';
import '../services/firebase_service.dart';

// ─── Services ─────────────────────────────────────────────────────────────────

final authServiceProvider = Provider<AuthService>((ref) => AuthService());

final studentServiceProvider =
    Provider<StudentService>((ref) => StudentService());

final lessonServiceProvider =
    Provider<LessonService>((ref) => LessonService());

// ─── Auth state ───────────────────────────────────────────────────────────────

final authStateProvider = StreamProvider<User?>((ref) {
  return ref.watch(authServiceProvider).authStateChanges;
});

final currentUserProfileProvider = FutureProvider<UserModel?>((ref) async {
  final authState = ref.watch(authStateProvider);
  final user = authState.valueOrNull;
  if (user == null) return null;
  return ref.read(authServiceProvider).getUserProfile(user.uid);
});

// ─── Students ─────────────────────────────────────────────────────────────────

final allStudentsProvider = StreamProvider<List<StudentModel>>((ref) {
  return ref.watch(studentServiceProvider).watchAllStudents();
});

final activeStudentsProvider = StreamProvider<List<StudentModel>>((ref) {
  return ref.watch(studentServiceProvider).watchActiveStudents();
});

final dashboardStatsProvider = FutureProvider<DashboardStats>((ref) async {
  return ref.watch(studentServiceProvider).getDashboardStats();
});

// ─── Student self ─────────────────────────────────────────────────────────────

final myStudentProfileProvider = FutureProvider<StudentModel?>((ref) async {
  final authState = ref.watch(authStateProvider);
  final user = authState.valueOrNull;
  if (user == null) return null;
  return ref.read(studentServiceProvider).getStudentByUserId(user.uid);
});

final myLessonsProvider = StreamProvider<List<LessonModel>>((ref) {
  final student = ref.watch(myStudentProfileProvider).valueOrNull;
  if (student == null) return const Stream.empty();
  return ref.watch(lessonServiceProvider).watchStudentLessons(student.id);
});

// ─── Search / Filter ──────────────────────────────────────────────────────────

final studentSearchQueryProvider = StateProvider<String>((ref) => '');

final filteredStudentsProvider = Provider<List<StudentModel>>((ref) {
  final query = ref.watch(studentSearchQueryProvider).toLowerCase();
  final students = ref.watch(allStudentsProvider).valueOrNull ?? [];

  if (query.isEmpty) return students;

  return students.where((s) {
    return s.fullName.toLowerCase().contains(query) ||
        s.email.toLowerCase().contains(query) ||
        s.phone.contains(query);
  }).toList();
});

final studentStatusFilterProvider =
    StateProvider<StudentStatus?>((ref) => null);

final filteredByStatusProvider = Provider<List<StudentModel>>((ref) {
  final status = ref.watch(studentStatusFilterProvider);
  final students = ref.watch(filteredStudentsProvider);

  if (status == null) return students;
  return students.where((s) => s.status == status).toList();
});

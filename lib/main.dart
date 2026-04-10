import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:go_router/go_router.dart';
import 'firebase_options.dart';
import 'utils/app_theme.dart';
import 'screens/auth/login_screen.dart';
import 'screens/admin/admin_shell.dart';
import 'screens/admin/dashboard_screen.dart';
import 'screens/admin/students_screen.dart';
import 'screens/student/student_shell.dart';
import 'screens/student/student_home_screen.dart';
import 'screens/instructor/instructor_shell.dart';
import 'screens/instructor/instructor_home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const ProviderScope(child: MondialeApp()));
}

final _router = GoRouter(initialLocation: '/login', routes: [
  GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
  ShellRoute(
    builder: (_, __, child) => AdminShell(child: child),
    routes: [
      GoRoute(path: '/admin',              builder: (_, __) => const DashboardScreen()),
      GoRoute(path: '/admin/students',     builder: (_, __) => const StudentsScreen()),
      GoRoute(path: '/admin/enrollments',  builder: (_, __) => const _PH('Inscriptions')),
      GoRoute(path: '/admin/instructors',  builder: (_, __) => const _PH('Moniteurs')),
      GoRoute(path: '/admin/vehicles',     builder: (_, __) => const _PH('Véhicules')),
      GoRoute(path: '/admin/lessons',      builder: (_, __) => const _PH('Leçons')),
      GoRoute(path: '/admin/payments',     builder: (_, __) => const _PH('Paiements')),
      GoRoute(path: '/admin/quiz',         builder: (_, __) => const _PH('Quiz')),
      GoRoute(path: '/admin/settings',     builder: (_, __) => const _PH('Paramètres')),
    ],
  ),
  ShellRoute(
    builder: (_, __, child) => StudentShell(child: child),
    routes: [
      GoRoute(path: '/student',            builder: (_, __) => const StudentHomeScreen()),
      GoRoute(path: '/student/formation',  builder: (_, __) => const _PH('Formation')),
      GoRoute(path: '/student/panneaux',   builder: (_, __) => const _PH('Panneaux')),
      GoRoute(path: '/student/quiz',       builder: (_, __) => const _PH('Quiz')),
      GoRoute(path: '/student/profile',    builder: (_, __) => const _PH('Profil')),
    ],
  ),
  ShellRoute(
    builder: (_, __, child) => InstructorShell(child: child),
    routes: [
      GoRoute(path: '/instructor',          builder: (_, __) => const InstructorHomeScreen()),
      GoRoute(path: '/instructor/students', builder: (_, __) => const _PH('Mes Élèves')),
      GoRoute(path: '/instructor/lessons',  builder: (_, __) => const _PH('Mes Leçons')),
      GoRoute(path: '/instructor/messages', builder: (_, __) => const _PH('Messages')),
    ],
  ),
]);

class MondialeApp extends ConsumerWidget {
  const MondialeApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) => MaterialApp.router(
        title: 'Mondiale Auto-École',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light,
        routerConfig: _router,
      );
}

class _PH extends StatelessWidget {
  final String title;
  const _PH(this.title);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(
          child: Text('$title — à venir',
              style: const TextStyle(color: Color(0xFF6B7280))),
        ),
      );
}

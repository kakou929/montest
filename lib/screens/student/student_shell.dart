import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../providers/app_providers.dart';
import '../../utils/app_router.dart';
import '../../utils/app_theme.dart';
import '../../widgets/app_widgets.dart';

class StudentShell extends ConsumerWidget {
  final Widget child;
  const StudentShell({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userProfile = ref.watch(currentUserProfileProvider);
    final studentProfile = ref.watch(myStudentProfileProvider);
    final myLessons = ref.watch(myLessonsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.directions_car, size: 22),
            SizedBox(width: 8),
            Text('Mon Espace'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Déconnexion',
            onPressed: () => ref.read(authServiceProvider).signOut(),
          ),
        ],
      ),
      body: studentProfile.when(
        data: (student) {
          if (student == null) {
            return const AppErrorWidget(
              message: 'Profil élève introuvable. Contactez l\'administration.',
            );
          }
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Welcome banner
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [AppColors.primary, AppColors.primaryLight],
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      userProfile.when(
                        data: (user) => Text(
                          'Bonjour, ${user?.displayName ?? student.firstName} !',
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.w600),
                        ),
                        loading: () => const SizedBox.shrink(),
                        error: (_, __) => const SizedBox.shrink(),
                      ),
                      const SizedBox(height: 16),
                      // Progress bar
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Progression',
                              style: TextStyle(
                                  color: Colors.white70, fontSize: 13)),
                          Text(
                            '${student.completedHours}/${student.totalHours}h',
                            style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: LinearProgressIndicator(
                          value: student.progressPercent,
                          backgroundColor: Colors.white24,
                          valueColor: const AlwaysStoppedAnimation<Color>(
                              Colors.white),
                          minHeight: 10,
                        ),
                      ),
                    ],
                  ),
                ),

                // Next lesson
                const SectionHeader(title: 'Mes prochains cours'),
                myLessons.when(
                  data: (lessons) {
                    final upcoming = lessons
                        .where((l) =>
                            l.status == LessonStatus.scheduled &&
                            l.scheduledAt.isAfter(DateTime.now()))
                        .take(3)
                        .toList();

                    if (upcoming.isEmpty) {
                      return const EmptyState(
                        icon: Icons.event_available,
                        title: 'Aucun cours à venir',
                        subtitle:
                            'Contactez votre auto-école pour planifier un cours',
                      );
                    }

                    return Column(
                      children: upcoming
                          .map((lesson) => _LessonCard(lesson: lesson))
                          .toList(),
                    );
                  },
                  loading: () => const AppLoader(),
                  error: (e, _) => const AppErrorWidget(
                    message: 'Impossible de charger les cours.',
                  ),
                ),

                // My info card
                const SectionHeader(title: 'Mon profil'),
                Card(
                  margin: const EdgeInsets.symmetric(horizontal: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        _ProfileRow(
                            icon: Icons.person,
                            label: 'Nom complet',
                            value: student.fullName),
                        _ProfileRow(
                            icon: Icons.email,
                            label: 'Email',
                            value: student.email),
                        _ProfileRow(
                            icon: Icons.phone,
                            label: 'Téléphone',
                            value: student.phone),
                        if (student.address != null)
                          _ProfileRow(
                              icon: Icons.location_on,
                              label: 'Adresse',
                              value: student.address!),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          );
        },
        loading: () => const AppLoader(message: 'Chargement de votre profil...'),
        error: (e, _) => const AppErrorWidget(
          message: 'Impossible de charger votre profil.',
        ),
      ),
    );
  }
}

class _LessonCard extends StatelessWidget {
  final LessonModel lesson;
  const _LessonCard({required this.lesson});

  @override
  Widget build(BuildContext context) {
    final date = lesson.scheduledAt;
    final dateStr =
        '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
    final timeStr =
        '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppColors.primary.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: const Icon(Icons.directions_car, color: AppColors.primary),
        ),
        title: Text('Cours de conduite',
            style: Theme.of(context).textTheme.titleMedium),
        subtitle: Text('$dateStr à $timeStr — ${lesson.durationMinutes} min'),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.success.withOpacity(0.12),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Text('Prévu',
              style: TextStyle(
                  color: AppColors.success,
                  fontSize: 12,
                  fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }
}

class _ProfileRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _ProfileRow(
      {required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.primary),
          const SizedBox(width: 12),
          Text('$label : ',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textSecondary,
                  )),
          Expanded(
            child: Text(value,
                style: Theme.of(context).textTheme.bodyMedium,
                overflow: TextOverflow.ellipsis),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../models/app_models.dart';
import '../../providers/app_providers.dart';
import '../../utils/app_theme.dart';
import '../../widgets/app_widgets.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final statsAsync = ref.watch(dashboardStatsProvider);
    final activeStudentsAsync = ref.watch(activeStudentsProvider);

    return RefreshIndicator(
      onRefresh: () async {
        ref.invalidate(dashboardStatsProvider);
        ref.invalidate(activeStudentsProvider);
      },
      child: ListView(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 20, 16, 20),
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
                Text(
                  _greeting(),
                  style: const TextStyle(
                      color: Colors.white70, fontSize: 14),
                ),
                const SizedBox(height: 4),
                Text(
                  DateFormat('EEEE d MMMM yyyy', 'fr_FR').format(DateTime.now()),
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),

          // Stats grid
          statsAsync.when(
            data: (stats) => _StatsGrid(stats: stats),
            loading: () => const Padding(
              padding: EdgeInsets.symmetric(vertical: 32),
              child: AppLoader(message: 'Chargement des statistiques...'),
            ),
            error: (e, _) => AppErrorWidget(
              message: 'Impossible de charger les statistiques.',
              onRetry: () => ref.invalidate(dashboardStatsProvider),
            ),
          ),

          // Recent students
          const SectionHeader(title: 'Élèves actifs récents'),

          activeStudentsAsync.when(
            data: (students) {
              if (students.isEmpty) {
                return const EmptyState(
                  icon: Icons.people_outline,
                  title: 'Aucun élève actif',
                  subtitle: 'Ajoutez des élèves pour commencer',
                );
              }
              final recent = students.take(5).toList();
              return Column(
                children: recent
                    .map((s) => StudentListTile(student: s))
                    .toList(),
              );
            },
            loading: () => const AppLoader(),
            error: (e, _) => AppErrorWidget(
              message: 'Erreur lors du chargement des élèves.',
              onRetry: () => ref.invalidate(activeStudentsProvider),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  String _greeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Bonjour 👋';
    if (hour < 18) return 'Bon après-midi 👋';
    return 'Bonsoir 👋';
  }
}

class _StatsGrid extends StatelessWidget {
  final DashboardStats stats;
  const _StatsGrid({required this.stats});

  @override
  Widget build(BuildContext context) {
    final currencyFormat = NumberFormat.currency(locale: 'fr_FR', symbol: '€');

    return Padding(
      padding: const EdgeInsets.all(16),
      child: GridView.count(
        crossAxisCount: 2,
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 1.2,
        children: [
          StatCard(
            title: 'Total élèves',
            value: '${stats.totalStudents}',
            icon: Icons.school,
            color: AppColors.primary,
            subtitle: '${stats.activeStudents} actifs',
          ),
          StatCard(
            title: 'Cours aujourd\'hui',
            value: '${stats.lessonsToday}',
            icon: Icons.today,
            color: AppColors.accent,
          ),
          StatCard(
            title: 'Cours cette semaine',
            value: '${stats.lessonsThisWeek}',
            icon: Icons.calendar_view_week,
            color: AppColors.info,
          ),
          StatCard(
            title: 'Revenus du mois',
            value: currencyFormat.format(stats.revenueThisMonth),
            icon: Icons.euro,
            color: AppColors.success,
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../models/app_models.dart';
import '../../providers/app_providers.dart';
import '../../services/firebase_service.dart';
import '../../utils/app_theme.dart';
import '../../widgets/app_widgets.dart';

class StudentsScreen extends ConsumerWidget {
  const StudentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final students = ref.watch(filteredByStatusProvider);
    final allStudentsAsync = ref.watch(allStudentsProvider);

    return Column(
      children: [
        // Search and filters
        _SearchFilterBar(),

        // Status tabs
        _StatusFilterTabs(),

        // Student list
        Expanded(
          child: allStudentsAsync.when(
            data: (_) {
              if (students.isEmpty) {
                return const EmptyState(
                  icon: Icons.person_search,
                  title: 'Aucun élève trouvé',
                  subtitle: 'Modifiez les filtres ou ajoutez un élève',
                );
              }
              return RefreshIndicator(
                onRefresh: () async => ref.invalidate(allStudentsProvider),
                child: ListView.builder(
                  itemCount: students.length,
                  itemBuilder: (context, i) => StudentListTile(
                    student: students[i],
                    onTap: () => _showStudentDetail(context, ref, students[i]),
                  ),
                ),
              );
            },
            loading: () => const AppLoader(message: 'Chargement des élèves...'),
            error: (e, _) => AppErrorWidget(
              message: 'Erreur lors du chargement.',
              onRetry: () => ref.invalidate(allStudentsProvider),
            ),
          ),
        ),
      ],
    );
  }

  void _showStudentDetail(BuildContext context, WidgetRef ref, StudentModel student) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => _StudentDetailSheet(student: student),
    );
  }
}

class _SearchFilterBar extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Rechercher un élève...',
          prefixIcon: const Icon(Icons.search),
          suffixIcon: ref.watch(studentSearchQueryProvider).isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear),
                  onPressed: () =>
                      ref.read(studentSearchQueryProvider.notifier).state = '',
                )
              : null,
        ),
        onChanged: (v) =>
            ref.read(studentSearchQueryProvider.notifier).state = v,
      ),
    );
  }
}

class _StatusFilterTabs extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selected = ref.watch(studentStatusFilterProvider);

    final filters = <StudentStatus?, String>{
      null: 'Tous',
      StudentStatus.active: 'Actifs',
      StudentStatus.inactive: 'Inactifs',
      StudentStatus.graduated: 'Diplômés',
    };

    return SizedBox(
      height: 40,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        children: filters.entries.map((entry) {
          final isSelected = entry.key == selected;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: FilterChip(
              label: Text(entry.value),
              selected: isSelected,
              onSelected: (_) =>
                  ref.read(studentStatusFilterProvider.notifier).state =
                      entry.key,
              selectedColor: AppColors.primary.withOpacity(0.15),
              checkmarkColor: AppColors.primary,
              labelStyle: TextStyle(
                color: isSelected ? AppColors.primary : AppColors.textSecondary,
                fontWeight:
                    isSelected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _StudentDetailSheet extends ConsumerStatefulWidget {
  final StudentModel student;
  const _StudentDetailSheet({required this.student});

  @override
  ConsumerState<_StudentDetailSheet> createState() =>
      _StudentDetailSheetState();
}

class _StudentDetailSheetState extends ConsumerState<_StudentDetailSheet> {
  bool _isUpdating = false;

  Future<void> _updateStatus(StudentStatus newStatus) async {
    setState(() => _isUpdating = true);
    try {
      await ref
          .read(studentServiceProvider)
          .updateStudentStatus(widget.student.id, newStatus);
      if (mounted) Navigator.pop(context);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de la mise à jour.'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isUpdating = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.student;

    return DraggableScrollableSheet(
      initialChildSize: 0.6,
      minChildSize: 0.4,
      maxChildSize: 0.9,
      expand: false,
      builder: (context, scrollController) => SingleChildScrollView(
        controller: scrollController,
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Handle
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.divider,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 20),
            // Avatar + name
            Row(
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundColor: AppColors.primary.withOpacity(0.12),
                  child: Text(
                    s.firstName[0].toUpperCase(),
                    style: const TextStyle(
                        fontSize: 24,
                        color: AppColors.primary,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(s.fullName,
                          style: Theme.of(context).textTheme.titleLarge),
                      Text(s.email,
                          style: Theme.of(context).textTheme.bodySmall),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Info
            _InfoRow(icon: Icons.phone, label: 'Téléphone', value: s.phone),
            if (s.address != null)
              _InfoRow(icon: Icons.location_on_outlined, label: 'Adresse', value: s.address!),
            _InfoRow(
              icon: Icons.calendar_today,
              label: 'Inscrit le',
              value: '${s.enrollmentDate.day}/${s.enrollmentDate.month}/${s.enrollmentDate.year}',
            ),

            const SizedBox(height: 16),
            // Progress
            Text('Progression', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            LinearProgressIndicator(
              value: s.progressPercent,
              backgroundColor: AppColors.divider,
              valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
              minHeight: 8,
              borderRadius: BorderRadius.circular(4),
            ),
            const SizedBox(height: 4),
            Text('${s.completedHours}h complétées sur ${s.totalHours}h',
                style: Theme.of(context).textTheme.bodySmall),

            const SizedBox(height: 24),
            // Actions
            if (!_isUpdating) ...[
              if (s.status != StudentStatus.active)
                OutlinedButton.icon(
                  onPressed: () => _updateStatus(StudentStatus.active),
                  icon: const Icon(Icons.check_circle_outline),
                  label: const Text('Activer'),
                  style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.success),
                ),
              if (s.status == StudentStatus.active)
                OutlinedButton.icon(
                  onPressed: () => _updateStatus(StudentStatus.suspended),
                  icon: const Icon(Icons.pause_circle_outline),
                  label: const Text('Suspendre'),
                  style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.warning),
                ),
            ] else
              const AppLoader(),
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _InfoRow(
      {required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.textSecondary),
          const SizedBox(width: 8),
          Text('$label : ',
              style: Theme.of(context)
                  .textTheme
                  .bodySmall
                  ?.copyWith(color: AppColors.textSecondary)),
          Expanded(
            child: Text(value,
                style: Theme.of(context).textTheme.bodyMedium),
          ),
        ],
      ),
    );
  }
}

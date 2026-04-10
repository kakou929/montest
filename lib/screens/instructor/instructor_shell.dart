import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../utils/app_theme.dart';

class InstructorShell extends StatelessWidget {
  final Widget child;
  const InstructorShell({super.key, required this.child});

  static const _items = [
    (icon: Icons.dashboard_outlined, active: Icons.dashboard, label: 'Accueil',   path: '/instructor'),
    (icon: Icons.people_outline,      active: Icons.people,    label: 'Élèves',    path: '/instructor/students'),
    (icon: Icons.event_outlined,      active: Icons.event,     label: 'Leçons',    path: '/instructor/lessons'),
    (icon: Icons.chat_outlined,       active: Icons.chat,      label: 'Messages',  path: '/instructor/messages'),
  ];

  @override
  Widget build(BuildContext context) {
    final loc = GoRouterState.of(context).matchedLocation;
    final idx = _items.indexWhere((i) => loc.startsWith(i.path)).clamp(0, _items.length - 1);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppColors.card,
          border: Border(top: BorderSide(color: AppColors.borderCol)),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              children: _items.asMap().entries.map((e) {
                final on = e.key == idx;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => context.go(e.value.path),
                    behavior: HitTestBehavior.opaque,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(on ? e.value.active : e.value.icon,
                            size: 22, color: on ? AppColors.red : AppColors.textLight),
                        const SizedBox(height: 3),
                        Text(e.value.label,
                            style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w600,
                                color: on ? AppColors.red : AppColors.textLight)),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
        ),
      ),
    );
  }
}

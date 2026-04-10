import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';

class InstructorHomeScreen extends StatelessWidget {
  const InstructorHomeScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: AppColors.bg,
        appBar: AppBar(title: const Text('Tableau Moniteur')),
        body: const Center(
          child: Text(
            'Espace Moniteur · À développer',
            style: TextStyle(color: AppColors.textMid),
          ),
        ),
      );
}

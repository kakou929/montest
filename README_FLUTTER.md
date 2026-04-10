# Mondiale Auto Ecole - Application Mobile Flutter

Application mobile Flutter pour la gestion de l'auto-école Mondiale.

## Architecture

```
lib/
├── main.dart                          # Point d'entrée, initialisation Firebase
├── firebase_options.dart              # Config Firebase (à personnaliser)
├── utils/
│   ├── app_theme.dart                 # Thème, couleurs, polices
│   └── app_router.dart               # Routes GoRouter
├── models/
│   └── app_models.dart               # UserModel, StudentModel, LessonModel
├── services/
│   └── firebase_service.dart         # AuthService, StudentService, LessonService
├── providers/
│   └── app_providers.dart            # Providers Riverpod
├── widgets/
│   └── app_widgets.dart              # Widgets réutilisables
└── screens/
    ├── auth/
    │   └── login_screen.dart         # Écran de connexion
    ├── admin/
    │   ├── admin_shell.dart          # Navigation admin (bottom nav)
    │   ├── dashboard_screen.dart     # Tableau de bord
    │   └── students_screen.dart      # Gestion des élèves
    └── student/
        └── student_shell.dart        # Espace élève
```

## Stack technique

| Catégorie | Package |
|-----------|---------|
| State management | `flutter_riverpod` |
| Navigation | `go_router` |
| Backend | Firebase (Auth + Firestore + Storage) |
| UI | Material 3 + `google_fonts` |
| Internationalisation | `intl` |

## Configuration Firebase

### Étape 1 — Installer FlutterFire CLI

```bash
dart pub global activate flutterfire_cli
```

### Étape 2 — Configurer avec votre projet Firebase

```bash
flutterfire configure --project=VOTRE_FIREBASE_PROJECT_ID
```

Cette commande va :
- Générer `lib/firebase_options.dart` avec les vraies valeurs
- Créer `android/app/google-services.json`
- Créer `ios/Runner/GoogleService-Info.plist`

### Étape 3 — Activer dans Firebase Console

1. **Authentication** → Activer Email/Password
2. **Firestore Database** → Créer une base de données
3. **Storage** → Activer (pour photos de profil)

### Règles Firestore recommandées

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /students/{studentId} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow read: if resource.data.userId == request.auth.uid;
    }
    match /lessons/{lessonId} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow read: if resource.data.studentId == get(/databases/$(database)/documents/students/$(request.auth.uid)).data.id;
    }
  }
}
```

## Lancer le projet

```bash
flutter pub get
flutter run
```

## Créer un compte admin

Après avoir configuré Firebase, créez un compte dans Firebase Auth Console
puis modifiez le document Firestore `users/{uid}` pour mettre `role: "admin"`.

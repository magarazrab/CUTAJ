# NebulaCut (CUTAJ)

NebulaCut is a cosmic/futuristic React Native + Expo TypeScript mobile video editor architecture. It includes real timeline state transformations, subscription gates, Supabase schema/RLS, RevenueCat integration points, secure admin bootstrap, and an export pipeline boundary designed for native FFmpeg/MediaCodec/AVFoundation modules.

## Project structure

- `src/app` application shell and navigation entry points.
- `src/components`, `src/screens`, `src/config` reusable cosmic UI system foundations.
- `src/editor`, `src/timeline`, `src/keyframes` project and clip editing operations.
- `src/media`, `src/audio`, `src/text`, `src/filters`, `src/effects` feature modules for editor tools.
- `src/export` export validation, estimates, and native-export service boundary.
- `src/subscription` Free/Pro/Ultra products, limits, and feature gates.
- `src/admin` admin authorization helpers and premium decisions.
- `src/services` Supabase and RevenueCat clients.
- `src/store`, `src/hooks`, `src/utils`, `src/types` shared application state and types.
- `supabase/migrations` PostgreSQL tables, RLS policies, and private storage buckets.
- `supabase/functions` secure Edge Functions for RevenueCat webhooks and admin bootstrap.

## Installed dependencies

Core runtime dependencies are React Native, Expo, TypeScript, React Navigation, Zustand, Supabase JS, RevenueCat Purchases, Expo media/file modules, and Expo sharing. Development dependencies are TypeScript, ESLint, and TypeScript ESLint.

Run:

```bash
npm install
```

## Environment variables

Copy `.env.example` to `.env` and fill only real values:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- `REVENUECAT_PROJECT_ID`
- `REVENUECAT_WEBHOOK_AUTH_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY` (server/Edge Functions only)
- `AI_TRANSCRIPTION_API_URL`
- `AI_BACKGROUND_REMOVAL_API_URL`
- `AI_API_KEY` (server only)
- `ADMIN_BOOTSTRAP_USERNAME`
- `ADMIN_BOOTSTRAP_PASSWORD` (set at deploy time; do not commit a real password)

## Supabase setup

1. Create a Supabase project.
2. Apply `supabase/migrations/0001_core.sql`.
3. Deploy `supabase/functions/admin-bootstrap` with `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_BOOTSTRAP_PASSWORD` set as function secrets.
4. Deploy `supabase/functions/revenuecat-webhook` with `REVENUECAT_WEBHOOK_AUTH_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` set as function secrets.
5. Configure OAuth providers for Google and Apple in Supabase Auth if required.

The migration creates `profiles`, `projects`, `project_files`, `subscriptions`, `user_settings`, `exports`, `usage`, and `admin_logs`, enables RLS, and creates private storage buckets: `avatars`, `projects`, `media`, `thumbnails`, and `exports`.

## RevenueCat setup

1. Create products `PRO_MONTHLY`, `PRO_YEARLY`, `ULTRA_MONTHLY`, and `ULTRA_YEARLY` in the app stores and RevenueCat.
2. Create entitlements `pro` and `ultra`.
3. Add the public RevenueCat SDK keys to `.env`.
4. Configure a RevenueCat webhook pointing to the deployed `revenuecat-webhook` Edge Function with bearer token auth.

RevenueCat remains the source of truth; the webhook mirrors entitlement status into Supabase for admin/search/reporting.

## Run and checks

```bash
npm install
npm run typecheck
npm run lint
npm run build
npx expo start
```

## Android/iOS builds

```bash
npx expo prebuild
npx expo run:android
npx expo run:ios
# or use EAS
npx eas build --platform android
npx eas build --platform ios
```

## Functions that work in this codebase

- Project, track, clip, text, chroma key, mask, and keyframe TypeScript data model.
- Real immutable timeline operations: add, trim, split, move, duplicate, delete, speed change, and keyframe insertion.
- Undo/redo editor store.
- Free/Pro/Ultra feature and export gates.
- Export settings validation and estimated file size calculation.
- Supabase client initialization with explicit configuration errors.
- RevenueCat SDK configuration and entitlement-to-plan detection.
- Supabase migration with tables, RLS, and private buckets.
- Secure admin bootstrap via Edge Function, without committing admin credentials.
- RevenueCat webhook handler for server-side subscription mirroring.

## Requires additional native/API work

- Production video rendering must be connected to a native processing module such as FFmpegKit replacement, platform AVFoundation/MediaCodec pipelines, or a commercial video SDK.
- AI captions, background removal, object removal, beat sync, smart cut, silence removal, and auto reframe require external APIs or custom ML services.
- App Store / Play Store products and RevenueCat project configuration require real account credentials.
- Supabase deployment requires real project URL and keys.

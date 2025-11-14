# Mobile Build (Capacitor)

This project supports building the Next.js web experience into native iOS and Android shells using [Capacitor 6](https://capacitorjs.com/). The workflow treats the exported static site (`out/`) as the Capacitor web assets.

## Prerequisites

- Node.js environment already set up for this repo
- Xcode 15+ for iOS builds (macOS only)
- Android Studio / Android SDK for Android builds
- CocoaPods (`sudo gem install cocoapods`) for iOS dependency management

## Bootstrap Capacitor Platforms

Run once per platform after cloning or pulling changes:

```bash
npm run build:mobile
npx cap add ios        # only if the ios/ directory does not yet exist
npx cap add android    # only if the android/ directory does not yet exist
```

The `cap add` commands scaffold the native projects inside the repository.

## Build Web Assets

```bash
npm run build:mobile
```

This sets `NEXT_OUTPUT=export` and runs `next build`, producing a static export under `out/`. The standard `npm run build` remains unchanged for web-only deployments.

## Sync Assets Into Native Projects

```bash
npm run cap:sync
```

`npx cap sync` copies the latest `out/` contents and updates native dependencies. Run this after every web change that should appear in the native shells.

## Open Native IDEs

- **iOS**: `npm run cap:open:ios`
- **Android**: `npm run cap:open:android`

These commands launch Xcode or Android Studio with the appropriate project.

## Development Tips

- Use `npm run dev` for quick web iteration, then rebuild/sync when you are ready to verify inside native shells.
- When testing native builds during local development you can point Capacitor at the dev server instead of static assets by updating `capacitor.config.ts` → `server.url` and setting `server.cleartext`/`server.allowNavigation`. Remember to remove or guard those overrides before release builds.
- After pulling updates or switching branches, run `npm install --legacy-peer-deps` to align dependencies (Capacitor packages are already listed in `package.json`).
- To update Capacitor versions, adjust the packages listed in `package.json` and rerun `npm run cap:sync`.

## Troubleshooting

- **Missing assets**: Ensure `npm run build:mobile` completed successfully and `out/` exists before syncing.
- **iOS build complains about signing**: Assign a development team inside Xcode → “Signing & Capabilities”.
- **Android build fails due to SDK version**: Open Android Studio and install the requested SDK / build tools via the SDK Manager.


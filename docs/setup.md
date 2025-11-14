# Environment Setup Guide

This guide covers installing the required tooling on **macOS** and **Windows** for both **web** development (Next.js) and **Android** native builds using Capacitor.

> **Tip:** If you plan to build iOS apps you must use macOS with Xcode. Those steps are already covered in `docs/mobile.md`.

---

## 1. Shared Prerequisites

| Tool | Version / Notes | macOS | Windows |
| --- | --- | --- | --- |
| Git | Latest stable | `xcode-select --install` or [git-scm.com](https://git-scm.com/download/mac) | [git-scm.com](https://git-scm.com/download/win) |
| Node.js | 18.x or 20.x (Next.js 16 compatible) | Use [nvm](https://github.com/nvm-sh/nvm) or [Node installer](https://nodejs.org/en/download) | Use [nvm-windows](https://github.com/coreybutler/nvm-windows) or Node installer |
| npm | Bundled with Node | auto | auto |
| VS Code | Recommended editor | [code.visualstudio.com](https://code.visualstudio.com/download) | [code.visualstudio.com](https://code.visualstudio.com/download) |

After installing Node, confirm the versions:

```bash
node -v
npm -v
```

> **Expected output:** Node `v18.x`/`v20.x`, npm `v9+`.

---

## 2. Project Dependencies

Clone the repository and install packages:

```bash
git clone https://github.com/<org>/frontend-boilerplate.git
cd frontend-boilerplate
npm install --legacy-peer-deps
```

- The `--legacy-peer-deps` flag is required until Storybook publishes Next.js 16-compatible peer ranges.
- Re-run the install command whenever `package.json` changes.

---

## 3. Web Development (Next.js)

### macOS

```bash
npm run dev
```

Access the app at [http://localhost:3001](http://localhost:3001).

### Windows

PowerShell or Windows Terminal:

```powershell
npm run dev
```

- If you prefer WSL (Ubuntu), install [WSL 2](https://learn.microsoft.com/windows/wsl/install) and run the same command inside the Linux shell.
- For HTTPS preview certificates, configure them through `next dev --turbo --experimental-https` as needed.

### Production Web Build (both OSes)

```bash
npm run build
npm start    # serves the build with next start
```

---

## 4. Docker Setup (Optional)

Docker allows you to run the Next.js application in a containerized environment, ensuring consistent behavior across different machines.

### Prerequisites

| Tool | Version | macOS | Windows |
| --- | --- | --- | --- |
| Docker Desktop | Latest stable | [Download](https://www.docker.com/products/docker-desktop) | [Download](https://www.docker.com/products/docker-desktop) |
| Docker Compose | Bundled with Docker Desktop | auto | auto |

### Build and Run Production Container

**Both macOS and Windows:**

```bash
# Build the Docker image
docker build -f docker/Dockerfile -t kraft-frontend .

# Run the container
docker run -p 3001:3001 kraft-frontend
```

Or using Docker Compose:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Access the app at [http://localhost:3000](http://localhost:3000).

### Development Mode with Docker

For hot-reload development:

```bash
# Build and start development container
docker-compose -f docker-compose.dev.yml up

# Stop
docker-compose -f docker-compose.dev.yml down
```

### Docker Commands Reference

| Command | Description |
| --- | --- |
| `docker build -f docker/Dockerfile -t kraft-frontend .` | Build production image |
| `docker run -p 3001:3001 kraft-frontend` | Run production container |
| `docker-compose up -d` | Start production services (detached) |
| `docker-compose -f docker-compose.dev.yml up` | Start development services |
| `docker-compose logs -f` | Follow container logs |
| `docker-compose down` | Stop and remove containers |
| `docker ps` | List running containers |
| `docker images` | List Docker images |

### Troubleshooting Docker

| Issue | Fix |
| --- | --- |
| `docker: command not found` | Install Docker Desktop and ensure it's running. |
| Port 3001 already in use | Stop the local dev server or change the port mapping: `-p 3001:3001` |
| Build fails with peer dependency error | The Dockerfile already uses `--legacy-peer-deps` flag. |
| Container exits immediately | Check logs: `docker-compose logs nextjs` |
| Permission denied on macOS/Linux | Ensure Docker Desktop has proper permissions in System Settings. |

---

## 5. Android Native Builds (Capacitor)

| Dependency | macOS | Windows |
| --- | --- | --- |
| Android Studio 2023+ | [Download](https://developer.android.com/studio) | [Download](https://developer.android.com/studio) |
| Java SDK | Bundled with Android Studio (Temurin 17) | Bundled with Android Studio |
| Android SDK + Platform Tools | Install via Android Studio > SDK Manager | Same |
| USB Drivers | N/A | Install OEM/Google drivers for physical device testing |

### Initial Capacitor Setup

Run once per machine after cloning:

```bash
npm run build:mobile        # exports the Next.js app to ./out
npx cap add android         # only if android/ does not exist yet
```

### Sync Web Assets Into Android Project

After each web build that should ship to Android:

```bash
npm run build:mobile
npm run cap:sync
```

### Open The Android Project

```bash
npm run cap:open:android
```

Android Studio will open the generated project. From there you can:

- Run on an emulator (AVD Manager) or connected device.
- Generate signed APK/AAB via **Build > Generate Signed Bundle/APK…**.

### Command Line Build (optional)

```bash
cd android
./gradlew assembleDebug   # macOS / Linux (WSL)
gradlew.bat assembleDebug # Windows Command Prompt / PowerShell
```

---

## 6. Optional Tooling

- **ESLint & TypeScript checks:** `npm run lint`
- **Storybook UI library:** `npm run storybook`
- **iOS support:** See `docs/mobile.md` for platform-specific requirements.

---

## 7. Troubleshooting

| Issue | Fix |
| --- | --- |
| `npm install` peer dependency error | Ensure you used `--legacy-peer-deps`. |
| Android build cannot find SDK | Open Android Studio → SDK Manager → install required SDK platforms & build tools. |
| Emulator fails to start on Windows | Enable virtualization (BIOS) and ensure Hyper-V / WSL2 configuration matches emulator requirements. |
| Device not detected (Windows) | Install USB driver & enable USB debugging on device. |
| Web build warning about workspace root | Remove extra `package-lock.json` files or set `turbopack.root` in `next.config.ts`. |

---

## 8. Daily Workflow Checklist

1. `git pull` to sync latest code.
2. `npm install --legacy-peer-deps` if dependencies changed.
3. Edit Next.js app / components.
4. `npm run dev` for live reload.
5. When ready for mobile:
   - `npm run build:mobile`
   - `npm run cap:sync`
   - `npm run cap:open:android` (and/or the iOS equivalent on macOS).

Following these steps keeps both web and Android targets in sync across macOS and Windows environments.


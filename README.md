# ICP Token Forge (Lovable-free)

This repository contains a React + Vite + TypeScript frontend built with Tailwind CSS and shadcn-ui.
The project was originally created via a platform but has been cleaned to remove external platform references.

## What this repo contains
- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- UI primitives: shadcn-ui (if present)
- (Optional) If you see `dfx.json` or `src` with Rust canister code, the project may also include Internet Computer (ICP) canisters.

---

## Run locally (basic frontend)
1. Install Node.js (LTS) and npm
2. Clone the repo and enter directory:
```bash
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_FOLDER>
```

3. Install dependencies:
```bash
npm install
```

4. Start dev server:
```bash
npm run dev
```

5. Open the URL shown in the terminal (usually http://localhost:5173)

---

## Notes about ICP / canisters
- If the repository contains `dfx.json` or folders like `canisters` or `src/backend`, then the project has ICP canisters.
- To run canisters locally you need DFINITY SDK (`dfx`) and Rust (for Rust canisters):
  ```bash
  # install dfx (follow official docs) and rust toolchain
  dfx start --background
  dfx deploy
  ```
- If you don't need the canister part, you can still run the frontend alone with `npm run dev`.

---

## Deployment
You can deploy the frontend to Vercel / Netlify / Cloudflare Pages:
- Build:
```bash
npm run build
```
- Follow your hosting provider's instructions and point the build output (`dist/`) to their deployment flow.

---

## What I removed
- All references to external editing platforms so the codebase is self-contained and runs with standard Node toolchain.

---

If you want, I can:
- Inspect the project and tell you if it contains canisters (dfx) and what extra steps will be needed.
- Create a ready-to-run ZIP that removes canister files (if you only want frontend).
- Prepare a GitHub-ready commit list describing what was changed.


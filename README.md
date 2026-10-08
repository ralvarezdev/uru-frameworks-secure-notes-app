# uru-frameworks-secure-notes-app

**Note:** This repository is archived and read-only.

Secure Notes web app from the Frameworks college course (URU): a React front end for [uru-frameworks-secure-notes-api](https://github.com/ralvarezdev/uru-frameworks-secure-notes-api). Built with React 18, Vite 6, React Router 7 and React Query 3; local data and offline support use IndexedDB and session storage, with PBKDF2-based crypto helpers (`src/utils/crypto.js`).

## Project structure

- **`src/pages/`** — `LogIn` (with TOTP, email-code and recovery-code 2FA steps), `SignUp`, `ForgotPassword`, `ResetPassword`, `VerifyEmail`, `Dashboard`, `NotFound`, `Error`
- **`src/layouts/`**, **`src/components/`**, **`src/context/`** — layouts, UI components, and `Auth`, `Notes`, `Tags`, `Notification` providers
- **`src/hooks/`**, **`src/utils/`**, **`src/indexedDB/`** — hooks and API, cookie, crypto, zlib and storage helpers
- **`src/endpoints.js`** — API endpoint definitions

## Configuration

Variable names used in `vite.config.js`: `PORT`, `URU_FRAMEWORKS_SECURE_NOTES_API_URL` (target of the `/api` dev proxy), `URU_FRAMEWORKS_SECURE_NOTES_API_COOKIE_SALT_NAME`, `..._COOKIE_ENCRYPTED_KEY_NAME`, `..._COOKIE_USER_ID_NAME`, `..._COOKIE_USER_PASSWORD_HASH_NAME`, `URU_FRAMEWORKS_SECURE_NOTES_PBKDF2_ITERATIONS` and `URU_FRAMEWORKS_SECURE_NOTES_PBKDF2_KEY_LENGTH`.

## Running

Run the API from the sibling repository and point `URU_FRAMEWORKS_SECURE_NOTES_API_URL` at it.

```bash
npm install
npm run dev      # also: debug, build, prod (build + preview), lint
```

## License

GNU General Public License v3.0 (see `LICENSE`).

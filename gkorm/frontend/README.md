# frontend

This directory contains the Next.js user interface for GKORM.

- `app/`, `components/`, and `context/` – source for pages, UI elements, and state management.
- `api/` – client-side API helpers.
- `package.json` – Node dependencies and useful scripts such as `dev`, `build`, and `lint`.
- `Dockerfile` – container specification for the frontend service.

## development

If needed, build and run the server outside of the Docker stack. This is not ideal, as the frontend depends on the api.

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

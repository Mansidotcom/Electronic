# Electronics Website

## GitHub auto-deploy setup

This repository is configured with GitHub Actions to deploy frontend and backend when you push to `main`.

### Required secrets

- `VERCEL_TOKEN` (Vercel personal token)
- `VERCEL_ORG_ID` (Vercel organization ID)
- `VERCEL_PROJECT_ID` (Vercel project ID for `frontend`)
- `HEROKU_API_KEY` (Heroku API key)
- `HEROKU_APP_NAME` (Heroku app name for `Backend`)
- `HEROKU_EMAIL` (Heroku account email)

### How to deploy

1. Set the GitHub repository secrets above.
2. Push to `main`:
   - `git add . && git commit -m "setup deploy workflow" && git push origin main`
3. Check Actions tab (workflow name: `Full-stack auto deploy`).

### Local dev

- Full stack: `npm run dev` (runs frontend + backend concurrently)
- Backend only: `cd Backend && npm run dev`
- Frontend only: `cd frontend && npm run dev`

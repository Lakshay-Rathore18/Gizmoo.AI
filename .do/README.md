# DigitalOcean deploy — quick reference

The full spec lives in [`app.yaml`](./app.yaml). Before the first deploy:

1. **Install `doctl` + authenticate**
   ```bash
   # macOS
   brew install doctl
   # Windows (scoop)
   scoop install doctl

   doctl auth init   # paste a DO API token with read+write scope
   ```

2. **Fill placeholders in `app.yaml`:**
   - `github.repo` → `<org>/gizmoo-site`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → Clerk publishable key
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key
   - `domains[].domain` / `zone` — already set to `gizmoo.me`, confirm the
     DO-managed zone exists (otherwise point the apex A/AAAA records at the
     App Platform load balancer the dashboard shows after create).

3. **Create the app:**
   ```bash
   doctl apps create --spec .do/app.yaml
   # Grab the returned APP_ID — you'll need it for all future updates.
   ```

4. **Set secrets** (never committed):
   ```bash
   APP_ID=<from previous step>
   doctl apps update "$APP_ID" \
     --env CLERK_SECRET_KEY=sk_live_... \
     --env SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

5. **Subsequent deploys** are automatic on push to `main` because
   `deploy_on_push: true`. Manual redeploy:
   ```bash
   doctl apps create-deployment "$APP_ID"
   ```

6. **Watch logs:**
   ```bash
   doctl apps logs "$APP_ID" --type deploy --follow
   doctl apps logs "$APP_ID" --type run    --follow
   ```

## Region

Set to `syd` (Sydney) to match the Australian audience. If latency to other
markets becomes an issue, swap to a multi-region edge CDN tier — Next.js 16
static output is small enough that this is cheap.

## Rollback

```bash
doctl apps list-deployments "$APP_ID"
doctl apps create-deployment "$APP_ID" --force-rebuild --wait
# To pin to a previous commit: revert on main, push, auto-deploys.
```

## Cost shape

`basic-xs` (1 vCPU / 512 MB) is sufficient for the current marketing site —
Next.js renders almost everything statically, and Clerk auth lives on
subdomains. Upgrade to `basic-s` only if observed P95 latency exceeds 500 ms.

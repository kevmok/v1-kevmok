# DEPLOYMENT SETUP GUIDE

## Quick Start (Choose One Method)

### Method 1: Vercel Dashboard (Easiest - 2 minutes)
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import `kevmok/v1-kevmok`
4. Click **Deploy**
5. Done! 🎉

---

### Method 2: GitHub Actions (Automated - 5 minutes setup)

**Already configured:** `.github/workflows/deploy.yml`

**You need to add these secrets to your GitHub repository:**

#### Step 1: Get Vercel Credentials
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project (or create new)
vercel link

# Get project info
cat .vercel/project.json
# Output: {"orgId":"...","projectId":"..."}

# Get token from Vercel dashboard:
# https://vercel.com/account/tokens
```

#### Step 2: Add Secrets to GitHub
1. Go to https://github.com/kevmok/v1-kevmok/settings/secrets/actions
2. Add these secrets:
   - `VERCEL_TOKEN` - Your Vercel personal access token
   - `VERCEL_ORG_ID` - From `.vercel/project.json`
   - `VERCEL_PROJECT_ID` - From `.vercel/project.json`

#### Step 3: Deploy
Push to main branch - deployment happens automatically!

---

### Method 3: Vercel CLI (Manual)
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at https://kevmok.com
- [ ] Home page shows bio and posts
- [ ] Blog post /n/1 loads correctly
- [ ] Projects page works
- [ ] Sitemap.xml is accessible
- [ ] Dark theme renders correctly
- [ ] No console errors

---

## Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure `bun` is selected as package manager
- Verify `vercel.json` settings

### Routes Return 404
- TanStack Start requires SSR - ensure framework is set to "Other"
- Check that `dist` directory is set as output

### Styles Not Loading
- Verify Tailwind CSS 4 is building correctly
- Check that `main-*.css` is in the dist output

---

## Current Status

✅ All code ready
✅ Build configuration complete
✅ CI/CD workflows configured
⏳ **Awaiting: Vercel connection**

**Next step:** Choose Method 1, 2, or 3 above and deploy! 🚀

# DEPLOYMENT GUIDE - Vercel + MongoDB Atlas

## Step 1: Create MongoDB Atlas Account (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (select FREE tier - M0)
4. Choose a cloud provider (AWS recommended)
5. Click "Create Cluster"

## Step 2: Get MongoDB Connection String

1. In MongoDB Atlas, click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/university_db?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Replace `test` with `university_db`

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. When prompted, add environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your repository: `Rastrith156/websitee`
5. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Add Environment Variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string from Step 2
7. Click "Deploy"

## Step 4: Update Frontend URLs

After deployment, Vercel will give you a URL like:
`https://your-project-name.vercel.app`

Update these files to use your Vercel backend URL:

### In `registration.html`:
Change line ~77:
```javascript
const apiUrl = 'https://your-project-name.vercel.app/api/register';
```

### In `script.js`:
Change the fetch URL (around line 550):
```javascript
await fetch('https://your-project-name.vercel.app/api/chat', {
```

## Step 5: Push Changes to GitHub

```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

## Step 6: Test Your Deployment

1. Visit: `https://rastrith156.github.io/websitee`
2. Test registration form
3. Test chatbot
4. Check MongoDB Atlas to see data

## Environment Variables Needed

In Vercel Dashboard → Settings → Environment Variables:

| Name | Value |
|------|-------|
| MONGODB_URI | mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/university_db |
| PORT | 3000 |

## Troubleshooting

### If deployment fails:
- Check Vercel logs in dashboard
- Verify MongoDB connection string is correct
- Ensure all dependencies are in package.json

### If data doesn't save:
- Check Network tab in browser DevTools
- Verify API URLs point to Vercel deployment
- Check MongoDB Atlas → Network Access (allow all IPs: 0.0.0.0/0)

## Your URLs After Setup

- **Frontend (GitHub Pages):** https://rastrith156.github.io/websitee
- **Backend (Vercel):** https://your-project-name.vercel.app
- **Database:** MongoDB Atlas Cloud

## Quick Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

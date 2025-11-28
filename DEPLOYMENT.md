# 🚀 COMPLETE DEPLOYMENT GUIDE
# Problems Tracker: Railway MySQL + GitHub + Vercel

Follow these steps IN ORDER to deploy your application to production.

---

## ✅ CHECKLIST - Complete These Steps

### 📋 Prerequisites Done:
- [x] Railway account created and logged in
- [x] Railway CLI installed
- [x] Railway project created: "zesty-communication"
- [x] `.env` file created with NEXTAUTH_SECRET
- [x] Git repository initialized
- [x] Project ready to deploy

---

## 🗄️ STEP 1: Create MySQL Database in Railway

### Option A: Using Railway Web Dashboard (RECOMMENDED - EASIER)

1. **Open Railway Dashboard:**
   - Go to: https://railway.app/dashboard
   - Or click on your existing project: https://railway.com/project/552ef22c-a369-4bdb-9ccb-8f3a81a50146

2. **Add MySQL Database:**
   - Click **"+ New"** button in the top right
   - Select **"Database"**
   - Choose **"MySQL"**
   - Wait ~30 seconds for provisioning

3. **Get Database URL:**
   - Click on the **MySQL service card**
   - Go to the **"Variables"** tab
   - Find and **COPY** the `DATABASE_URL` value
   - It looks like: `mysql://root:xxxxx@containers-us-west-xxx.railway.app:7890/railway`

4. **Update Your Local .env File:**
   - Open `.env` file in your project
   - Replace the `DATABASE_URL=""` line with your actual Railway URL
   - Save the file

### Option B: Using Railway CLI

```bash
railway add
# Select "Database" then "MySQL"
railway variables
# Copy the DATABASE_URL value
```

---

## 🔧 STEP 2: Configure Local Environment & Test

### 2.1 Update .env File

Your `.env` file should now look like:

```env
DATABASE_URL="mysql://root:REAL_PASSWORD@containers-us-west-XXX.railway.app:7890/railway"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="MIby+5SryAVvV/Nqt6t512Okt3tTSC8TaTkoZ9/i8QQ="
GOOGLE_CLIENT_ID="your-actual-google-id"
GOOGLE_CLIENT_SECRET="your-actual-google-secret"
```

### 2.2 Setup Prisma & Database

Run these commands:

```bash
# Install dependencies (if not already done)
npm install

# Generate Prisma Client
npx prisma generate

# Push database schema to Railway MySQL
npx prisma db push

# (Optional) View your database
npx prisma studio
```

### 2.3 Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and verify:
- ✅ App loads
- ✅ Can login (if auth is set up)
- ✅ Can create/view issues
- ✅ Data persists in Railway database

---

## 📦 STEP 3: Create GitHub Repository

### 3.1 Create Repository on GitHub

**Option A: Using GitHub Website**
1. Go to: https://github.com/new
2. Repository name: `problems-tracker`
3. Description: "Issue tracking application with Next.js, Prisma, and MySQL"
4. Keep it **Private** (or Public if you prefer)
5. **DO NOT** initialize with README, .gitignore, or license (you already have these)
6. Click **"Create repository"**

### 3.2 Connect Your Local Repo to GitHub

After creating the repo, GitHub will show you commands. Run these:

```bash
# Add the remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/problems-tracker.git

# Check current branch
git branch

# If you're on 'master', rename to 'main' (modern convention)
git branch -M main

# Stage all files
git add .

# Commit
git commit -m "Initial commit with Railway MySQL setup"

# Push to GitHub
git push -u origin main
```

**Verify:** Go to your GitHub repo URL and ensure all files are uploaded.

---

## ☁️ STEP 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel

**Option A: Using Vercel Dashboard (RECOMMENDED)**

1. **Go to Vercel:**
   - Visit: https://vercel.com/new
   - Login with GitHub

2. **Import Repository:**
   - Click **"Import Project"**
   - Select **"Import Git Repository"**
   - Find and select `problems-tracker`
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./
   - **Build Command:** (leave default: `npm run build`)
   - **Output Directory:** (leave default: `.next`)
   - Click **"Deploy"** (it will fail first time - that's okay!)

4. **Add Environment Variables:**
   - After deploy fails, go to **Settings** > **Environment Variables**
   - Add these variables:

   | Variable Name | Value | Environment |
   |---------------|-------|-------------|
   | `DATABASE_URL` | `mysql://root:...` (from Railway) | Production, Preview, Development |
   | `NEXTAUTH_URL` | `https://YOUR-APP.vercel.app` | Production |
   | `NEXTAUTH_URL` | `http://localhost:3000` | Development |
   | `NEXTAUTH_SECRET` | `MIby+5SryAVvV/Nqt6t512Okt3tTSC8TaTkoZ9/i8QQ=` | Production, Preview, Development |
   | `GOOGLE_CLIENT_ID` | Your Google OAuth ID | Production, Preview, Development |
   | `GOOGLE_CLIENT_SECRET` | Your Google OAuth Secret | Production, Preview, Development |

5. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - ✅ Should succeed this time!

### 4.2 Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Add environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
```

---

## 🔐 STEP 5: Update Google OAuth (If Using Google Auth)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com
   - Navigate to: **APIs & Services** > **Credentials**

2. **Edit OAuth 2.0 Client:**
   - Click on your OAuth client ID
   - Under **"Authorized redirect URIs"**, add:
   ```
   https://YOUR-APP.vercel.app/api/auth/callback/google
   ```
   - Click **"Save"**

3. **Update NEXTAUTH_URL in Vercel:**
   - Go to Vercel > Your Project > Settings > Environment Variables
   - Update `NEXTAUTH_URL` for Production to: `https://YOUR-APP.vercel.app`
   - Redeploy

---

## 🧪 STEP 6: Test Production Deployment

1. **Visit Your App:**
   - Go to: `https://YOUR-APP.vercel.app`

2. **Test Features:**
   - ✅ Homepage loads
   - ✅ Login with Google works
   - ✅ Create a new issue
   - ✅ View issues list
   - ✅ Dashboard shows charts
   - ✅ Data persists (refresh page)

3. **Check Logs:**
   - **Vercel:** Go to Deployments > Latest > Function Logs
   - **Railway:** Dashboard > MySQL > Logs

---

## 🔄 STEP 7: Continuous Deployment (Automatic)

Now that everything is connected:

1. **Make changes locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
3. **Vercel automatically deploys!** 🎉

---

## 🛠️ Troubleshooting

### Database Connection Errors

**Error:** "Can't reach database server"

**Solutions:**
- Verify `DATABASE_URL` in Vercel matches Railway exactly
- Check Railway MySQL service is running
- Try adding SSL parameter to URL: `?sslaccept=strict`

### Build Fails on Vercel

**Error:** "Prisma Client not generated"

**Solution:** Already fixed in `package.json`:
```json
"build": "prisma generate && next build",
"postinstall": "prisma generate"
```

### NextAuth Errors

**Error:** "NEXTAUTH_URL not set"

**Solution:**
- Make sure `NEXTAUTH_URL` is set in Vercel
- For production: `https://your-app.vercel.app`
- For development: `http://localhost:3000`

### Google OAuth Not Working

**Solution:**
- Verify redirect URI in Google Console matches Vercel domain
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Vercel
- Ensure they're set for Production environment

---

## 📊 Monitoring

### Check Database Usage (Railway)
- Dashboard > MySQL > Metrics
- View storage, memory, CPU usage

### Check App Performance (Vercel)
- Dashboard > Analytics
- View page load times, visitors

### View Logs
```bash
# Vercel logs
vercel logs

# Railway logs
railway logs
```

---

## 🎉 SUCCESS CHECKLIST

- [ ] Railway MySQL database created
- [ ] DATABASE_URL copied from Railway
- [ ] Local .env file updated with real credentials
- [ ] Prisma schema pushed to database (`npx prisma db push`)
- [ ] App tested locally successfully
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected to GitHub
- [ ] All environment variables added to Vercel
- [ ] App deployed successfully to Vercel
- [ ] Production URL tested and working
- [ ] Google OAuth updated with production URL
- [ ] Continuous deployment working (push = auto-deploy)

---

## 🚀 Quick Reference Commands

### Local Development
```bash
npm run dev              # Start dev server
npx prisma studio        # View database
npx prisma db push       # Push schema changes
```

### Git Operations
```bash
git add .
git commit -m "message"
git push
```

### Database Management
```bash
npx prisma migrate dev   # Create migration
npx prisma db push       # Push without migration
npx prisma generate      # Generate client
```

---

## 📚 Important URLs

- **Railway Project:** https://railway.com/project/552ef22c-a369-4bdb-9ccb-8f3a81a50146
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com/YOUR_USERNAME/problems-tracker
- **Google Cloud Console:** https://console.cloud.google.com

---

## 🆘 Need Help?

1. Check error logs in Vercel and Railway
2. Review this guide step-by-step
3. Check `.env` variables are set correctly
4. Verify database connection string
5. Test locally first before debugging production

---

**LAST UPDATED:** 2025-11-26
**STATUS:** Ready to deploy! 🚀

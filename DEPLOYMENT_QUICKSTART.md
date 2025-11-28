# 🚀 Quick Start Deployment

## Two Options to Deploy:

### Option 1: Automated Script (Easiest)
```bash
.\deploy.bat
```
This interactive script will guide you through each step.

### Option 2: Manual Steps

#### 1️⃣ Create Railway MySQL Database
- Open: https://railway.com/project/552ef22c-a369-4bdb-9ccb-8f3a81a50146
- Click "+ New" → Database → MySQL
- Copy `DATABASE_URL` from Variables tab
- Update your `.env` file with the real URL

#### 2️⃣ Setup Database
```bash
npm install
npx prisma generate
npx prisma db push
```

#### 3️⃣ Create GitHub Repo
- Go to: https://github.com/new
- Name: `problems-tracker`  
- Don't initialize with anything
- Create it

#### 4️⃣ Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/problems-tracker.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### 5️⃣ Deploy to Vercel
- Go to: https://vercel.com/new
- Import `problems-tracker` repository
- Add environment variables:
  - `DATABASE_URL` (from Railway)
  - `NEXTAUTH_URL` = `https://your-app.vercel.app`
  - `NEXTAUTH_SECRET` = `MIby+5SryAVvV/Nqt6t512Okt3tTSC8TaTkoZ9/i8QQ=`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
- Deploy!

---

## 📖 Detailed Guide
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete step-by-step instructions with troubleshooting.

---

## ✅ Current Status

- [x] Railway CLI installed & logged in
- [x] Railway project created:  `zesty-communication`
- [x] `.env` file created with NEXTAUTH_SECRET
- [x] `package.json` configured for production builds
- [x] Prisma schema ready for MySQL
- [ ] Railway MySQL database created
- [ ] Local database connected
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project deployed
- [ ] Production app live!

---

## 🆘 Help

**Problem with deployment?** 
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Verify `.env` has correct `DATABASE_URL`
3. Ensure all Vercel environment variables are set
4. Check logs: `vercel logs` or Railway dashboard

**Quick test locally:**
```bash
npm run dev
```
Visit http://localhost:3000

---

**Good luck with your deployment! 🎉**

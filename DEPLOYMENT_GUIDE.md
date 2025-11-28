# 🚀 Production Database Setup Guide
## Railway + MySQL + Prisma + Vercel Deployment

This guide will help you deploy your Problems Tracker application with a production MySQL database on Railway and frontend on Vercel.

---

## 📋 Prerequisites

- [x] Railway account (https://railway.app)
- [x] Vercel account (https://vercel.com)
- [x] GitHub repository with your code
- [x] Railway CLI installed (already done)

---

## 🗄️ Step 1: Set Up Railway MySQL Database

### 1.1 Login to Railway (Already Running)
The `railway login` command should open a browser for authentication.

### 1.2 Initialize Railway Project
```bash
railway init
```
- Choose "Create new project"
- Give it a name like "problems-tracker-db"

### 1.3 Add MySQL Database
```bash
railway add --database mysql
```

This will provision a MySQL database for your project.

### 1.4 Get Database Connection String
```bash
railway variables
```

Look for the `DATABASE_URL` variable. It will look like:
```
mysql://root:password@containers-us-west-xxx.railway.app:7890/railway
```

**Important:** Railway MySQL URLs need to be modified for Prisma. You'll need to add SSL parameters:
```
mysql://root:password@containers-us-west-xxx.railway.app:7890/railway?sslaccept=strict
```

Or copy the URL directly from Railway dashboard:
1. Go to https://railway.app
2. Click on your project
3. Click on the MySQL service
4. Go to "Variables" tab
5. Copy the `DATABASE_URL`

---

## 🔐 Step 2: Configure Local Environment

### 2.1 Create `.env` file (if not exists)
Create a `.env` file in your project root with:

```bash
# Railway Production Database URL
DATABASE_URL="your-railway-mysql-url-here"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Sentry (Optional)
SENTRY_DSN="your-sentry-dsn"
```

### 2.2 Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🔄 Step 3: Run Database Migrations

### 3.1 Generate Prisma Client
```bash
npx prisma generate
```

### 3.2 Push Schema to Railway Database
```bash
npx prisma db push
```

This will create all tables in your Railway MySQL database.

### 3.3 (Optional) Create a Migration
For better version control:
```bash
npx prisma migrate dev --name init
```

### 3.4 Verify Database
```bash
npx prisma studio
```

This opens Prisma Studio to view your database.

---

## ☁️ Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 4.2 Login to Vercel
```bash
vercel login
```

### 4.3 Link Your Project
```bash
vercel link
```

### 4.4 Add Environment Variables to Vercel

**Option A: Using Vercel CLI**
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add each variable:
   - `DATABASE_URL` = (Your Railway MySQL URL)
   - `NEXTAUTH_URL` = (Your production URL, e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET` = (Same secret from local)
   - `GOOGLE_CLIENT_ID` = (Your Google OAuth ID)
   - `GOOGLE_CLIENT_SECRET` = (Your Google OAuth Secret)

### 4.5 Update Google OAuth Redirect URIs
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "APIs & Services" → "Credentials"
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URIs:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

### 4.6 Deploy to Vercel
```bash
vercel --prod
```

Or push to your GitHub main/master branch if you have automatic deployments enabled.

---

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Run Migrations on Production
After first deployment, you might need to push the schema again:
```bash
DATABASE_URL="your-railway-url" npx prisma db push
```

Or set up automatic migrations in your `package.json`:

Update your `package.json` build script:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 5.2 Verify Production Database
Check Railway dashboard to ensure tables are created:
1. Go to Railway dashboard
2. Click on MySQL service
3. Go to "Data" tab
4. You should see all your tables (issues, users, accounts, sessions, etc.)

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Test Authentication
1. Visit your Vercel URL
2. Try logging in with Google
3. Verify user is created in database

### 6.2 Test Issue Creation
1. Create a new issue
2. Verify it appears in the dashboard
3. Check Railway database to confirm data persisted

### 6.3 Check Logs
**Vercel Logs:**
```bash
vercel logs
```

**Railway Logs:**
```bash
railway logs
```

---

## 🔄 Step 7: Continuous Deployment

### 7.1 GitHub Integration (Recommended)
1. Connect your Vercel project to GitHub
2. Every push to main branch will automatically deploy
3. Pull requests will get preview deployments

### 7.2 Database Migrations Workflow
When you update your schema:

1. **Development:**
   ```bash
   npx prisma migrate dev --name description_of_change
   ```

2. **Commit Migration Files:**
   ```bash
   git add prisma/migrations
   git commit -m "Add migration: description"
   git push
   ```

3. **Production:** Vercel will automatically run `prisma generate` on build

---

## 🛠️ Troubleshooting

### Issue: "Can't reach database server"
**Solution:** Check if Railway MySQL is running and URL is correct with SSL parameters.

### Issue: "P1017: Server has closed the connection"
**Solution:** Add connection pooling to your DATABASE_URL:
```
mysql://user:pass@host:port/db?connection_limit=1&pool_timeout=0
```

### Issue: "Authentication plugin 'caching_sha2_password' cannot be loaded"
**Solution:** Railway's MySQL 8 uses this by default. Ensure you're using latest Prisma version:
```bash
npm install @prisma/client@latest prisma@latest
```

### Issue: NextAuth Session Not Working
**Solution:** 
- Verify `NEXTAUTH_URL` matches your production URL exactly
- Ensure `NEXTAUTH_SECRET` is set in Vercel
- Check that all OAuth redirect URIs are updated

### Issue: Build Fails on Vercel
**Solution:** Ensure `postinstall` script runs `prisma generate`:
```json
"postinstall": "prisma generate"
```

---

## 📊 Monitoring & Maintenance

### Database Backups (Railway)
Railway automatically backs up your database. Access backups:
1. Railway Dashboard → MySQL Service
2. Click "Backups" tab
3. Download or restore as needed

### Monitor Database Usage
```bash
railway status
```

### Prisma Studio on Production (Careful!)
```bash
DATABASE_URL="your-railway-url" npx prisma studio
```

---

## 🎉 Success Checklist

- [ ] Railway MySQL database provisioned
- [ ] Database URL added to local `.env`
- [ ] Prisma schema pushed to database
- [ ] All tables created successfully
- [ ] Vercel project created/linked
- [ ] Environment variables added to Vercel
- [ ] Production URL updated in Google OAuth
- [ ] NEXTAUTH_URL updated in Vercel
- [ ] Successful deployment to Vercel
- [ ] Authentication working on production
- [ ] Issues can be created/viewed on production
- [ ] GitHub integration enabled for auto-deployments

---

## 🚀 Quick Commands Reference

```bash
# Railway Commands
railway login
railway init
railway add --database mysql
railway variables
railway logs

# Prisma Commands
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init
npx prisma studio

# Vercel Commands
vercel login
vercel link
vercel env add VARIABLE_NAME
vercel --prod
vercel logs

# Testing
npm run dev      # Test locally
npm run build    # Test production build
```

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Prisma with MySQL](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [Vercel Deployment](https://vercel.com/docs)
- [NextAuth.js](https://next-auth.js.org)

---

**Need Help?** 
Check error logs with:
- `vercel logs` (Vercel)
- `railway logs` (Railway)
- Browser DevTools Console (Client-side errors)

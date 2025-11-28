@echo off
COLOR 0A
echo ========================================
echo   PROBLEMS TRACKER - DEPLOYMENT SETUP
echo   Railway MySQL + GitHub + Vercel
echo ========================================
echo.

echo [STEP 1] Checking Git status...
git status
echo.

echo ========================================
echo   MANUAL STEPS REQUIRED
echo ========================================
echo.

echo [STEP 2] CREATE MYSQL DATABASE IN RAILWAY
echo.
echo Please follow these steps:
echo 1. Open Railway Dashboard: https://railway.com/dashboard
echo 2. Click on your project: zesty-communication
echo 3. Click "+ New" button
echo 4. Select "Database" then "MySQL"
echo 5. Wait for provisioning (~30 seconds)
echo 6. Click on MySQL service
echo 7. Go to "Variables" tab
echo 8. COPY the DATABASE_URL value
echo.
echo Press any key when you have copied the DATABASE_URL...
pause >nul
echo.

echo [STEP 3] Update .env file with DATABASE_URL
echo.
echo Opening .env file in notepad...
notepad .env
echo.
echo Please update the DATABASE_URL line with your Railway URL
echo Press any key when done...
pause >nul
echo.

echo [STEP 4] Installing dependencies...
call npm install
echo.

echo [STEP 5] Generating Prisma Client...
call npx prisma generate
echo.

echo [STEP 6] Pushing schema to Railway database...
echo This will create all tables in your production database.
echo.
pause
call npx prisma db push
echo.

echo ========================================
echo   DATABASE SETUP COMPLETE!
echo ========================================
echo.

echo [STEP 7] Would you like to view your database? (y/n)
set /p VIEW_DB="Open Prisma Studio? (y/n): "
if /i "%VIEW_DB%"=="y" (
    echo Opening Prisma Studio...
    start npx prisma studio
    echo.
)

echo ========================================
echo   GITHUB REPOSITORY SETUP
echo ========================================
echo.

echo [STEP 8] Create GitHub repository:
echo 1. Go to: https://github.com/new
echo 2. Name: problems-tracker
echo 3. Make it Private (or Public)
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.
start https://github.com/new
echo.
echo Press any key when repository is created...
pause >nul
echo.

echo [STEP 9] Enter your GitHub username:
set /p GITHUB_USER="GitHub Username: "
echo.

echo [STEP 10] Connecting to GitHub and pushing code...
echo.

git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USER%/problems-tracker.git
git branch -M main
git add .
git status
echo.

echo About to commit and push. Review the files above.
pause

git commit -m "Initial commit: Production setup with Railway MySQL"
git push -u origin main
echo.

echo ========================================
echo   GITHUB PUSH COMPLETE!
echo ========================================
echo.

echo [STEP 11] Deploy to Vercel:
echo 1. Go to: https://vercel.com/new
echo 2. Login with GitHub
echo 3. Import "problems-tracker" repository
echo 4. Click Deploy (will fail - that's OK!)
echo 5. Go to Settings ^> Environment Variables
echo 6. Add these variables:
echo    - DATABASE_URL (from Railway)
echo    - NEXTAUTH_URL = https://your-app.vercel.app
echo    - NEXTAUTH_SECRET = MIby+5SryAVvV/Nqt6t512Okt3tTSC8TaTkoZ9/i8QQ=
echo    - GOOGLE_CLIENT_ID
echo    - GOOGLE_CLIENT_SECRET
echo 7. Go to Deployments and Redeploy
echo.
start https://vercel.com/new
echo.

echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Complete the Vercel setup above
echo 2. Test your production app
echo 3. Update Google OAuth redirect URIs
echo.
echo See DEPLOYMENT.md for detailed instructions
echo.
pause

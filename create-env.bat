@echo off
echo ========================================
echo Creating .env file for production setup
echo ========================================
echo.

(
echo # ========================================
echo # PRODUCTION DATABASE - RAILWAY MYSQL
echo # ========================================
echo # TODO: Replace this with your actual Railway MySQL URL
echo # Get it from: Railway Dashboard ^> Your Project ^> MySQL ^> Variables tab ^> DATABASE_URL
echo DATABASE_URL="mysql://root:password@host:port/railway"
echo.
echo # ========================================
echo # NEXTAUTH CONFIGURATION
echo # ========================================
echo NEXTAUTH_URL="http://localhost:3000"
echo NEXTAUTH_SECRET="MIby+5SryAVvV/Nqt6t512Okt3tTSC8TaTkoZ9/i8QQ="
echo.
echo # ========================================
echo # GOOGLE OAUTH CREDENTIALS
echo # ========================================
echo # Get these from: https://console.cloud.google.com
echo GOOGLE_CLIENT_ID="your-google-client-id-here"
echo GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
echo.
echo # ========================================
echo # SENTRY ^(OPTIONAL^)
echo # ========================================
echo SENTRY_DSN="your-sentry-dsn-here"
) > .env

echo.
echo ✅ .env file created successfully!
echo.
echo 📝 NEXT STEPS:
echo 1. Get your DATABASE_URL from Railway dashboard
echo 2. Edit .env file and replace the DATABASE_URL
echo 3. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
echo.
pause

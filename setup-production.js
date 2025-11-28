#!/usr/bin/env node

/**
 * Railway + Vercel Deployment Setup Helper
 * This script helps you set up your production environment
 */

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function runCommand(command, description) {
    console.log(`\n🔄 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${description} completed`);
        return true;
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Railway + Vercel Production Setup\n');
    console.log('This script will help you set up your production environment.\n');

    // Step 1: Check if Railway CLI is installed
    console.log('📋 Step 1: Checking Railway CLI...');
    try {
        execSync('railway --version', { stdio: 'pipe' });
        console.log('✅ Railway CLI is installed\n');
    } catch {
        console.log('❌ Railway CLI is not installed');
        console.log('Install it from: https://docs.railway.app/develop/cli\n');
        process.exit(1);
    }

    // Step 2: Railway Login
    const shouldLogin = await question('Do you want to login to Railway? (y/n): ');
    if (shouldLogin.toLowerCase() === 'y') {
        runCommand('railway login', 'Railway login');
    }

    // Step 3: Initialize Railway Project
    const shouldInit = await question('\nDo you want to initialize a new Railway project? (y/n): ');
    if (shouldInit.toLowerCase() === 'y') {
        runCommand('railway init', 'Initialize Railway project');
    }

    // Step 4: Add MySQL Database
    const shouldAddDB = await question('\nDo you want to add MySQL database to Railway? (y/n): ');
    if (shouldAddDB.toLowerCase() === 'y') {
        runCommand('railway add --database mysql', 'Add MySQL database');
    }

    // Step 5: Get Database URL
    console.log('\n📊 Step 5: Getting Database Configuration...');
    const shouldShowVars = await question('Do you want to view Railway variables? (y/n): ');
    if (shouldShowVars.toLowerCase() === 'y') {
        console.log('\n⚠️  Copy the DATABASE_URL from below:\n');
        runCommand('railway variables', 'Fetch Railway variables');
        console.log('\n⚠️  Make sure to add SSL parameters if needed: ?sslaccept=strict\n');
    }

    // Step 6: Update .env file
    const shouldUpdateEnv = await question('\nDo you want to update your .env file with the database URL? (y/n): ');
    if (shouldUpdateEnv.toLowerCase() === 'y') {
        const dbUrl = await question('Paste your Railway DATABASE_URL here: ');

        const envContent = `# Database
DATABASE_URL="${dbUrl}"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${require('crypto').randomBytes(32).toString('base64')}"

# Google OAuth (update these)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Sentry (optional)
SENTRY_DSN="your-sentry-dsn"
`;

        fs.writeFileSync('.env', envContent);
        console.log('✅ .env file created with DATABASE_URL and auto-generated NEXTAUTH_SECRET');
        console.log('⚠️  Remember to update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET\n');
    }

    // Step 7: Prisma Setup
    const shouldPrisma = await question('\nDo you want to run Prisma setup (generate + db push)? (y/n): ');
    if (shouldPrisma.toLowerCase() === 'y') {
        runCommand('npx prisma generate', 'Generate Prisma Client');
        runCommand('npx prisma db push', 'Push schema to database');
    }

    // Step 8: Prisma Studio
    const shouldStudio = await question('\nDo you want to open Prisma Studio to verify database? (y/n): ');
    if (shouldStudio.toLowerCase() === 'y') {
        console.log('⚠️  Opening Prisma Studio in your browser...');
        console.log('Press Ctrl+C to close Prisma Studio when done.\n');
        runCommand('npx prisma studio', 'Open Prisma Studio');
    }

    // Step 9: Vercel Setup
    console.log('\n\n🎉 Railway setup complete!');
    console.log('\n📦 Next Steps for Vercel Deployment:');
    console.log('1. Install Vercel CLI: npm i -g vercel');
    console.log('2. Login to Vercel: vercel login');
    console.log('3. Link project: vercel link');
    console.log('4. Add environment variables to Vercel dashboard');
    console.log('5. Deploy: vercel --prod');
    console.log('\nSee DEPLOYMENT_GUIDE.md for detailed instructions.\n');

    rl.close();
}

main().catch(error => {
    console.error('Error:', error);
    rl.close();
    process.exit(1);
});

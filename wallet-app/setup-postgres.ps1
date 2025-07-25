# PostgreSQL Setup Script for Wallet App
Write-Host "=== PostgreSQL Setup for Wallet App ===" -ForegroundColor Green
Write-Host ""

# Check if PostgreSQL is installed
$pgPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $pgPath) {
    Write-Host "❌ PostgreSQL not found. Please install PostgreSQL first:" -ForegroundColor Red
    Write-Host "   Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host "   During installation, remember the password you set for 'postgres' user" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL found at: $($pgPath.Source)" -ForegroundColor Green
Write-Host ""

# Prompt for password
$password = Read-Host "Enter your PostgreSQL 'postgres' user password" -AsSecureString
$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# Update .env file
$envContent = @"
# Database Configuration - Local PostgreSQL
# Simple local setup for development
DATABASE_URL=""postgresql://postgres:$plainPassword@localhost:5432/wallet_db""
"@

Set-Content -Path ".env" -Value $envContent
Write-Host "✅ Updated .env file with your password" -ForegroundColor Green

# Create database
Write-Host "Creating database 'wallet_db'..." -ForegroundColor Yellow
$env:PGPASSWORD = $plainPassword
& psql -U postgres -c "CREATE DATABASE wallet_db;" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database 'wallet_db' created successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Database 'wallet_db' already exists or created" -ForegroundColor Green
}

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
npm run db:migrate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migrations completed successfully" -ForegroundColor Green
    
    # Test connection
    Write-Host "Testing database connection..." -ForegroundColor Yellow
    node test-db.js
    
    Write-Host ""
    Write-Host "🎉 Setup complete! You can now:" -ForegroundColor Green
    Write-Host "   1. Start the dev server: npm run dev" -ForegroundColor Cyan
    Write-Host "   2. Test API at: http://localhost:3001/api/accounts" -ForegroundColor Cyan
} else {
    Write-Host "❌ Migration failed. Please check the error above." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
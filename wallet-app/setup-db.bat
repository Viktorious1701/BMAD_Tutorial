@echo off
echo Setting up local PostgreSQL database for Wallet App...
echo.

echo Step 1: Creating database 'wallet_db'
psql -U postgres -c "CREATE DATABASE wallet_db;" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Database 'wallet_db' created successfully
) else (
    echo ✓ Database 'wallet_db' already exists or created
)

echo.
echo Step 2: Running database migrations
call npm run db:migrate

echo.
echo Step 3: Testing database connection
node test-db.js

echo.
echo Setup complete! You can now start the development server:
echo npm run dev
pause
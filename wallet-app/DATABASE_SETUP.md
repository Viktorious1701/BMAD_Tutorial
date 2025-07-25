# Database Setup Guide

## Current Issue

The API endpoints are failing with the error `{"error":"Failed to fetch accounts"}` because the database connection is not properly configured.

**Root Cause:** The `DATABASE_URL` in the `.env` file was set to a placeholder value instead of a real database connection string.

## Error Details

```
Error [NeonDbError]: Error connecting to database: TypeError: fetch failed
[cause]: [AggregateError: ] { code: 'ECONNREFUSED' }
```

## Solutions

### Option 1: Use Neon Database (Recommended for Production)

1. **Create a Neon Account:**
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up for a free account

2. **Create a New Project:**
   - Click "Create Project"
   - Choose a project name (e.g., "wallet-app")
   - Select a region close to you

3. **Get Connection String:**
   - Go to your project dashboard
   - Click "Connection Details" or "Connect"
   - Copy the connection string

4. **Update .env File:**
   ```bash
   DATABASE_URL="postgresql://your_username:your_password@your_endpoint.neon.tech/your_database?sslmode=require"
   ```

### Option 2: Use Local PostgreSQL (For Development)

1. **Install PostgreSQL:**
   - Download from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Install with default settings
   - Remember the password you set for the `postgres` user

2. **Create Database:**
   ```sql
   -- Connect to PostgreSQL and run:
   CREATE DATABASE wallet_db;
   ```

3. **Update .env File:**
   ```bash
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/wallet_db"
   ```

### Option 3: Use Docker PostgreSQL (Quick Setup)

1. **Run PostgreSQL in Docker:**
   ```bash
   docker run --name wallet-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=wallet_db -p 5432:5432 -d postgres:15
   ```

2. **Use the current .env setting:**
   ```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/wallet_db"
   ```

## After Database Setup

1. **Run Database Migrations:**
   ```bash
   npm run db:migrate
   ```

2. **Restart the Development Server:**
   ```bash
   npm run dev
   ```

3. **Test the API:**
   ```bash
   curl http://localhost:3001/api/accounts
   ```
   Should return: `[]` (empty array) instead of an error

## Verification

Once properly configured, you should be able to:
- ✅ GET `/api/accounts` - Returns empty array `[]`
- ✅ POST `/api/accounts` - Creates new accounts
- ✅ View the accounts page at `http://localhost:3001/accounts`

## Current Database Schema

The `accounts` table has been created with the following structure:

```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY DEFAULT cuid(),
  name TEXT NOT NULL,
  starting_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  user_id TEXT,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL
);
```

## Troubleshooting

- **Connection Refused:** Database server is not running or wrong connection details
- **Authentication Failed:** Wrong username/password in DATABASE_URL
- **Database Not Found:** Database name doesn't exist, create it first
- **SSL Issues:** For local databases, you might need to add `?sslmode=disable` to the URL
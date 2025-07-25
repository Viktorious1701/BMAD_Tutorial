# Quick PostgreSQL Setup

## 1. Install PostgreSQL

**Download:** https://www.postgresql.org/download/windows/

- Download the installer
- Run installer with default settings
- **Remember the password you set for 'postgres' user**
- Default port: 5432

## 2. Update Password (if needed)

If your postgres password is not 'postgres', update the `.env` file:

```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/wallet_db"
```

## 3. Run Setup

**Option A: Automatic Setup**
```bash
# Run the setup script
setup-db.bat
```

**Option B: Manual Setup**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE wallet_db;"

# Run migrations
npm run db:migrate

# Test connection
node test-db.js
```

## 4. Start Development Server

```bash
npm run dev
```

## 5. Test API

Open: http://localhost:3001/api/accounts

Should return: `[]` (empty array)

## Troubleshooting

- **psql not found:** Add PostgreSQL bin folder to PATH
- **Connection refused:** Check if PostgreSQL service is running
- **Authentication failed:** Check password in .env file
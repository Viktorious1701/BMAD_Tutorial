// Quick database connection test
// Run with: node test-db.js

require('dotenv').config();

const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');

async function testConnection() {
  console.log('Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env file');
    return;
  }
  
  if (process.env.DATABASE_URL.includes('username:password')) {
    console.error('❌ DATABASE_URL contains placeholder values');
    console.log('Please update your .env file with a real database URL');
    console.log('See DATABASE_SETUP.md for instructions');
    return;
  }
  
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    // Test basic connection
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    
    // Check if accounts table exists
    try {
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'accounts'
        )
      `);
      
      if (tableCheck.rows[0].exists) {
        console.log('✅ Accounts table exists');
        
        // Count existing accounts
        const count = await client.query('SELECT COUNT(*) as count FROM accounts');
        console.log(`📊 Current accounts in database: ${count.rows[0].count}`);
      } else {
        console.log('⚠️  Accounts table does not exist');
        console.log('Run: npm run db:migrate');
      }
    } catch (tableError) {
      console.log('⚠️  Could not check accounts table:', tableError.message);
      console.log('You may need to run: npm run db:migrate');
    }
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Check if your database server is running');
      console.log('2. Verify the DATABASE_URL in your .env file');
      console.log('3. For local PostgreSQL, ensure it\'s installed and running');
      console.log('4. For Neon, check your connection string is correct');
    }
  }
}

testConnection();
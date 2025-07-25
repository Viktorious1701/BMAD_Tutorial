const { Pool } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const commonPasswords = ['password', 'postgres', '123456', 'admin', ''];

async function testPassword(password) {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: password,
    port: 5432,
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version()');
    client.release();
    await pool.end();
    return true;
  } catch (error) {
    await pool.end();
    return false;
  }
}

async function findPassword() {
  console.log('🔍 Testing common PostgreSQL passwords...');
  
  for (const password of commonPasswords) {
    const displayPassword = password === '' ? '(empty)' : password;
    process.stdout.write(`Testing password: ${displayPassword}... `);
    
    const works = await testPassword(password);
    if (works) {
      console.log('✅ SUCCESS!');
      console.log(`\n🎉 Found working password: "${password}"`);
      
      // Update .env file
      const fs = require('fs');
      const envContent = `# Database Configuration - Local PostgreSQL\n# Simple local setup for development\nDATABASE_URL="postgresql://postgres:${password}@localhost:5432/wallet_db"`;
      fs.writeFileSync('.env', envContent);
      console.log('✅ Updated .env file with correct password');
      
      return password;
    } else {
      console.log('❌ Failed');
    }
  }
  
  console.log('\n❌ None of the common passwords worked.');
  console.log('Please enter your PostgreSQL password manually:');
  
  return new Promise((resolve) => {
    rl.question('PostgreSQL password for user "postgres": ', async (password) => {
      const works = await testPassword(password);
      if (works) {
        console.log('✅ Password works!');
        
        // Update .env file
        const fs = require('fs');
        const envContent = `# Database Configuration - Local PostgreSQL\n# Simple local setup for development\nDATABASE_URL="postgresql://postgres:${password}@localhost:5432/wallet_db"`;
        fs.writeFileSync('.env', envContent);
        console.log('✅ Updated .env file with correct password');
        
        resolve(password);
      } else {
        console.log('❌ Password still doesn\'t work. Please check your PostgreSQL installation.');
        resolve(null);
      }
      rl.close();
    });
  });
}

findPassword().then((password) => {
  if (password !== null) {
    console.log('\n🚀 Ready to proceed! You can now run:');
    console.log('   npm run db:migrate');
    console.log('   npm run dev');
  }
}).catch(console.error);
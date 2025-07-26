import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { accounts } from '@/lib/db/schema';
import { CreateAccountRequest } from '@/types/account';
import { z } from 'zod';

// Validation schema
const createAccountSchema = z.object({
  name: z.string().min(1, 'Account name is required').max(100, 'Account name too long'),
  startingBalance: z.number().min(0, 'Starting balance must be non-negative'),
});

// GET /api/accounts - Retrieve all accounts
export async function GET() {
  try {
    const allAccounts = await db.select().from(accounts).orderBy(accounts.createdAt);
    
    // Convert decimal to number for JSON response
    const formattedAccounts = allAccounts.map(account => ({
      ...account,
      startingBalance: parseFloat(account.startingBalance),
    }));
    
    return NextResponse.json(formattedAccounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create a new account
export async function POST(request: NextRequest) {
  try {
    const body: CreateAccountRequest = await request.json();
    
    // Validate input
    const validatedData = createAccountSchema.parse(body);
    
    // Create account in database
    const [newAccount] = await db.insert(accounts).values({
      name: validatedData.name,
      startingBalance: validatedData.startingBalance.toString(),
      updatedAt: new Date(),
    }).returning();
    
    // Format response
    const formattedAccount = {
      ...newAccount,
      startingBalance: parseFloat(newAccount.startingBalance),
    };
    
    return NextResponse.json(formattedAccount, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
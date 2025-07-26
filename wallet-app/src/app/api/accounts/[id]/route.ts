import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { accounts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema for updating account
const updateAccountSchema = z.object({
  name: z.string().min(1, 'Account name is required').max(100, 'Account name too long').optional(),
  startingBalance: z.number().min(0, 'Starting balance must be non-negative').optional(),
});

// PATCH /api/accounts/[id] - Update an account
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validate input
    const validatedData = updateAccountSchema.parse(body);
    
    // Check if account exists
    const existingAccount = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    
    if (existingAccount.length === 0) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData: {
      updatedAt: Date;
      name?: string;
      startingBalance?: string;
    } = {
      updatedAt: new Date(),
    };
    
    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name;
    }
    
    if (validatedData.startingBalance !== undefined) {
      updateData.startingBalance = validatedData.startingBalance.toString();
    }
    
    // Update account in database
    const [updatedAccount] = await db
      .update(accounts)
      .set(updateData)
      .where(eq(accounts.id, id))
      .returning();
    
    // Format response
    const formattedAccount = {
      ...updatedAccount,
      startingBalance: parseFloat(updatedAccount.startingBalance),
    };
    
    return NextResponse.json(formattedAccount);
  } catch (error) {
    console.error('Error updating account:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE /api/accounts/[id] - Delete an account
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if account exists
    const existingAccount = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    
    if (existingAccount.length === 0) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    
    // Delete account from database
    await db.delete(accounts).where(eq(accounts.id, id));
    
    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting account:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}

// GET /api/accounts/[id] - Get a specific account
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const account = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);
    
    if (account.length === 0) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    
    // Format response
    const formattedAccount = {
      ...account[0],
      startingBalance: parseFloat(account[0].startingBalance),
    };
    
    return NextResponse.json(formattedAccount);
  } catch (error) {
    console.error('Error fetching account:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}
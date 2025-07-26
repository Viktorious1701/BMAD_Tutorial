import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { transactions, accounts, categories } from '@/lib/db/schema';
import { CreateTransactionRequest } from '@/types/transaction';
import { z } from 'zod';
import { eq, and, gte, lt, desc } from 'drizzle-orm';

// Validation schema
const createTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense'], { required_error: 'Type must be income or expense' }),
  description: z.string().optional(),
  accountId: z.string().min(1, 'Account ID is required'),
  categoryId: z.string().min(1, 'Category ID is required'),
});

// GET /api/transactions - Retrieve all transactions for the current month
export async function GET() {
  try {
    // Get current month start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    const allTransactions = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        type: transactions.type,
        description: transactions.description,
        accountId: transactions.accountId,
        categoryId: transactions.categoryId,
        createdAt: transactions.createdAt,
        updatedAt: transactions.updatedAt,
      })
      .from(transactions)
      .where(
        and(
          gte(transactions.createdAt, startOfMonth),
          lt(transactions.createdAt, startOfNextMonth)
        )
      )
      .orderBy(desc(transactions.createdAt));
    
    // Convert decimal to number for JSON response
    const formattedTransactions = allTransactions.map(transaction => ({
      ...transaction,
      amount: parseFloat(transaction.amount),
    }));
    
    return NextResponse.json(formattedTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const body: CreateTransactionRequest = await request.json();
    
    // Validate input
    const validatedData = createTransactionSchema.parse(body);
    
    // Verify account exists
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, validatedData.accountId))
      .limit(1);
    
    if (account.length === 0) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    
    // Verify category exists
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, validatedData.categoryId))
      .limit(1);
    
    if (category.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Create transaction in database
    const [newTransaction] = await db.insert(transactions).values({
      amount: validatedData.amount.toString(),
      type: validatedData.type,
      description: validatedData.description || null,
      accountId: validatedData.accountId,
      categoryId: validatedData.categoryId,
      updatedAt: new Date(),
    }).returning();
    
    // Format response
    const formattedTransaction = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    };
    
    return NextResponse.json(formattedTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
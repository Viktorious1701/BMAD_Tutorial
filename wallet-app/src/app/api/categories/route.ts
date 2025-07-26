import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { CreateCategoryRequest } from '@/types/transaction';
import { z } from 'zod';

// Validation schema
const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name too long'),
});

// GET /api/categories - Retrieve all categories
export async function GET() {
  try {
    const allCategories = await db.select().from(categories).orderBy(categories.name);
    
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body: CreateCategoryRequest = await request.json();
    
    // Validate input
    const validatedData = createCategorySchema.parse(body);
    
    // Create category in database
    const [newCategory] = await db.insert(categories).values({
      name: validatedData.name,
      updatedAt: new Date(),
    }).returning();
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
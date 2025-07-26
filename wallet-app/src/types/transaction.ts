export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string | null;
  accountId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTransaction {
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  accountId: string;
  categoryId: string;
}

export interface CreateTransactionRequest {
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  accountId: string;
  categoryId: string;
}

export interface TransactionResponse {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string | null;
  accountId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewCategory {
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
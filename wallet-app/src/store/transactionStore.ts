import { create } from 'zustand';
import { Transaction, CreateTransactionRequest, Category } from '@/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  createTransaction: (transactionData: CreateTransactionRequest) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  categories: [],
  isLoading: false,
  error: null,
  
  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/transactions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const transactions = await response.json();
      set({ transactions, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  createTransaction: async (transactionData: CreateTransactionRequest) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create transaction');
      }
      
      const newTransaction = await response.json();
      
      // Add new transaction to the list
      set(state => ({
        transactions: [newTransaction, ...state.transactions],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const categories = await response.json();
      set({ categories, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  createCategory: async (name: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create category');
      }
      
      const newCategory = await response.json();
      
      // Add new category to the list
      set(state => ({
        categories: [...state.categories, newCategory],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  clearError: () => set({ error: null }),
}));
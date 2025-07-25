import { create } from 'zustand';
import { Account, CreateAccountRequest } from '@/types/account';

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAccounts: () => Promise<void>;
  createAccount: (accountData: CreateAccountRequest) => Promise<void>;
  clearError: () => void;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  isLoading: false,
  error: null,
  
  fetchAccounts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/accounts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      
      const accounts = await response.json();
      set({ accounts, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
  createAccount: async (accountData: CreateAccountRequest) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create account');
      }
      
      const newAccount = await response.json();
      
      // Add new account to the list
      set(state => ({
        accounts: [...state.accounts, newAccount],
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
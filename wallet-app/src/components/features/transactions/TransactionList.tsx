'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTransactionStore } from '@/store/transactionStore';
import { useAccountStore } from '@/store/accountStore';
import { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/lib/currency';

interface TransactionListProps {
  onTransactionAdded?: () => void;
}

export default function TransactionList({ onTransactionAdded }: TransactionListProps) {
  const { 
    transactions, 
    categories, 
    fetchTransactions, 
    fetchCategories, 
    isLoading, 
    error 
  } = useTransactionStore();
  
  const { accounts, fetchAccounts } = useAccountStore();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Load data on component mount
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchAccounts();
  }, [fetchTransactions, fetchCategories, fetchAccounts]);
  
  // Refresh transactions when a new transaction is added
  useEffect(() => {
    if (onTransactionAdded) {
      fetchTransactions();
    }
  }, [onTransactionAdded, fetchTransactions]);
  
  const getAccountName = (accountId: string): string => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.name || 'Unknown Account';
  };
  
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown Category';
  };
  
  const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const formatTime = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const getCurrentMonthName = (): string => {
    return currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
    // Note: In a full implementation, you'd filter transactions by the selected month
    // For now, we're showing current month transactions from the API
  };
  
  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expenses, net: income - expenses };
  };
  
  const totals = calculateTotals();
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <p className="text-gray-500">Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
            >
              ←
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {getCurrentMonthName()}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
            >
              →
            </Button>
          </div>
        </div>
        
        {/* Monthly Summary */}
        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Income</p>
            <p className="text-lg font-semibold text-green-600">
              {formatCurrency(totals.income)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="text-lg font-semibold text-red-600">
              {formatCurrency(totals.expenses)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Net</p>
            <p className={`text-lg font-semibold ${
              totals.net >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(totals.net)}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found for this month.</p>
            <p className="text-sm text-gray-400 mt-1">
              Add your first transaction to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {transaction.description || 'No description'}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{getAccountName(transaction.accountId)}</span>
                        <span>•</span>
                        <span>{getCategoryName(transaction.categoryId)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <div className="text-sm text-gray-500">
                        <span>{formatDate(transaction.createdAt)}</span>
                        <span className="ml-2">{formatTime(transaction.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
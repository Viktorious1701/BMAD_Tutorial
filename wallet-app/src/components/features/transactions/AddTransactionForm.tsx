'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, Option } from '@/components/ui/select';
import { useTransactionStore } from '@/store/transactionStore';
import { useAccountStore } from '@/store/accountStore';
import { CreateTransactionRequest } from '@/types/transaction';

interface AddTransactionFormProps {
  onSuccess?: () => void;
}

export default function AddTransactionForm({ onSuccess }: AddTransactionFormProps) {
  const [formData, setFormData] = useState<CreateTransactionRequest>({
    amount: 0,
    type: 'expense',
    description: '',
    accountId: '',
    categoryId: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { 
    createTransaction, 
    fetchCategories, 
    createCategory,
    categories, 
    isLoading, 
    error 
  } = useTransactionStore();
  
  const { accounts, fetchAccounts } = useAccountStore();
  
  // Load accounts and categories on component mount
  useEffect(() => {
    fetchAccounts();
    fetchCategories();
  }, [fetchAccounts, fetchCategories]);
  
  // Create default category if none exist
  useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      createCategory('General');
    }
  }, [categories.length, isLoading, createCategory]);
  
  // Set default account and category when they become available
  useEffect(() => {
    if (accounts.length > 0 && !formData.accountId) {
      setFormData(prev => ({ ...prev, accountId: accounts[0].id }));
    }
  }, [accounts, formData.accountId]);
  
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.accountId) {
      newErrors.accountId = 'Please select an account';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await createTransaction(formData);
      
      // Reset form
      setFormData({
        amount: 0,
        type: 'expense',
        description: '',
        accountId: accounts.length > 0 ? accounts[0].id : '',
        categoryId: categories.length > 0 ? categories[0].id : '',
      });
      
      setErrors({});
      onSuccess?.();
    } catch (err) {
      console.error('Failed to create transaction:', err);
    }
  };
  
  const handleInputChange = (field: keyof CreateTransactionRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>
          
          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value as 'income' | 'expense')}
            >
              <Option value="expense">Expense</Option>
              <Option value="income">Income</Option>
            </Select>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter description..."
            />
          </div>
          
          {/* Account Selection */}
          <div className="space-y-2">
            <Label htmlFor="accountId">Account</Label>
            <Select
              id="accountId"
              value={formData.accountId}
              onChange={(e) => handleInputChange('accountId', e.target.value)}
              error={!!errors.accountId}
            >
              <Option value="">Select an account</Option>
              {accounts.map((account) => (
                <Option key={account.id} value={account.id}>
                  {account.name}
                </Option>
              ))}
            </Select>
            {errors.accountId && (
              <p className="text-sm text-red-500">{errors.accountId}</p>
            )}
          </div>
          
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
              error={!!errors.categoryId}
            >
              <Option value="">Select a category</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">{errors.categoryId}</p>
            )}
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Transaction'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
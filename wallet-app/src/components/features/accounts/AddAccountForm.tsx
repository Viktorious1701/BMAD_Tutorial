'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccountStore } from '@/store/accountStore';
import { Plus, Waves } from 'lucide-react';
import { formatVND, convertVNDToUSD, parseVNDInput } from '@/lib/currency';

export function AddAccountForm() {
  const [name, setName] = useState('');
  const [startingBalance, setStartingBalance] = useState('');
  const [errors, setErrors] = useState<{ name?: string; startingBalance?: string }>({});
  const [displayBalance, setDisplayBalance] = useState('');
  
  const { createAccount, isLoading, error } = useAccountStore();
  
  const validateForm = () => {
    const newErrors: { name?: string; startingBalance?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Tên tài khoản là bắt buộc';
    } else if (name.length > 100) {
      newErrors.name = 'Tên tài khoản phải có tối đa 100 ký tự';
    }
    
    const balance = parseVNDInput(startingBalance);
    if (!startingBalance.trim()) {
      newErrors.startingBalance = 'Số dư ban đầu là bắt buộc';
    } else if (isNaN(balance)) {
      newErrors.startingBalance = 'Số dư ban đầu phải là số hợp lệ';
    } else if (balance < 0) {
      newErrors.startingBalance = 'Số dư ban đầu không thể âm';
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
      const vndBalance = parseVNDInput(startingBalance);
      const usdBalance = convertVNDToUSD(vndBalance);
      
      await createAccount({
        name: name.trim(),
        startingBalance: usdBalance, // Store as USD in database
      });
      
      // Reset form on success
      setName('');
      setStartingBalance('');
      setDisplayBalance('');
      setErrors({});
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to create account:', error);
    }
  };
  
  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartingBalance(value);
    
    // Update display with formatted VND
    const parsed = parseVNDInput(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setDisplayBalance(formatVND(parsed));
    } else {
      setDisplayBalance('');
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-2 border-blue-200/50 shadow-lg">
      <CardHeader className="ocean-gradient text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-bold">
          <Waves className="h-5 w-5 text-white wave-animation" />
          Thêm Tài Khoản Mới
        </CardTitle>
        <CardDescription className="text-blue-100">
          Tạo tài khoản tài chính mới để theo dõi tiền của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold" style={{color: 'var(--deep-current)'}}>Tên Tài Khoản</Label>
            <Input
              id="name"
              type="text"
              placeholder="VD: Tài khoản tiết kiệm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`transition-all duration-200 ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-blue-200 focus:border-blue-400'} bg-white/80`}
            />
            {errors.name && (
              <p className="text-sm font-medium" style={{color: 'var(--sunset-orange)'}}>{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startingBalance" className="font-semibold" style={{color: 'var(--deep-current)'}}>Số Dư Ban Đầu (VND)</Label>
            <div className="relative">
              <Input
                id="startingBalance"
                type="text"
                placeholder="0"
                value={startingBalance}
                onChange={handleBalanceChange}
                className={`transition-all duration-200 ${errors.startingBalance ? 'border-red-400 focus:border-red-500' : 'border-blue-200 focus:border-blue-400'} bg-white/80 pr-12`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium" style={{color: 'var(--ocean-medium)'}}>₫</span>
            </div>
            {displayBalance && (
              <p className="text-sm font-medium" style={{color: 'var(--wave-crest)'}}>
                Hiển thị: {displayBalance}
              </p>
            )}
            {errors.startingBalance && (
              <p className="text-sm font-medium" style={{color: 'var(--sunset-orange)'}}>{errors.startingBalance}</p>
            )}
          </div>
          
          {error && (
            <div className="p-3 text-sm font-medium rounded-md" style={{color: 'var(--sunset-orange)', backgroundColor: 'var(--beach-light)', border: '1px solid var(--sunset-coral)'}}>
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full font-semibold py-3 transition-all duration-300 hover:scale-105 sunset-gradient text-white border-0 shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
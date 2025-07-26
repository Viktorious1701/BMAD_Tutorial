'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccountStore } from '@/store/accountStore';
import { Plus, Waves, Anchor } from 'lucide-react';
import { formatVND, parseVNDInput } from '@/lib/currency';
import { WaveRipple } from '@/components/ui/particle-effects';

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
      
      await createAccount({
        name: name.trim(),
        startingBalance: vndBalance, // Store as VND directly in database
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
    <div className="organic-card p-8 relative overflow-hidden">
      <div className="absolute inset-0 geometric-waves opacity-5"></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="ocean-gradient p-3 rounded-full">
              <Waves className="h-6 w-6 text-white floating" />
            </div>
            <div className="sunset-gradient p-3 rounded-full">
              <Anchor className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--deep-current)'}}>
            Tạo Dòng Chảy Mới
          </h3>
          <p className="text-lg" style={{color: 'var(--ocean-medium)'}}>
            Khởi tạo một dòng chảy tài chính mới trong đại dương của bạn
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-semibold" style={{color: 'var(--deep-current)'}}>
              Tên Dòng Chảy
            </Label>
            <WaveRipple>
              <Input
                id="name"
                type="text"
                placeholder="VD: Dòng chảy tiết kiệm, Kho báu khẩn cấp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`transition-all duration-300 text-lg p-4 rounded-xl ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-blue-200 focus:border-blue-400'} bg-white/80 backdrop-blur-sm`}
              />
            </WaveRipple>
            {errors.name && (
              <p className="text-sm font-medium flex items-center gap-2" style={{color: 'var(--sunset-orange)'}}>
                🌊 {errors.name}
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="startingBalance" className="text-lg font-semibold" style={{color: 'var(--deep-current)'}}>
              Giá Trị Khởi Đầu (VND)
            </Label>
            <WaveRipple>
              <div className="relative">
                <Input
                  id="startingBalance"
                  type="text"
                  placeholder="0"
                  value={startingBalance}
                  onChange={handleBalanceChange}
                  className={`transition-all duration-300 text-lg p-4 pr-16 rounded-xl ${errors.startingBalance ? 'border-red-400 focus:border-red-500' : 'border-blue-200 focus:border-blue-400'} bg-white/80 backdrop-blur-sm`}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-bold" style={{color: 'var(--ocean-medium)'}}>
                  ₫
                </span>
              </div>
            </WaveRipple>
            {displayBalance && (
              <div className="p-3 rounded-lg" style={{backgroundColor: 'var(--wave-crest)', color: 'var(--deep-current)'}}>
                <p className="text-sm font-bold flex items-center gap-2">
                  💰 Hiển thị: {displayBalance}
                </p>
              </div>
            )}
            {errors.startingBalance && (
              <p className="text-sm font-medium flex items-center gap-2" style={{color: 'var(--sunset-orange)'}}>
                🌊 {errors.startingBalance}
              </p>
            )}
          </div>
          
          {error && (
            <div className="p-4 rounded-xl" style={{color: 'var(--sunset-orange)', backgroundColor: 'var(--beach-light)', border: '2px solid var(--sunset-coral)'}}>
              <p className="text-sm font-medium flex items-center gap-2">
                ⚠️ {error}
              </p>
            </div>
          )}
          
          <WaveRipple>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 wave-button border-0 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Waves className="h-5 w-5 floating" />
                  Đang tạo dòng chảy...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Tạo Dòng Chảy Mới
                </span>
              )}
            </Button>
          </WaveRipple>
        </form>
      </div>
    </div>
  );
}
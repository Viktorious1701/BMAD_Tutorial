'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccountStore } from '@/store/accountStore';
import { Waves, Plus, X } from 'lucide-react';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createAccount } = useAccountStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Vui lòng nhập tên tài khoản');
      return;
    }

    const balanceValue = parseFloat(balance) || 0;
    
    setIsLoading(true);
    try {
      await createAccount({
        name: name.trim(),
        startingBalance: balanceValue,
      });
      
      alert('Tạo tài khoản thành công!');
      setName('');
      setBalance('');
      onClose();
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Có lỗi xảy ra khi tạo tài khoản');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setBalance('');
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Tạo Tài Khoản Mới"
      className="sm:max-w-md"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="ocean-gradient p-2 rounded-full">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{color: 'var(--deep-current)'}}>
            Tạo Tài Khoản Mới
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium" style={{color: 'var(--deep-current)'}}>
                Tên Tài Khoản
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Tài khoản tiết kiệm, Ví tiền mặt..."
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                style={{
                  borderColor: 'var(--ocean-light)',
                  backgroundColor: 'var(--sand-light)'
                }}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="balance" className="text-sm font-medium" style={{color: 'var(--deep-current)'}}>
                Số Dư Ban Đầu (VNĐ)
              </Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0"
                min="0"
                step="1000"
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                style={{
                  borderColor: 'var(--ocean-light)',
                  backgroundColor: 'var(--sand-light)'
                }}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'var(--ocean-light)',
                color: 'var(--ocean-medium)'
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 wave-button text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg hover:shadow-xl"
            >
              <Waves className="h-4 w-4 mr-2" />
              {isLoading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
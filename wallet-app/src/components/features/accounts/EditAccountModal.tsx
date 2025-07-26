'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Account } from '@/types/account';
import { useAccountStore } from '@/store/accountStore';
import { formatVND } from '@/lib/currency';

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
}

export function EditAccountModal({ isOpen, onClose, account }: EditAccountModalProps) {
  const [balance, setBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { fetchAccounts } = useAccountStore();

  React.useEffect(() => {
    if (account && isOpen) {
      // Account balance is already in VND
      setBalance(account.startingBalance.toString());
    } else {
      setBalance('');
      setError('');
    }
  }, [account, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    setIsLoading(true);
    setError('');

    try {
      // Parse VND amount for storage
      const balanceNumber = parseFloat(balance.replace(/[^0-9.-]/g, ''));
      if (isNaN(balanceNumber) || balanceNumber < 0) {
        throw new Error('Vui lòng nhập số dư hợp lệ');
      }

      // Store VND amount directly

      const response = await fetch(`/api/accounts/${account.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startingBalance: balanceNumber,
          }),
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể cập nhật số dư');
      }

      // Refresh accounts list
      await fetchAccounts();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    // Amount is already in VND, just format it
    return formatVND(amount);
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBalance(value);
  };

  const formatDisplayBalance = (value: string) => {
    if (!value) return '';
    const number = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return '';
    return number.toLocaleString('vi-VN');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chỉnh Sửa Số Dư Tài Khoản"
      className="max-w-lg"
    >
      {account && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Tên tài khoản
            </Label>
            <div className="p-3 bg-gray-50 rounded-md border">
              <span className="text-gray-900 font-medium">{account.name}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Số dư hiện tại
            </Label>
            <div className="p-3 bg-gray-50 rounded-md border">
              <span className="text-green-600 font-bold text-lg">
                {formatCurrency(account.startingBalance)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance" className="text-sm font-medium text-gray-700">
              Số dư mới (VND)
            </Label>
            <Input
              id="balance"
              type="text"
              value={formatDisplayBalance(balance)}
              onChange={handleBalanceChange}
              placeholder="Nhập số dư mới"
              className="text-lg"
              required
            />
            <p className="text-xs text-gray-500">
              Nhập số tiền bằng đồng Việt Nam (VND)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
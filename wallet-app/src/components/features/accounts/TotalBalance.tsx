'use client';

import React from 'react';
import { useAccountStore } from '@/store/accountStore';
import { formatVND } from '@/lib/currency';
import { TrendingUp, Wallet, Waves } from 'lucide-react';
import { WaveRipple } from '@/components/ui/particle-effects';

export function TotalBalance() {
  const { accounts } = useAccountStore();

  const totalBalance = accounts.reduce((sum, account) => {
    return sum + account.startingBalance;
  }, 0);

  const formatCurrency = (amount: number) => {
    // Amount is already in VND, just format it
    return formatVND(amount);
  };

  return (
    <WaveRipple>
      <div className="organic-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 ocean-gradient opacity-90"></div>
        <div className="absolute inset-0 geometric-waves opacity-10"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Wallet className="h-8 w-8" />
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Waves className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Kho Báu Đại Dương</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-4xl font-bold mb-2 drop-shadow-lg text-white">
                {formatCurrency(totalBalance)}
              </p>
              <p className="text-white/90 text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Từ {accounts.length} dòng chảy tài khoản
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80 mb-2 font-medium">Giá trị trung bình mỗi dòng</div>
              <div className="text-2xl font-bold drop-shadow-lg text-white">
                {accounts.length > 0 ? formatCurrency(totalBalance / accounts.length) : formatCurrency(0)}
              </div>
              <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-xs text-white/70 mb-1 font-medium">Trạng thái đại dương</div>
                <div className="text-sm font-bold text-white">
                  {totalBalance > 0 ? '🌊 Thủy triều lên' : '🏖️ Bình lặng'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WaveRipple>
  );
}
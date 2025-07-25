'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccountStore } from '@/store/accountStore';
import { Wallet, AlertCircle, Loader2, Waves } from 'lucide-react';
import { Account } from '@/types/account';
import { formatVND, convertUSDToVND } from '@/lib/currency';

function AccountCard({ account }: { account: Account }) {
  const formatCurrency = (amount: number) => {
    // Convert USD to VND and format
    const vndAmount = convertUSDToVND(amount);
    return formatVND(vndAmount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 wave-animation bg-white/90 backdrop-blur-sm border-2 border-blue-200/50 hover:border-blue-300">
      <CardHeader className="pb-3 ocean-gradient text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Waves className="h-5 w-5 text-white" />
          {account.name}
        </CardTitle>
        <CardDescription className="text-blue-100">
          Tạo ngày {formatDate(account.createdAt.toString())}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{color: 'var(--deep-current)'}}>Số dư ban đầu:</span>
          <span className="text-xl font-bold text-green-600 drop-shadow-sm">
            {formatCurrency(account.startingBalance)}
          </span>
        </div>
        <div className="mt-3 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 rounded-full"></div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <Waves className="h-8 w-8 wave-animation" style={{color: 'var(--ocean-medium)'}} />
      <span className="ml-2 font-medium" style={{color: 'var(--deep-current)'}}>Đang tải tài khoản...</span>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <AlertCircle className="h-8 w-8" style={{color: 'var(--sunset-orange)'}} />
      <span className="ml-2 font-medium" style={{color: 'var(--sunset-orange)'}}>{error}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="text-center p-8 bg-white/90 backdrop-blur-sm border-2 border-blue-200/50">
      <CardContent className="pt-6">
        <Waves className="h-12 w-12 mx-auto mb-4 wave-animation" style={{color: 'var(--ocean-light)'}} />
        <CardTitle className="mb-2" style={{color: 'var(--deep-current)'}}>Chưa có tài khoản nào</CardTitle>
        <CardDescription style={{color: 'var(--ocean-medium)'}}>
          Tạo tài khoản đầu tiên để bắt đầu quản lý tài chính của bạn.
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function AccountList() {
  const { accounts, isLoading, error, fetchAccounts } = useAccountStore();
  
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
  }
  
  if (accounts.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg ocean-gradient">
        <Waves className="h-7 w-7 text-white wave-animation" />
        <h2 className="text-2xl font-bold text-white">Tài Khoản Của Bạn</h2>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full text-white font-medium">
          {accounts.length} tài khoản
        </span>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
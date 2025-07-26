'use client';

import React, { useEffect, useState } from 'react';
import { useAccountStore } from '@/store/accountStore';
import { Wallet, AlertCircle, Loader2, Waves, Edit3, Anchor, Fish } from 'lucide-react';
import { Account } from '@/types/account';
import { formatVND } from '@/lib/currency';
import { EditAccountModal } from './EditAccountModal';


function AccountItem({ account, onEdit }: { account: Account; onEdit: (account: Account) => void }) {
  const formatCurrency = (amount: number) => {
    // Amount is already in VND, just format it
    return formatVND(amount);
  };
  
  return (
    <div 
      className="organic-card p-6 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      onClick={() => onEdit(account)}
    >
      <div className="absolute inset-0 geometric-waves opacity-5"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="ocean-gradient p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl text-heading truncate">
              {account.name}
            </h3>
            <p className="text-sm text-white flex items-center gap-2">
              <Waves className="h-4 w-4" />
              Nhấn để điều chỉnh dòng chảy
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl text-accent">
              {formatCurrency(account.startingBalance)}
            </p>
            <p className="text-sm text-white">
              Giá trị hiện tại
            </p>
          </div>
          <div className="sunset-gradient p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Edit3 className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <Waves className="h-8 w-8 wave-animation" style={{color: 'var(--ocean-medium)'}} />
      <span className="ml-2 text-white">Đang tải tài khoản...</span>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <AlertCircle className="h-8 w-8" style={{color: 'var(--sunset-orange)'}} />
      <span className="ml-2 text-white">{error}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="organic-card text-center p-12 relative overflow-hidden">
      <div className="absolute inset-0 geometric-waves opacity-5"></div>
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="ocean-gradient p-4 rounded-full">
            <Waves className="h-12 w-12 text-white floating" />
          </div>
          <div className="sunset-gradient p-4 rounded-full">
            <Fish className="h-12 w-12 text-white" />
          </div>
        </div>
        <h3 className="text-3xl text-heading mb-4">
          Đại Dương Còn Trống
        </h3>
        <p className="text-xl text-white max-w-md mx-auto">
          Hãy tạo dòng chảy đầu tiên để bắt đầu hành trình quản lý kho báu của bạn
        </p>
        <div className="mt-8 p-4 rounded-lg" style={{backgroundColor: 'var(--wave-crest)'}}>
          <p className="text-sm text-white">
            💡 Mẹo: Sử dụng biểu mẫu bên trái để tạo dòng chảy tài chính đầu tiên
          </p>
        </div>
      </div>
    </div>
  );
}

export function AccountList() {
  const { accounts, isLoading, error, fetchAccounts } = useAccountStore();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedAccount(null);
  };
  
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
    <>
      <div className="space-y-6">
        <div className="organic-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 ocean-gradient opacity-90"></div>
          <div className="absolute inset-0 geometric-waves opacity-10"></div>
          <div className="relative z-10 flex items-center gap-4 text-white">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Waves className="h-8 w-8 floating" />
            </div>
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Anchor className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">Kho Báu Dòng Chảy</h2>
              <p className="text-white/90 font-medium">Quản lý tất cả các dòng chảy tài chính</p>
            </div>
            <div className="text-right">
              <span className="text-sm bg-white/20 px-4 py-2 rounded-full font-bold backdrop-blur-sm text-white">
                {accounts.length} dòng chảy
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {accounts.map((account) => (
            <AccountItem 
              key={account.id} 
              account={account} 
              onEdit={handleEditAccount}
            />
          ))}
        </div>
      </div>

      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        account={selectedAccount}
      />
    </>
  );
}
'use client';

import React, { useState } from 'react';
import { AccountList } from '@/components/features/accounts/AccountList';
import { TotalBalance } from '@/components/features/accounts/TotalBalance';
import { AddAccountModal } from '@/components/features/accounts/AddAccountModal';
import { Button } from '@/components/ui/button';
import { Waves, TrendingUp, Anchor, Compass, Plus } from 'lucide-react';

export default function AccountsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="wave-section min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="ocean-gradient p-4 rounded-full shadow-xl">
              <Anchor className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl text-heading bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
              Quản Lý Tài Khoản
            </h1>
            <div className="sunset-gradient p-4 rounded-full shadow-xl">
              <Compass className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="text-lg text-body leading-relaxed max-w-2xl mx-auto">
            Điều hướng qua các dòng chảy tài chính của bạn
          </p>
        </div>

        {/* Total Balance Section */}
        <div className="mb-8">
          <TotalBalance />
        </div>
        
        <div className="wave-divider mb-8"></div>
        
        {/* Accounts Section Header with Create Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="ocean-gradient p-3 rounded-full">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-heading">Danh Sách Tài Khoản</h2>
              <p className="text-sm text-body">Quản lý tất cả các dòng chảy tài chính</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="wave-button button-text text-lg py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tạo Tài Khoản Mới
          </Button>
        </div>
        
        {/* Account List */}
        <div className="mb-8">
          <AccountList />
        </div>
        
        <div className="wave-divider my-8"></div>
        
        {/* Info Card */}
        <div className="organic-card p-6 relative overflow-hidden">
          <div className="absolute inset-0 geometric-waves opacity-5"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="ocean-gradient p-3 rounded-full">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-heading">Bí Quyết Dòng Chảy Tài Chính</h3>
                <p className="text-sm text-body">
                  Hướng dẫn để điều hướng đại dương tài khoản hiệu quả
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--wave-crest)'}}></div>
                  <p className="text-sm text-body">
                    Tạo các tài khoản riêng biệt như những dòng sông khác nhau (séc, tiết kiệm, tiền mặt)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--sunset-coral)'}}></div>
                  <p className="text-sm text-body">
                    Sử dụng tên mô tả như ngọn hải đăng để dễ dàng nhận diện
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--ocean-light)'}}></div>
                  <p className="text-sm text-body">
                    Nhấn vào tài khoản để điều chỉnh số dư như điều khiển thủy triều
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{backgroundColor: 'var(--sunset-gold)'}}></div>
                  <p className="text-sm text-body">
                    Theo dõi tổng số dư để có cái nhìn toàn cảnh đại dương tài chính
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      <AddAccountModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
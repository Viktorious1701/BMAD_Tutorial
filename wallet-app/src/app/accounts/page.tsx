'use client';

import React from 'react';
import { AddAccountForm } from '@/components/features/accounts/AddAccountForm';
import { AccountList } from '@/components/features/accounts/AccountList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, TrendingUp } from 'lucide-react';

export default function AccountsPage() {
  return (
    <div className="min-h-screen tidal-wave-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="h-8 w-8 wave-animation" style={{color: 'var(--ocean-deep)'}} />
            <h1 className="text-4xl font-bold" style={{color: '#FF8C00'}}>Quản Lý Tài Khoản</h1>
            <TrendingUp className="h-8 w-8" style={{color: 'var(--sunset-orange)'}} />
          </div>
          <p className="text-lg font-medium" style={{color: 'var(--ocean-medium)'}}>
            Quản lý các tài khoản tài chính và theo dõi số tiền của bạn qua các ví khác nhau.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Add Account Form - Left Side */}
          <div className="lg:col-span-1 flex justify-center">
            <AddAccountForm />
          </div>
          
          {/* Account List - Right Side */}
          <div className="lg:col-span-2">
            <AccountList />
          </div>
        </div>
        
        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2" style={{borderColor: 'var(--ocean-light)'}}>
          <CardHeader>
            <CardTitle style={{color: 'var(--deep-current)'}}>Bắt Đầu</CardTitle>
            <CardDescription style={{color: 'var(--ocean-medium)'}}>
              Mẹo để quản lý tài khoản hiệu quả
            </CardDescription>
          </CardHeader>
          <CardContent style={{color: 'var(--ocean-deep)'}}>
            <ul className="space-y-2 text-sm">
              <li>• Tạo các tài khoản riêng biệt cho các mục đích khác nhau (séc, tiết kiệm, tiền mặt, v.v.)</li>
              <li>• Sử dụng tên mô tả để dễ dàng nhận diện tài khoản của bạn</li>
              <li>• Đặt số dư ban đầu chính xác để theo dõi tài chính đúng cách</li>
              <li>• Bạn luôn có thể thêm nhiều tài khoản hơn khi nhu cầu tài chính phát triển</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
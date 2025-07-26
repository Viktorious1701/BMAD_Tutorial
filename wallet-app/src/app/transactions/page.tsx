'use client';

import React, { useState } from 'react';
import AddTransactionForm from '@/components/features/transactions/AddTransactionForm';
import TransactionList from '@/components/features/transactions/TransactionList';
import { Activity, TrendingUp, Waves } from 'lucide-react';
import { FloatingElement, WaveRipple } from '@/components/ui/particle-effects';

export default function TransactionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleTransactionAdded = () => {
    // Trigger a refresh of the transaction list
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="wave-section">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <FloatingElement>
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="ocean-gradient p-4 rounded-full">
                <Activity className="h-10 w-10 text-white" />
              </div>
              <div className="sunset-gradient p-4 rounded-full">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <div className="ocean-gradient p-4 rounded-full">
                <Waves className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">
              Dòng Chảy Giao Dịch
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{color: 'var(--ocean-medium)'}}>
              Theo dõi và quản lý mọi dòng chảy tài chính như những con sóng đại dương
            </p>
          </div>
        </FloatingElement>
        
        <div className="wave-divider mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add Transaction Form */}
          <FloatingElement>
            <WaveRipple>
              <div className="lg:col-span-1">
                <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
              </div>
            </WaveRipple>
          </FloatingElement>
          
          {/* Transaction List */}
          <FloatingElement>
            <div className="lg:col-span-1">
              <TransactionList key={refreshKey} onTransactionAdded={handleTransactionAdded} />
            </div>
          </FloatingElement>
        </div>
        
        <div className="wave-divider mt-16"></div>
      </div>
    </div>
  );
}
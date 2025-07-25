import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, Shield, BarChart3, Waves } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen tidal-wave-bg">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-2" style={{borderColor: 'var(--ocean-light)'}}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Waves className="h-8 w-8 wave-animation" style={{color: 'var(--ocean-deep)'}} />
              <h1 className="text-2xl font-bold" style={{color: 'var(--deep-current)'}}>Ví Điện Tử</h1>
            </div>
            <Link href="/accounts">
              <Button className="sunset-gradient text-white font-semibold px-6 py-2 hover:scale-105 transition-transform duration-200">Bắt Đầu</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6" style={{color: '#FF8C00'}}>
             Quản Lý Tiền Bạc
             <span style={{color: '#FFD700'}}> Dễ Dàng</span>
           </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium" style={{color: 'var(--ocean-medium)'}}>
            Kiểm soát tài chính của bạn với hệ thống quản lý ví đơn giản và trực quan. 
            Theo dõi nhiều tài khoản, giám sát số dư và đạt được mục tiêu tài chính.
          </p>
          <Link href="/accounts">
            <Button size="lg" className="text-lg px-8 py-4 font-bold sunset-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Bắt Đầu Quản Lý Tài Khoản
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{borderColor: 'var(--ocean-light)'}}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 rounded-full w-fit ocean-gradient">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <CardTitle style={{color: 'var(--deep-current)'}}>Nhiều Tài Khoản</CardTitle>
              <CardDescription style={{color: 'var(--ocean-medium)'}}>
                Tổ chức tiền của bạn qua các tài khoản và ví khác nhau
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{borderColor: 'var(--wave-crest)'}}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 rounded-full w-fit" style={{backgroundColor: 'var(--wave-crest)'}}>
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle style={{color: 'var(--deep-current)'}}>Theo Dõi Thời Gian Thực</CardTitle>
              <CardDescription style={{color: 'var(--ocean-medium)'}}>
                Giám sát số dư và giao dịch của bạn theo thời gian thực
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center bg-white/90 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{borderColor: 'var(--sunset-coral)'}}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 rounded-full w-fit" style={{backgroundColor: 'var(--sunset-coral)'}}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle style={{color: 'var(--deep-current)'}}>Bảo Mật & Riêng Tư</CardTitle>
              <CardDescription style={{color: 'var(--ocean-medium)'}}>
                Dữ liệu tài chính của bạn được mã hóa và lưu trữ an toàn
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 border-2" style={{borderColor: 'var(--ocean-light)'}}>
          <div className="p-4 rounded-full w-fit mx-auto mb-6 sunset-gradient">
            <BarChart3 className="h-16 w-16 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--deep-current)'}}>
            Sẵn Sàng Kiểm Soát?
          </h3>
          <p className="mb-6 max-w-md mx-auto font-medium" style={{color: 'var(--ocean-medium)'}}>
            Tham gia cùng hàng nghìn người dùng đã đơn giản hóa việc quản lý tài chính với nền tảng của chúng tôi.
          </p>
          <Link href="/accounts">
            <Button size="lg" className="text-lg px-8 py-4 font-bold sunset-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Bắt Đầu Ngay
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="h-6 w-6 wave-animation" />
            <span className="text-lg font-semibold">Ví Điện Tử</span>
          </div>
          <p className="text-blue-200">
            © 2024 Ví Điện Tử. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}

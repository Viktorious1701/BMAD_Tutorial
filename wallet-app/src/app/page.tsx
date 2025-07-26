import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, Shield, BarChart3, Waves, Anchor, Fish } from 'lucide-react';
import { WaveRipple, FloatingElement } from '@/components/ui/particle-effects';

export default function Home() {
  return (
    <div className="wave-section">
      {/* Main Content */}
      <div className="py-12">
        {/* Hero Section */}
        <FloatingElement>
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="ocean-gradient p-6 rounded-full shadow-2xl">
                <Waves className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-teal-500 to-orange-400 bg-clip-text text-transparent">
               Quản Lý Tiền Bạc
               <br />
               <span className="text-5xl">Như Dòng Chảy Đại Dương</span>
             </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto font-medium leading-relaxed" style={{color: 'var(--ocean-medium)'}}>
              Hòa mình vào dòng chảy tài chính với hệ thống quản lý ví lấy cảm hứng từ đại dương. 
              Theo dõi nhiều tài khoản, giám sát số dư và đạt được mục tiêu tài chính một cách mượt mà như sóng biển.
            </p>
            <WaveRipple>
              <Link href="/accounts">
                <Button size="lg" className="wave-button text-xl px-12 py-6 font-bold shadow-2xl hover:shadow-3xl">
                  <Anchor className="w-6 h-6 mr-3" />
                  Khám Phá Đại Dương Tài Chính
                </Button>
              </Link>
            </WaveRipple>
          </div>
        </FloatingElement>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <FloatingElement>
            <WaveRipple>
              <div className="organic-card text-center p-8 wave-animation">
                <div className="mx-auto mb-6 p-6 rounded-full w-fit ocean-gradient shadow-xl">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--deep-current)'}}>Nhiều Tài Khoản</h3>
                <p className="text-lg leading-relaxed" style={{color: 'var(--ocean-medium)'}}>
                  Tổ chức tiền của bạn qua các tài khoản và ví khác nhau như những dòng chảy riêng biệt trong đại dương
                </p>
              </div>
            </WaveRipple>
          </FloatingElement>

          <FloatingElement>
            <WaveRipple>
              <div className="organic-card text-center p-8 wave-animation" style={{animationDelay: '1s'}}>
                <div className="mx-auto mb-6 p-6 rounded-full w-fit sunset-gradient shadow-xl">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--deep-current)'}}>Theo Dõi Như Sóng</h3>
                <p className="text-lg leading-relaxed" style={{color: 'var(--ocean-medium)'}}>
                  Giám sát số dư và giao dịch của bạn theo thời gian thực, mượt mà như nhịp sóng biển
                </p>
              </div>
            </WaveRipple>
          </FloatingElement>

          <FloatingElement>
            <WaveRipple>
              <div className="organic-card text-center p-8 wave-animation" style={{animationDelay: '2s'}}>
                <div className="mx-auto mb-6 p-6 rounded-full w-fit" style={{background: 'linear-gradient(135deg, var(--wave-crest), var(--sunset-coral))'}}>
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--deep-current)'}}>Bảo Mật Sâu Thẳm</h3>
                <p className="text-lg leading-relaxed" style={{color: 'var(--ocean-medium)'}}>
                  Dữ liệu tài chính của bạn được bảo vệ an toàn như kho báu dưới đáy đại dương
                </p>
              </div>
            </WaveRipple>
          </FloatingElement>
        </div>

        {/* CTA Section */}
        <FloatingElement>
          <WaveRipple>
            <div className="organic-card text-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 geometric-waves opacity-10"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="sunset-gradient p-8 rounded-full shadow-2xl">
                    <Fish className="h-20 w-20 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">
                  Sẵn Sàng Lặn Sâu?
                </h3>
                <p className="mb-8 max-w-2xl mx-auto font-medium text-lg leading-relaxed" style={{color: 'var(--ocean-medium)'}}>
                  Tham gia cùng hàng nghìn người dùng đã khám phá đại dương tài chính và đơn giản hóa việc quản lý tiền bạc 
                  với nền tảng lấy cảm hứng từ thiên nhiên của chúng tôi.
                </p>
                <WaveRipple>
                  <Link href="/accounts">
                    <Button size="lg" className="wave-button text-xl px-12 py-6 font-bold shadow-2xl">
                      <Waves className="w-6 h-6 mr-3" />
                      Bắt Đầu Hành Trình
                    </Button>
                  </Link>
                </WaveRipple>
              </div>
            </div>
          </WaveRipple>
        </FloatingElement>
      </div>
    </div>
  );
}

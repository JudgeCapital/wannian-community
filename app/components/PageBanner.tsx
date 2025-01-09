'use client'

interface PageBannerProps {
  title: string;
  description: string;
}

export default function PageBanner({ title, description }: PageBannerProps) {
  return (
    <section className="relative h-[180px]">
      {/* Banner 背景 */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #4285F4 0%, rgba(66, 133, 244, 0.85) 100%)'
          }}
        />
      </div>

      {/* 内容区域 */}
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-[32px] text-white font-bold mb-2">{title}</h1>
        <p className="text-white text-[16px] opacity-80">
          {description}
        </p>
      </div>

      {/* 底部白色渐变过渡 */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60px]"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)'
        }}
      />
    </section>
  );
}
'use client'

import { memo, useMemo, useEffect, useState } from 'react';
import Header from "../components/Header";
import Image from "next/image";
import { User, Users, Wallet, Award, ChevronRight, LogOut, Mail, Percent, ChartBar, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '../contexts/AuthContext';

// 动态导入模态框组件
const AvatarModal = dynamic<{
  avatars: Array<{ id: number; src: string; alt: string }>;
  selectedAvatar: { id: number; src: string; alt: string };
  onSelect: (avatar: { id: number; src: string; alt: string }) => void;
  onClose: () => void;
}>(() => import('./components/AvatarModal'), { ssr: false });

const PrivilegesModal = dynamic<{
  userData: { level: MemberLevel };
  memberLevels: Record<MemberLevel, LevelConfig>;
  onClose: () => void;
}>(() => import('./components/PrivilegesModal'), { ssr: false });

// 预设头像列表
const PRESET_AVATARS = [
  { id: 1, src: "/avatars/avatar1.svg", alt: "商务精英" },
  { id: 2, src: "/avatars/avatar2.svg", alt: "科技达人" },
  { id: 3, src: "/avatars/avatar3.svg", alt: "时尚达人" },
  { id: 4, src: "/avatars/avatar4.svg", alt: "运动健将" },
  { id: 5, src: "/avatars/avatar5.svg", alt: "艺术家" },
  { id: 6, src: "/avatars/avatar6.svg", alt: "探险家" },
];

// 会员等级类型
type MemberLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// 特权类型
interface Privilege {
  icon: JSX.Element;
  title: string;
  description: string;
}

// 等级配置类型
interface LevelConfig {
  color: string;
  bgColor: string;
  name: string;
  icon: string;
  privileges: Privilege[];
}

// 统计卡片属性类型
interface StatCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  suffix?: string;
}

// 交易所列表属性类型
interface ExchangeListProps {
  exchanges: Array<{
    icon: string;
    name: string;
    rate: number;
  }>;
}

// 优化的统计卡片组件
const StatCard = memo(({ title, value, icon: Icon, suffix = 'USTD' }: StatCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-bold">{title}</h2>
      {Icon}
    </div>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold">¥{value.toLocaleString()}</span>
      <span className="text-gray-500 mb-1">{suffix}</span>
    </div>
  </div>
));

// 优化的交易所列表组件
const ExchangeList = memo(({ exchanges }: ExchangeListProps) => (
  <div className="space-y-3">
    {exchanges.map((exchange, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src={exchange.icon} 
            alt={exchange.name} 
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-gray-700">{exchange.name}</span>
        </div>
        <span className="text-[#4285F4] font-medium">{exchange.rate}%</span>
      </div>
    ))}
    {exchanges.length === 0 && (
      <div className="text-gray-500 text-center py-2">
        暂未绑定交易所
      </div>
    )}
  </div>
));

// 会员等级配置
const MEMBER_LEVELS: Record<MemberLevel, LevelConfig> = {
  'bronze': {
    color: '#CD7F32',
    bgColor: 'from-[#CD7F32]/20 to-[#CD7F32]/5',
    name: '青铜会员',
    icon: '🥉',
    privileges: [
      {
        icon: <Percent className="w-5 h-5" />,
        title: '基础返佣',
        description: '享受基础返佣比例'
      },
      {
        icon: <ChartBar className="w-5 h-5" />,
        title: '免费指标',
        description: '基础交易指标免费使用'
      }
    ]
  },
  'silver': {
    color: '#C0C0C0',
    bgColor: 'from-[#C0C0C0]/20 to-[#C0C0C0]/5',
    name: '白银会员',
    icon: '🥈',
    privileges: [
      {
        icon: <Percent className="w-5 h-5" />,
        title: '基础返佣',
        description: '享受基础返佣比例'
      },
      {
        icon: <ChartBar className="w-5 h-5" />,
        title: '免费指标',
        description: '基础交易指标免费使用'
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        title: '免费课程',
        description: '基础交易课程免费学习'
      }
    ]
  },
  'gold': {
    color: '#FFD700',
    bgColor: 'from-[#FFD700]/20 to-[#FFD700]/5',
    name: '黄金会员',
    icon: '🥇',
    privileges: [
      {
        icon: <Percent className="w-5 h-5" />,
        title: '基础返佣',
        description: '享受基础返佣比例'
      },
      {
        icon: <ChartBar className="w-5 h-5" />,
        title: '指标大全',
        description: '所有专业指标免费使用'
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        title: '免费课程',
        description: '进阶交易课程免费学习'
      }
    ]
  },
  'platinum': {
    color: '#E5E4E2',
    bgColor: 'from-[#E5E4E2]/20 to-[#E5E4E2]/5',
    name: '铂金会员',
    icon: '👑',
    privileges: [
      {
        icon: <Percent className="w-5 h-5" />,
        title: '返佣提升',
        description: '基础返佣比例 +3%'
      },
      {
        icon: <ChartBar className="w-5 h-5" />,
        title: '指标大全',
        description: '所有专业指标终身使用'
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        title: '免费课程',
        description: '高级策略课程免费学习'
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: '内部讨论组',
        description: '加入专业交易讨论社群'
      }
    ]
  },
  'diamond': {
    color: '#B9F2FF',
    bgColor: 'from-[#B9F2FF]/20 to-[#B9F2FF]/5',
    name: '钻石会员',
    icon: '💎',
    privileges: [
      {
        icon: <Percent className="w-5 h-5" />,
        title: '返佣提升',
        description: '基础返佣比例 +5%'
      },
      {
        icon: <ChartBar className="w-5 h-5" />,
        title: '指标大全',
        description: '所有专业指标终身使用'
      },
      {
        icon: <GraduationCap className="w-5 h-5" />,
        title: '免费课程',
        description: '专家策略课程免费学习'
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: '内部讨论组',
        description: '加入专家交流圈子'
      }
    ]
  }
};

export default function Profile() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPrivilegesModal, setShowPrivilegesModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  
  // 使用 useMemo 缓存用户数据
  const userData = useMemo(() => ({
    name: "张三",
    email: "zhangsan@example.com",
    level: "gold" as MemberLevel,
    totalCommission: 12580.50,
    monthlyCommission: 2360.80,
    boundExchanges: [
      { icon: "/exchanges/binance.svg", name: "Binance", rate: 0.05 },
      { icon: "/exchanges/huobi.svg", name: "Huobi", rate: 0.03 },
      { icon: "/exchanges/okex.svg", name: "OKEx", rate: 0.02 },
    ]
  }), []);

  // 使用 useMemo 缓存等级进度
  const levelProgress = useMemo(() => ({
    current: 780,
    target: 1000,
    percentage: 78
  }), []);

  // 使用 useMemo 缓存等级信息
  const { currentLevel, nextLevel } = useMemo(() => {
    const levels: MemberLevel[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
    const currentLevelIndex = levels.indexOf(userData.level);
    return {
      currentLevel: MEMBER_LEVELS[userData.level],
      nextLevel: currentLevelIndex < levels.length - 1 ? MEMBER_LEVELS[levels[currentLevelIndex + 1]] : null
    };
  }, [userData.level]);

  // 路由保护
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // 如果正在加载或未登录，显示加载状态
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果未登录，返回 null 防止闪烁
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="pt-[60px] max-w-[1200px] mx-auto px-4">
        {/* 用户信息卡片 */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-start">
            <div className="flex items-center gap-6">
              {/* 头像 */}
              <div className="relative w-24 h-24">
                <Image
                  src={selectedAvatar.src}
                  alt={selectedAvatar.alt}
                  fill
                  className="object-cover rounded-full"
                  priority={true}
                />
                <div 
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#4285F4] rounded-full flex items-center justify-center cursor-pointer"
                >
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* 用户信息 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium select-all hover:text-gray-800 transition-colors">
                      {userData.email}
                    </span>
                  </div>
                  <div 
                    onClick={() => setShowPrivilegesModal(true)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentLevel.bgColor} border border-${currentLevel.color}/20 cursor-pointer hover:shadow-md transition-all group`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{currentLevel.icon}</span>
                    <span style={{ color: currentLevel.color }} className="font-medium">
                      {currentLevel.name}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" style={{ color: currentLevel.color }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 等级进度 */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: currentLevel.color }} />
                <span className="text-sm text-gray-600">
                  距离升级还需 <span className="font-medium" style={{ color: currentLevel.color }}>{levelProgress.target - levelProgress.current}</span> 积分
                  {nextLevel && (
                    <span className="ml-1 text-gray-400">
                      升级到 <span className="text-lg" style={{ color: nextLevel.color }}>{nextLevel.icon}</span>
                    </span>
                  )}
                </span>
              </div>
              <span className="text-sm" style={{ color: currentLevel.color }}>
                {levelProgress.current}/{levelProgress.target}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 relative"
                style={{ 
                  width: `${levelProgress.percentage}%`,
                  backgroundColor: currentLevel.color,
                  boxShadow: `0 0 10px ${currentLevel.color}40`
                }}
              >
                <div 
                  className="absolute top-0 right-0 h-full w-[2px] bg-white animate-pulse"
                  style={{ boxShadow: `0 0 5px ${currentLevel.color}` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 返佣统计 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="总返佣金额"
            value={userData.totalCommission}
            icon={<Wallet className="w-6 h-6 text-[#4285F4]" />}
          />
          <StatCard 
            title="本月累计返佣"
            value={userData.monthlyCommission}
            icon={<svg className="w-6 h-6 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>}
          />
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">已绑定交易所</h2>
              <svg className="w-6 h-6 text-[#4285F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <ExchangeList exchanges={userData.boundExchanges} />
          </div>
        </div>

        {/* 动态加载模态框 */}
        {showAvatarModal && (
          <AvatarModal
            avatars={PRESET_AVATARS}
            selectedAvatar={selectedAvatar}
            onSelect={(avatar) => {
              setSelectedAvatar(avatar);
              setShowAvatarModal(false);
            }}
            onClose={() => setShowAvatarModal(false)}
          />
        )}

        {showPrivilegesModal && (
          <PrivilegesModal
            userData={userData}
            memberLevels={MEMBER_LEVELS}
            onClose={() => setShowPrivilegesModal(false)}
          />
        )}
      </main>
    </div>
  );
} 
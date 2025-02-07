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
  defaultAvatar: { src: string; alt: string };
  currentAvatar: { src: string; alt: string };
  onUpload: (file: File) => void;
  onReset: () => void;
  onClose: () => void;
}>(() => import('./components/AvatarModal'), { ssr: false });

const PrivilegesModal = dynamic<{
  userData: { level: MemberLevel };
  memberLevels: Record<MemberLevel, LevelConfig>;
  onClose: () => void;
}>(() => import('./components/PrivilegesModal'), { ssr: false });

// 动态导入图表组件，禁用SSR
const CommissionPieChart = dynamic<{
  data: Array<{ exchange: string; commission: number; }>;
}>(() => import('./components/CommissionPieChart'), { ssr: false });

const CommissionTrendChart = dynamic<{
  data: Array<{
    date: string;
    bybit: number;
    okx: number;
    binance: number;
    total: number;
  }>;
  exchangeFilter: string;
}>(() => import('./components/CommissionTrendChart'), { ssr: false });

// 预设头像
const DEFAULT_AVATAR = {
  src: "/avatars/default-avatar.svg",
  alt: "默认头像"
};

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
    name: string;
    uid: string;
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
      <span className="text-3xl font-bold font-mono">${value.toLocaleString()}</span>
      <span className="text-gray-500 mb-1 font-mono">{suffix}</span>
    </div>
  </div>
));

// 优化的交易所列表组件
const ExchangeList = memo(({ exchanges }: ExchangeListProps) => {
  const [confirmingUnbind, setConfirmingUnbind] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="space-y-2">
      {/* 表头 */}
      <div className="flex items-center text-sm text-gray-500 h-14 px-6">
        <div className="flex-1 text-center">交易所</div>
        <div className="flex-1 text-center">UID</div>
        <div className="flex-1 text-center">返佣比例</div>
        <div className="flex-1 text-center">操作</div>
      </div>
      
      {/* 交易所列表 */}
      <div className="divide-y divide-gray-100">
        {exchanges.map((exchange, index) => (
          <div key={index} className="flex items-center h-14 px-6 hover:bg-gray-50">
            <div className="flex-1 text-center font-mono text-gray-600">{exchange.name}</div>
            <div className="flex-1 text-center font-mono text-gray-600">{exchange.uid}</div>
            <div className="flex-1 text-center font-mono text-[#4285F4]">{(exchange.rate * 100).toFixed(1)}%</div>
            <div className="flex-1 text-center">
              {confirmingUnbind === exchange.uid ? (
                <div className="flex items-center justify-center gap-2">
                  <button 
                    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
                    onClick={() => {
                      // 处理解绑逻辑
                      console.log('解绑交易所:', exchange.name);
                      setConfirmingUnbind(null);
                    }}
                  >
                    确认解绑
                  </button>
                  <button 
                    className="px-3 py-1 text-sm text-gray-500 hover:text-gray-600 rounded transition-colors"
                    onClick={() => setConfirmingUnbind(null)}
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button 
                  className="px-3 py-1 text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-500 rounded transition-all"
                  onClick={() => setConfirmingUnbind(exchange.uid)}
                  title="解绑后将无法获得该交易所的返佣，请谨慎操作"
                >
                  解绑
                </button>
              )}
            </div>
          </div>
        ))}
        {exchanges.length === 0 && (
          <div className="text-gray-500 text-center py-6">
            暂未绑定交易所
          </div>
        )}

        {/* 添加绑定交易所按钮 */}
        <div className="flex items-center justify-center h-14 px-6 bg-gray-50">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#4285F4] hover:text-[#2b5797] border border-[#4285F4] hover:border-[#2b5797] rounded transition-colors"
            onClick={() => router.push('/affiliate')}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>添加绑定交易所</span>
          </button>
        </div>
      </div>
    </div>
  );
});

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
  const [avatar, setAvatar] = useState<{ src: string; alt: string }>(DEFAULT_AVATAR);
  
  // 使用 useMemo 缓存用户数据
  const userData = useMemo(() => ({
    name: "张三",
    email: "zhangsan@example.com",
    level: "gold" as MemberLevel,
    totalCommission: 12580.50,
    monthlyCommission: 2360.80,
    boundExchanges: [
      { name: "BINANCE", uid: "78901234", rate: 0.05 },
      { name: "BITGET", uid: "56789012", rate: 0.03 },
      { name: "OKX", uid: "34567890", rate: 0.02 }
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
      
      <main className="max-w-[1200px] mx-auto px-4">
        <div className="h-[32px]"></div>
        
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* 用户基本信息 */}
          <div className="flex items-start gap-6">
            {/* 头像部分 */}
            <div className="relative w-24 h-24">
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                className="object-cover rounded-[20%] border-4 border-gray-50"
                priority={true}
              />
              <div 
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-[#4285F4] rounded-[20%] flex items-center justify-center cursor-pointer hover:bg-[#2b5797] transition-colors shadow-md"
              >
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* 用户信息 */}
            <div className="flex flex-col gap-6">
              {/* 会员等级按钮和用户名 */}
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <div 
                    onClick={() => setShowPrivilegesModal(true)}
                    className={`flex items-center justify-center w-10 h-10 rounded-[20%] bg-gradient-to-r ${currentLevel.bgColor} border-2 border-${currentLevel.color} cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group`}
                    title={currentLevel.name}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{currentLevel.icon}</span>
                  </div>
                  {/* 点击提示标识 */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4285F4] rounded-[20%] flex items-center justify-center animate-bounce">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
              </div>
              {/* 联系信息 */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium font-mono text-gray-600">
                      {userData.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <button className="px-4 py-2 bg-[#4285F4] hover:bg-[#2b5797] transition-colors rounded-lg text-white">
                    <span className="text-sm font-medium font-mono">绑定 Discord 账号</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 等级进度 - 底部 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-5 h-5" style={{ color: currentLevel.color }} />
              <span className="text-sm text-gray-600">
                距离升级还需 <span className="font-medium font-mono" style={{ color: currentLevel.color }}>{levelProgress.target - levelProgress.current}</span> 积分
                {nextLevel && (
                  <span className="ml-2 text-gray-400">
                    升级到 <span className="text-lg" style={{ color: nextLevel.color }}>{nextLevel.icon}</span>
                  </span>
                )}
              </span>
              <span className="ml-auto text-sm font-medium font-mono" style={{ color: currentLevel.color }}>
                {levelProgress.current}/{levelProgress.target}
              </span>
            </div>
            <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${levelProgress.percentage}%`,
                  backgroundColor: currentLevel.color,
                  boxShadow: `0 2px 4px ${currentLevel.color}40`
                }}
              />
            </div>
          </div>
        </div>

        {/* 返佣统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">总返佣金额</h2>
              <div className="w-7 h-7 text-[#4285F4] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">${userData.totalCommission.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 mb-1">USDT</span>
                </div>
              </div>
              <div className="w-[280px]">
                <CommissionPieChart 
                  data={[
                    { exchange: 'BINANCE', commission: 5832.50 },
                    { exchange: 'BITGET', commission: 3820.80 },
                    { exchange: 'OKX', commission: 2927.20 }
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">本月预计返佣金额</h2>
              <div className="w-7 h-7 text-[#4285F4] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">${userData.monthlyCommission.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 mb-1">USDT</span>
                </div>
              </div>
              <div className="w-[280px]">
                <CommissionPieChart 
                  data={[
                    { exchange: 'BINANCE', commission: 1180.40 },
                    { exchange: 'BITGET', commission: 720.30 },
                    { exchange: 'OKX', commission: 460.10 }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 返佣趋势和已绑定交易所 */}
        <div className="space-y-6 mt-6 mb-8">
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">返佣趋势</h2>
              <div className="w-6 h-6 text-[#4285F4] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <CommissionTrendChart 
              data={[
                { date: '2024/1/7', bybit: 45.2, okx: 32.8, binance: 58.5, total: 136.5 },
                { date: '2024/1/22', bybit: 42.8, okx: 35.2, binance: 52.3, total: 130.3 },
                { date: '2024/2/5', bybit: 48.6, okx: 30.1, binance: 55.8, total: 134.5 },
                { date: '2024/2/19', bybit: 38.2, okx: 28.9, binance: 45.6, total: 112.7 },
                { date: '2024/3/2', bybit: 52.4, okx: 42.3, binance: 63.2, total: 157.9 },
                { date: '2024/3/16', bybit: 35.6, okx: 25.8, binance: 42.1, total: 103.5 },
                { date: '2024/4/7', bybit: 41.2, okx: 31.5, binance: 48.9, total: 121.6 },
                { date: '2024/4/21', bybit: 43.8, okx: 33.2, binance: 51.4, total: 128.4 },
                { date: '2024/5/2', bybit: 46.5, okx: 36.8, binance: 54.2, total: 137.5 },
                { date: '2024/5/16', bybit: 39.8, okx: 29.5, binance: 47.3, total: 116.6 }
              ]}
              exchangeFilter="all"
            />
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">已绑定交易所</h2>
              <div className="w-6 h-6 text-[#4285F4] cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <ExchangeList exchanges={userData.boundExchanges} />
          </div>
        </div>

        {/* 动态加载模态框 */}
        {showAvatarModal && (
          <AvatarModal
            defaultAvatar={DEFAULT_AVATAR}
            currentAvatar={avatar}
            onUpload={async (file) => {
              // 1. 检查文件类型
              if (!file.type.startsWith('image/')) {
                alert('请上传图片文件');
                return;
              }
              
              // 2. 检查文件大小（例如限制为2MB）
              if (file.size > 2 * 1024 * 1024) {
                alert('图片大小不能超过2MB');
                return;
              }
              
              // 3. 创建一个FormData对象
              const formData = new FormData();
              formData.append('avatar', file);
              
              try {
                // 4. 发送到服务器
                const response = await fetch('/api/upload-avatar', {
                  method: 'POST',
                  body: formData
                });
                
                if (!response.ok) throw new Error('上传失败');
                
                const data = await response.json();
                
                // 5. 更新头像
                setAvatar({
                  src: data.url,
                  alt: '自定义头像'
                });
                setShowAvatarModal(false);
              } catch (error) {
                alert('上传失败，请重试');
                console.error('Avatar upload error:', error);
              }
            }}
            onReset={() => {
              setAvatar(DEFAULT_AVATAR);
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
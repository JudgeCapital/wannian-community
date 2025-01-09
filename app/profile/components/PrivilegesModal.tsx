import { Percent, ChartBar, GraduationCap, Users } from 'lucide-react';

type MemberLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface Privilege {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface LevelConfig {
  color: string;
  bgColor: string;
  name: string;
  icon: string;
  privileges: Privilege[];
}

interface PrivilegesModalProps {
  userData: {
    level: string;
  };
  memberLevels: Record<MemberLevel, LevelConfig>;
  onClose: () => void;
}

export default function PrivilegesModal({ userData, memberLevels, onClose }: PrivilegesModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[32px] p-6 w-[90%] max-w-[580px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">会员特权</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(memberLevels).map(([key, level], index) => (
            <div 
              key={key}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                key === userData.level 
                  ? `bg-gradient-to-r ${level.bgColor} border-2 scale-105 shadow-lg`
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xl ${key === userData.level ? 'animate-bounce' : ''}`}>
                  {level.icon}
                </span>
                <span className="text-base font-bold" style={{ color: level.color }}>
                  {level.name}
                </span>
                {key === userData.level && (
                  <span className="px-2 py-0.5 bg-[#4285F4] text-white text-xs rounded-full ml-2">
                    当前等级
                  </span>
                )}
                {index > 0 && (
                  <div className="ml-auto text-sm text-gray-500">
                    需要 {(index + 1) * 1000} 积分
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {level.privileges.map((privilege, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 bg-white p-3 rounded-2xl transition-all duration-300 ${
                      key === userData.level ? 'hover:shadow-md hover:-translate-y-1' : ''
                    }`}
                  >
                    <div className="mt-1" style={{ color: level.color }}>
                      {privilege.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{privilege.title}</div>
                      <div className="text-xs text-gray-500">{privilege.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
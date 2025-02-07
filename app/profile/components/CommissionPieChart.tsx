'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CommissionPieChartProps } from '../types';

export interface CommissionData {
  exchange: string;
  commission: number;
}

// 交易所颜色映射
const EXCHANGE_COLORS: { [key: string]: string } = {
  'BINANCE': '#FFD700', // 黄色
  'OKX': '#9CA3AF',    // 灰色
  'BITGET': '#81D8D0'  // 蒂芙尼蓝
};

// 自定义提示组件
const CustomTooltip = ({ active, payload, tooltipPosition }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  const percentage = ((data.commission / data.total) * 100).toFixed(1);
  
  // 根据鼠标位置调整 tooltip 的位置
  const style: React.CSSProperties = {
    position: 'fixed',
    left: tooltipPosition.x + 10, // 向右偏移10px避免被鼠标遮挡
    top: tooltipPosition.y - 60,  // 向上偏移60px，确保显示在鼠标上方
    zIndex: 50,
    pointerEvents: 'none',
    transform: 'translateZ(0)', // 开启硬件加速
  };
  
  return (
    <div 
      className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-100 text-xs"
      style={style}
    >
      <div className="font-medium text-gray-900">{data.exchange}</div>
      <div className="text-gray-600 mt-1">
        <div>金额：${data.commission.toLocaleString()}</div>
        <div>占比：{percentage}%</div>
      </div>
    </div>
  );
};

const CommissionPieChart: React.FC<CommissionPieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // 计算总金额
  const total = data.reduce((sum, item) => sum + item.commission, 0);
  
  // 添加总额到每个数据项中
  const dataWithTotal = data.map(item => ({
    ...item,
    total,
    percentage: ((item.commission / total) * 100).toFixed(1)
  }));

  // 处理鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="flex items-center gap-6 w-full"
      onMouseMove={handleMouseMove}
    >
      <div className="w-[200px] h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              innerRadius={activeIndex === -1 ? 45 : 40}
              outerRadius={activeIndex === -1 ? 70 : 75}
              paddingAngle={2}
              dataKey="commission"
              nameKey="exchange"
              startAngle={-90}
              endAngle={270}
              animationBegin={0}
              animationDuration={400}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {dataWithTotal.map((entry, index) => (
                <Cell 
                  key={entry.exchange}
                  fill={EXCHANGE_COLORS[entry.exchange] || '#CBD5E1'}
                  stroke="none"
                  className="transition-all duration-300 ease-out outline-none"
                  style={{
                    opacity: activeIndex === -1 ? 1 : activeIndex === index ? 1 : 0.5,
                    filter: activeIndex === index 
                      ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15))' 
                      : 'none',
                    transform: activeIndex === index 
                      ? 'scale(1.02)' 
                      : activeIndex === -1 
                        ? 'scale(1)' 
                        : 'scale(0.98)',
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip tooltipPosition={tooltipPosition} />}
              cursor={false}
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* 图例 */}
      <div className="flex flex-col gap-3">
        {dataWithTotal.map((item, index) => (
          <div 
            key={item.exchange} 
            className={`flex items-center gap-2 transition-all duration-300 ease-out cursor-pointer ${
              activeIndex === index ? 'transform translate-x-1 text-gray-900' : 'text-gray-600 hover:text-gray-700'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <div 
              className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                activeIndex === index ? 'scale-110' : ''
              }`}
              style={{ 
                backgroundColor: EXCHANGE_COLORS[item.exchange],
                opacity: activeIndex === -1 ? 1 : activeIndex === index ? 1 : 0.5
              }}
            />
            <span className="text-sm">{item.exchange}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionPieChart; 
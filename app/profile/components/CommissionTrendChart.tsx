'use client'

import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import type { CommissionTrendChartProps } from '../types';

// 注册必要的组件和插件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

export interface CommissionTrendData {
  date: string;
  bybit: number;
  okx: number;
  binance: number;
  total: number;
}

export default function CommissionTrendChart({ data }: CommissionTrendChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const [selectedExchange, setSelectedExchange] = useState('all');

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // 准备数据
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const labels = sortedData.map(item => item.date);
    
    // 根据选择的交易所筛选数据
    const datasets = [];
    
    if (selectedExchange === 'all' || selectedExchange === 'binance') {
      datasets.push({
        type: 'bar' as const,
        label: 'BINANCE',
        data: sortedData.map(item => item.binance),
        backgroundColor: '#FFD700',
        order: 2,
        borderRadius: 4,
        barPercentage: 0.95,
        categoryPercentage: 0.7,
        stack: selectedExchange !== 'all' ? 'stack0' : undefined,
      });
    }
    
    if (selectedExchange === 'all' || selectedExchange === 'bitget') {
      datasets.push({
        type: 'bar' as const,
        label: 'BITGET',
        data: sortedData.map(item => item.bybit),
        backgroundColor: '#81D8D0',
        order: 2,
        borderRadius: 4,
        barPercentage: 0.95,
        categoryPercentage: 0.7,
        stack: selectedExchange !== 'all' ? 'stack0' : undefined,
      });
    }
    
    if (selectedExchange === 'all' || selectedExchange === 'okx') {
      datasets.push({
        type: 'bar' as const,
        label: 'OKX',
        data: sortedData.map(item => item.okx),
        backgroundColor: '#9CA3AF',
        order: 2,
        borderRadius: 4,
        barPercentage: 0.95,
        categoryPercentage: 0.7,
        stack: selectedExchange !== 'all' ? 'stack0' : undefined,
      });
    }

    // 计算总计数据
    const totalData = sortedData.map(item => {
      if (selectedExchange === 'all') {
        return item.binance + item.okx + item.bybit;
      } else if (selectedExchange === 'binance') {
        return item.binance;
      } else if (selectedExchange === 'okx') {
        return item.okx;
      } else if (selectedExchange === 'bitget') {
        return item.bybit;
      }
      return 0;
    });

    // 添加总计线
    datasets.push({
      type: 'line' as const,
      label: '总计',
      data: totalData,
      borderColor: '#FF4B4B',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      order: 1,
      pointRadius: 4,
      pointBackgroundColor: '#FF4B4B',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
    });

    const options: ChartOptions<'bar' | 'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeInOutQuart'
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1f2937',
          bodyColor: '#4b5563',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          padding: 12,
          boxPadding: 4,
          usePointStyle: true,
          titleFont: {
            size: 13,
            weight: 600
          },
          bodyFont: {
            size: 12
          },
          callbacks: {
            title: (context) => {
              const date = new Date(context[0].label);
              return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            },
            label: (context) => {
              const value = context.raw as number;
              const formattedValue = `$${value.toLocaleString()}`;
              const label = context.dataset.label;
              const color = context.dataset.backgroundColor as string || context.dataset.borderColor as string;
              
              return ` ${label}  ${formattedValue}`;
            },
            labelColor: (context) => {
              const color = context.dataset.backgroundColor as string || context.dataset.borderColor as string;
              return {
                borderColor: 'transparent',
                backgroundColor: color,
                borderWidth: 0,
                borderRadius: 4,
                width: 8,
                height: 8
              };
            },
            labelTextColor: () => '#4b5563'
          }
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.1
            },
            pinch: {
              enabled: true
            },
            mode: 'x',
          },
          limits: {
            x: {
              min: 'original',
              max: 'original',
              minRange: 7 * 24 * 60 * 60 * 1000
            }
          }
        }
      },
      layout: {
        padding: 20
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          offset: true,
          ticks: {
            font: {
              size: 12
            },
            maxRotation: 0,
            minRotation: 0,
            callback: (value) => {
              const date = new Date(sortedData[value as number].date);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            maxTicksLimit: 12
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6'
          },
          ticks: {
            font: {
              size: 12
            },
            callback: (value) => `¥${value}`
          }
        }
      }
    };

    // 创建新的图表实例
    chartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: options
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, selectedExchange]); // 添加 selectedExchange 作为依赖

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-4 pt-2 pb-4">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
            <span className="text-sm text-gray-600">BINANCE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#81D8D0]"></div>
            <span className="text-sm text-gray-600">BITGET</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9CA3AF]"></div>
            <span className="text-sm text-gray-600">OKX</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF4B4B]"></div>
            <span className="text-sm text-gray-600">总计</span>
          </div>
        </div>
        <select 
          className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 min-w-[100px] hover:border-gray-300 transition-colors"
          value={selectedExchange}
          onChange={(e) => setSelectedExchange(e.target.value)}
        >
          <option value="all">全部</option>
          <option value="binance">BINANCE</option>
          <option value="bitget">BITGET</option>
          <option value="okx">OKX</option>
        </select>
      </div>
      <div className="h-[300px] cursor-grab active:cursor-grabbing">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 px-4 text-center text-sm text-gray-500">
        提示：使用鼠标滚轮缩放时间轴，拖动图表查看不同时间段
      </div>
    </div>
  );
} 
// 饼图组件的类型
export interface CommissionData {
  exchange: string;
  commission: number;
}

export interface CommissionPieChartProps {
  data: CommissionData[];
}

// 趋势图组件的类型
export interface CommissionTrendData {
  date: string;
  bybit: number;
  okx: number;
  binance: number;
  total: number;
}

export interface CommissionTrendChartProps {
  data: CommissionTrendData[];
  exchangeFilter: string;
} 
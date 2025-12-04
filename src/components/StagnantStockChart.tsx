"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Brand, StagnantStockRow } from "@/types/sales";

interface StagnantStockChartProps {
  brand: Brand;
  channelFilter: "전체" | "FR" | "OR";
  productType: "스타일코드기준" | "컬러사이즈기준";
  thresholdPercent: number;
}

const BRAND_CODE_MAP: Record<Brand, string> = {
  "MLB": "M",
  "MLB KIDS": "I",
  "DISCOVERY": "X",
};

// 시즌 판별 함수 (당년 기준: 2025년)
const getSeasonType = (sesn: string | null | undefined): "당시즌" | "차기시즌" | "과시즌" => {
  if (!sesn) return "과시즌";
  if (sesn.startsWith("25")) return "당시즌";
  if (sesn.startsWith("26")) return "차기시즌";
  return "과시즌";
};

// 전년도 시즌 판별 함수 (전년 기준: 2024년)
const getPrevYearSeasonType = (sesn: string | null | undefined): "당시즌" | "차기시즌" | "과시즌" => {
  if (!sesn) return "과시즌";
  if (sesn.startsWith("25")) return "차기시즌"; // 2025년 시즌 = 차기시즌
  if (sesn.startsWith("24")) return "당시즌"; // 2024년 시즌 = 당시즌
  return "과시즌";
};

// 정체재고 판별 함수
const getStockStatus = (row: StagnantStockRow, thresholdPercent: number): "정체재고" | "정상재고" => {
  const ratio = row.SALE_RATIO_MID_STOCK;
  if (ratio === null || ratio === undefined) {
    return "정상재고";
  }
  const thresholdFraction = thresholdPercent / 100;
  if (thresholdFraction === 0) {
    return "정상재고";
  }
  // 판매금액 비율이 thresholdPercent 미만이면 정체재고
  return ratio < thresholdFraction ? "정체재고" : "정상재고";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// 커스텀 Tooltip 컴포넌트
interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    name: string;
    payload: any;
  }>;
  label?: string;
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload;
  if (!data) return null;

  // 년도 추출 (예: "4월" -> "25년 4월")
  const year = "25년";
  const monthLabel = label || data.month || "";

  // 총합 계산
  const 당년_총합 = data.당년_차기시즌 + data.당년_당시즌 + data.당년_과시즌 + data.당년_정체재고;
  const 전년_총합 = data.전년_차기시즌 + data.전년_당시즌 + data.전년_과시즌 + data.전년_정체재고;
  const YOY = 전년_총합 > 0 ? (당년_총합 / 전년_총합) * 100 : 0;

  // YOY 차이값 계산
  const 차기시즌_YOY_차이 = data.당년_차기시즌 - data.전년_차기시즌;
  const 과시즌_YOY_차이 = data.당년_과시즌 - data.전년_과시즌;
  const 당시즌_YOY_차이 = data.당년_당시즌 - data.전년_당시즌;
  const 정체재고_YOY_차이 = data.당년_정체재고 - data.전년_정체재고;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg min-w-[280px]">
      {/* 헤더 */}
      <div className="font-bold text-gray-800 mb-4 text-base">
        {year} {monthLabel}
      </div>

      {/* 상단 요약 */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">당년 재고택금액</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatCurrency(당년_총합)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">전년 재고택금액</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatCurrency(전년_총합)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">YOY</span>
          <span className={`text-sm font-semibold ${YOY < 100 ? 'text-green-600' : 'text-red-600'}`}>
            {YOY.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* 시즌별 상세 */}
      <div className="border-t border-gray-200 pt-3 space-y-3">
        {/* 차기시즌 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium text-gray-700">차기시즌</span>
          </div>
          <div className="ml-5 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">당년</span>
              <span className="text-gray-900">{formatCurrency(data.당년_차기시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전년</span>
              <span className="text-gray-900">{formatCurrency(data.전년_차기시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YOY</span>
              <span className={차기시즌_YOY_차이 < 0 ? 'text-green-600' : 'text-red-600'}>
                {차기시즌_YOY_차이 >= 0 ? '+' : ''}{formatCurrency(차기시즌_YOY_차이)}
              </span>
            </div>
          </div>
        </div>

        {/* 과시즌 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-sm font-medium text-gray-700">과시즌</span>
          </div>
          <div className="ml-5 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">당년</span>
              <span className="text-gray-900">{formatCurrency(data.당년_과시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전년</span>
              <span className="text-gray-900">{formatCurrency(data.전년_과시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YOY</span>
              <span className={과시즌_YOY_차이 < 0 ? 'text-green-600' : 'text-red-600'}>
                {과시즌_YOY_차이 >= 0 ? '+' : ''}{formatCurrency(과시즌_YOY_차이)}
              </span>
            </div>
          </div>
        </div>

        {/* 당시즌 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-gray-700">당시즌</span>
          </div>
          <div className="ml-5 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">당년</span>
              <span className="text-gray-900">{formatCurrency(data.당년_당시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전년</span>
              <span className="text-gray-900">{formatCurrency(data.전년_당시즌)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YOY</span>
              <span className={당시즌_YOY_차이 < 0 ? 'text-green-600' : 'text-red-600'}>
                {당시즌_YOY_차이 >= 0 ? '+' : ''}{formatCurrency(당시즌_YOY_차이)}
              </span>
            </div>
          </div>
        </div>

        {/* 정체재고 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium text-gray-700">정체재고</span>
          </div>
          <div className="ml-5 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">당년</span>
              <span className="text-gray-900">{formatCurrency(data.당년_정체재고)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전년</span>
              <span className="text-gray-900">{formatCurrency(data.전년_정체재고)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YOY</span>
              <span className={정체재고_YOY_차이 < 0 ? 'text-green-600' : 'text-red-600'}>
                {정체재고_YOY_차이 >= 0 ? '+' : ''}{formatCurrency(정체재고_YOY_차이)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StagnantStockChart({ brand, channelFilter, productType, thresholdPercent }: StagnantStockChartProps) {
  const [chartData, setChartData] = useState<Record<string, StagnantStockRow[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 차트용 월별 데이터 수집 (2023-11 ~ 2025-10)
  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const months: string[] = [];
        // 2023년 11월 ~ 12월 (전년)
        for (let month = 11; month <= 12; month++) {
          months.push(`2023${month.toString().padStart(2, '0')}`);
        }
        // 2024년 1월 ~ 12월
        for (let month = 1; month <= 12; month++) {
          months.push(`2024${month.toString().padStart(2, '0')}`);
        }
        // 2025년 1월 ~ 10월
        for (let month = 1; month <= 10; month++) {
          months.push(`2025${month.toString().padStart(2, '0')}`);
        }

        const channelParam = channelFilter === "전체" ? "ALL" : channelFilter;
        const productTypeParam = productType === "컬러사이즈기준" ? "scs" : "cd";
        
        const promises = months.map(async (month) => {
          try {
            const response = await fetch(
              `/api/snow/stagnant-stock?yyyymm=${month}&brdCd=${BRAND_CODE_MAP[brand]}&channel=${channelParam}&productType=${productTypeParam}`
            );
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.error || `HTTP ${response.status}`);
            }
            const result = await response.json();
            if (result.error) {
              throw new Error(result.error);
            }
            return { month, data: result.data || [] };
          } catch (err) {
            console.error(`Error fetching data for ${month}:`, err);
            return { month, data: [], error: err instanceof Error ? err.message : String(err) };
          }
        });

        const results = await Promise.all(promises);
        const chartDataMap: Record<string, StagnantStockRow[]> = {};
        const errors: string[] = [];
        
        results.forEach(({ month, data, error }) => {
          if (error) {
            errors.push(`${month}: ${error}`);
          }
          chartDataMap[month] = data;
        });
        
        setChartData(chartDataMap);
        
        if (errors.length > 0) {
          setError(`일부 데이터를 불러오는데 실패했습니다: ${errors.slice(0, 3).join(', ')}${errors.length > 3 ? '...' : ''}`);
        }
      } catch (err) {
        console.error("Chart data fetch error:", err);
        setError(err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [brand, channelFilter, productType]);

  // 차트 데이터 가공 (월별로 그룹화: 1월이면 2024년 1월과 2025년 1월 막대기 2개)
  const processedChartData = useMemo(() => {
    const chartDataArray: any[] = [];

    // 1월부터 12월까지 월별로 그룹화
    for (let monthNum = 1; monthNum <= 12; monthNum++) {
      const monthStr = monthNum.toString().padStart(2, '0');
      const 당년Month = `2025${monthStr}`;
      const 전년Month = `2024${monthStr}`;

      const 당년Data = chartData[당년Month] || [];
      const 전년Data = chartData[전년Month] || [];

      // 당년 데이터 집계
      const 당년_차기시즌 = 당년Data
        .filter(row => getSeasonType(row.SESN) === "차기시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 당년_당시즌 = 당년Data
        .filter(row => getSeasonType(row.SESN) === "당시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 당년_과시즌 = 당년Data
        .filter(row => getSeasonType(row.SESN) === "과시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 당년_정체재고 = 당년Data
        .filter(row => getStockStatus(row, thresholdPercent) === "정체재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);

      // 전년 데이터 집계 (2024년 기준)
      const 전년_차기시즌 = 전년Data
        .filter(row => getPrevYearSeasonType(row.SESN) === "차기시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 전년_당시즌 = 전년Data
        .filter(row => getPrevYearSeasonType(row.SESN) === "당시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 전년_과시즌 = 전년Data
        .filter(row => getPrevYearSeasonType(row.SESN) === "과시즌" && getStockStatus(row, thresholdPercent) === "정상재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
      const 전년_정체재고 = 전년Data
        .filter(row => getStockStatus(row, thresholdPercent) === "정체재고")
        .reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);

      const 당년_총합 = 당년_차기시즌 + 당년_당시즌 + 당년_과시즌 + 당년_정체재고;
      const 전년_총합 = 전년_차기시즌 + 전년_당시즌 + 전년_과시즌 + 전년_정체재고;
      const YOY = 전년_총합 > 0 ? (당년_총합 / 전년_총합) * 100 : 0;

      chartDataArray.push({
        month: `${monthNum}월`,
        당년_차기시즌,
        당년_당시즌,
        당년_과시즌,
        당년_정체재고,
        전년_차기시즌,
        전년_당시즌,
        전년_과시즌,
        전년_정체재고,
        YOY,
        // 퍼센트 계산
        당년_차기시즌_퍼센트: 당년_총합 > 0 ? (당년_차기시즌 / 당년_총합) * 100 : 0,
        당년_당시즌_퍼센트: 당년_총합 > 0 ? (당년_당시즌 / 당년_총합) * 100 : 0,
        당년_과시즌_퍼센트: 당년_총합 > 0 ? (당년_과시즌 / 당년_총합) * 100 : 0,
        당년_정체재고_퍼센트: 당년_총합 > 0 ? (당년_정체재고 / 당년_총합) * 100 : 0,
        전년_차기시즌_퍼센트: 전년_총합 > 0 ? (전년_차기시즌 / 전년_총합) * 100 : 0,
        전년_당시즌_퍼센트: 전년_총합 > 0 ? (전년_당시즌 / 전년_총합) * 100 : 0,
        전년_과시즌_퍼센트: 전년_총합 > 0 ? (전년_과시즌 / 전년_총합) * 100 : 0,
        전년_정체재고_퍼센트: 전년_총합 > 0 ? (전년_정체재고 / 전년_총합) * 100 : 0,
      });
    }

    return chartDataArray;
  }, [chartData, thresholdPercent]);

  if (loading) {
    return (
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">재고금액 시즌별 추이</h3>
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">데이터 로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">재고금액 시즌별 추이</h3>
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-2xl mb-2">✕</div>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (processedChartData.length === 0) {
    return null;
  }

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">재고금액 시즌별 추이</h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={processedChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap="10%"
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              label={{ 
                value: "재고금액 (M)", 
                angle: -90, 
                position: "insideLeft",
                style: { fontSize: 12, fill: "#6b7280" }
              }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: "#DC2626" }}
              axisLine={{ stroke: "#DC2626" }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              label={{ 
                value: "YOY (%)", 
                angle: 90, 
                position: "insideRight",
                style: { fontSize: 12, fill: "#DC2626" }
              }}
            />
            <Tooltip 
              content={<ChartTooltip />}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            
            {/* 전년 막대 (왼쪽) */}
            <Bar 
              yAxisId="left"
              dataKey="전년_차기시즌" 
              stackId="prev"
              fill="#C4B5FD"
              name="전년-차기시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.전년_차기시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="전년_당시즌" 
              stackId="prev"
              fill="#93C5FD"
              name="전년-당시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.전년_당시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="전년_과시즌" 
              stackId="prev"
              fill="#D1D5DB"
              name="전년-과시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.전년_과시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="전년_정체재고" 
              stackId="prev"
              fill="#FCA5A5"
              name="전년-정체재고"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.전년_정체재고_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            
            {/* 당년 막대 (오른쪽) */}
            <Bar 
              yAxisId="left"
              dataKey="당년_차기시즌" 
              stackId="curr"
              fill="#8B5CF6"
              name="당년-차기시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.당년_차기시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="당년_당시즌" 
              stackId="curr"
              fill="#3B82F6"
              name="당년-당시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.당년_당시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="당년_과시즌" 
              stackId="curr"
              fill="#6B7280"
              name="당년-과시즌"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.당년_과시즌_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="당년_정체재고" 
              stackId="curr"
              fill="#EF4444"
              name="당년-정체재고"
              label={(props: any) => {
                const { x, y, width, height, value, index } = props;
                const data = processedChartData[index];
                const percent = data?.당년_정체재고_퍼센트 || 0;
                if (!value || value === 0 || !height || height < 15 || percent < 3) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    {percent.toFixed(1)}%
                  </text>
                );
              }}
            />
            
            {/* YOY 라인 */}
            <Line 
              yAxisId="right"
              type="monotone"
              dataKey="YOY"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ fill: "#DC2626", r: 4 }}
              name="YOY"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


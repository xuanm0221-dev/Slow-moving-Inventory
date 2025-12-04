"use client";

import { useState, useEffect, useMemo } from "react";
import { Brand, StagnantStockRow, StagnantStockSummary } from "@/types/sales";

interface StagnantStockSectionProps {
  brand: Brand;
}

const BRAND_CODE_MAP: Record<Brand, string> = {
  "MLB": "M",
  "MLB KIDS": "I",
  "DISCOVERY": "X",
};

const CHANNEL_TABS = ["전체", "FR", "OR"] as const;
type ChannelFilter = typeof CHANNEL_TABS[number];

const ITEM_TABS = ["전체", "신발", "모자", "가방", "기타"] as const;
type ItemFilter = typeof ITEM_TABS[number];

const PRODUCT_TYPE_TABS = ["스타일코드기준", "컬러사이즈기준"] as const;
type ProductTypeFilter = typeof PRODUCT_TYPE_TABS[number];

const ITEM_COLORS: Record<string, string> = {
  "신발": "#3B82F6",
  "모자": "#10B981",
  "가방": "#F59E0B",
  "기타": "#8B5CF6",
};

export default function StagnantStockSection({ brand }: StagnantStockSectionProps) {
  const [data, setData] = useState<StagnantStockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yyyymm, setYyyymm] = useState("202510");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("전체");
  const [itemFilter, setItemFilter] = useState<ItemFilter>("전체");
  const [productType, setProductType] = useState<ProductTypeFilter>("스타일코드기준");
  const [showOnlyStagnant, setShowOnlyStagnant] = useState(false);
  const [thresholdPercent, setThresholdPercent] = useState<number>(0.01); // 정체재고 기준 (% 단위, 예: 0.01 = 0.01%)

  // 기준월 목록 생성 (2024.01 ~ 2025.11)
  const monthOptions = useMemo(() => {
    const months: { value: string; label: string }[] = [];
    // 2024년 1월 ~ 12월
    for (let month = 1; month <= 12; month++) {
      const monthStr = month.toString().padStart(2, '0');
      months.push({
        value: `2024${monthStr}`,
        label: `2024.${monthStr}`
      });
    }
    // 2025년 1월 ~ 11월
    for (let month = 1; month <= 11; month++) {
      const monthStr = month.toString().padStart(2, '0');
      months.push({
        value: `2025${monthStr}`,
        label: `2025.${monthStr}`
      });
    }
    return months;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const channelParam = channelFilter === "전체" ? "ALL" : channelFilter;
        const productTypeParam = productType === "컬러사이즈기준" ? "scs" : "cd";
        const response = await fetch(
          `/api/snow/stagnant-stock?yyyymm=${yyyymm}&brdCd=${BRAND_CODE_MAP[brand]}&channel=${channelParam}&productType=${productTypeParam}`
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        const result = await response.json();
        setData(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brand, yyyymm, channelFilter, productType]);

  // 중분류 필터링된 데이터
  const filteredDataByItem = useMemo(() => {
    if (itemFilter === "전체") {
      return data;
    }
    return data.filter((row) => row.ITEM_STD === itemFilter);
  }, [data, itemFilter]);

  // 현재 설정된 기준에 따른 정체/정상 상태 계산
  const thresholdFraction = thresholdPercent / 100; // 0.01% → 0.0001

  const getStockStatus = (row: StagnantStockRow): "정체재고" | "정상재고" => {
    const ratio = row.SALE_RATIO_MID_STOCK;
    if (ratio === null || ratio === undefined) {
      return "정상재고";
    }
    if (thresholdFraction === 0) {
      return "정상재고";
    }
    return ratio < thresholdFraction ? "정체재고" : "정상재고";
  };

  // 집계 데이터 계산
  const summaryData = useMemo(() => {
    const summary: Record<string, StagnantStockSummary> = {};

    filteredDataByItem.forEach((row) => {
      const status = getStockStatus(row);
      const key = `${row.CHANNEL}-${row.ITEM_STD}-${status}`;
      if (!summary[key]) {
        summary[key] = {
          channel: row.CHANNEL,
          itemStd: row.ITEM_STD,
          stockStatus: status,
          totalStockAmt: 0,
          productCount: 0,
          totalSaleAmt: 0,
        };
      }
      summary[key].totalStockAmt += row.END_STOCK_TAG_AMT || 0;
      summary[key].productCount += 1;
      summary[key].totalSaleAmt += row.SALE_AMT || 0;
    });

    return Object.values(summary);
  }, [filteredDataByItem, thresholdPercent]);

  // 필터링된 품번 리스트
  const filteredProductList = useMemo(() => {
    let filtered = filteredDataByItem;
    if (showOnlyStagnant) {
      filtered = filtered.filter((row) => getStockStatus(row) === "정체재고");
    }
    return filtered.sort((a, b) => {
      // 중분류 → 정체재고 우선 → 재고금액 내림차순
      if (a.ITEM_STD !== b.ITEM_STD) {
        const order = ["신발", "모자", "가방", "기타"];
        return order.indexOf(a.ITEM_STD) - order.indexOf(b.ITEM_STD);
      }
      const statusA = getStockStatus(a);
      const statusB = getStockStatus(b);
      if (statusA !== statusB) {
        return statusA === "정체재고" ? -1 : 1;
      }
      return (b.END_STOCK_TAG_AMT || 0) - (a.END_STOCK_TAG_AMT || 0);
    });
  }, [filteredDataByItem, showOnlyStagnant, thresholdPercent]);

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

  // 정체재고와 정상재고로 분리
  const stagnantProducts = useMemo(() => {
    return filteredProductList.filter(row => getStockStatus(row) === "정체재고");
  }, [filteredProductList, thresholdPercent]);

  const normalProducts = useMemo(() => {
    return filteredProductList.filter(row => getStockStatus(row) === "정상재고");
  }, [filteredProductList, thresholdPercent]);

  // 정상재고를 시즌별로 분리
  const normalProductsBySeason = useMemo(() => {
    const 당시즌 = normalProducts.filter(row => getSeasonType(row.SESN) === "당시즌");
    const 차기시즌 = normalProducts.filter(row => getSeasonType(row.SESN) === "차기시즌");
    const 과시즌 = normalProducts.filter(row => getSeasonType(row.SESN) === "과시즌");
    return { 당시즌, 차기시즌, 과시즌 };
  }, [normalProducts]);

  // 당월일수 계산 함수
  const getDaysInMonth = (yyyymm: string): number => {
    const year = parseInt(yyyymm.substring(0, 4));
    const month = parseInt(yyyymm.substring(4, 6));
    return new Date(year, month, 0).getDate();
  };

  // 재고주수 계산 함수: 재고금액 ÷ (매출금액 ÷ 당월일수 x 7)
  const calculateStockWeeks = (stockAmt: number, saleAmt: number, yyyymm: string): number | null => {
    if (!stockAmt || !saleAmt || saleAmt === 0) {
      return null;
    }
    const daysInMonth = getDaysInMonth(yyyymm);
    const weeklySale = (saleAmt / daysInMonth) * 7;
    if (weeklySale === 0) {
      return null;
    }
    return stockAmt / weeklySale;
  };

  // 각 테이블의 총액 계산
  const 당시즌Total = useMemo(() => {
    const data = normalProductsBySeason.당시즌;
    if (data.length === 0) return null;
    
    const totalStockAmt = data.reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
    const totalSaleAmt = data.reduce((sum, row) => sum + (row.SALE_AMT || 0), 0);
    const totalStockQty = data.reduce((sum, row) => sum + (row.END_STOCK_QTY || 0), 0);
    const uniqueProducts = new Set(data.map(row => row.PRDT_CD)).size;
    const uniqueSeasons = new Set(data.map(row => row.SESN).filter(s => s)).size;
    const channels = Array.from(new Set(data.map(row => row.CHANNEL))).join("/");
    
    const stockWeeks = calculateStockWeeks(totalStockAmt, totalSaleAmt, yyyymm);
    const totalRatio = data.reduce((sum, row) => sum + (row.SALE_RATIO_MID_STOCK || 0), 0);
    
    return {
      totalStockAmt,
      totalSaleAmt,
      totalStockQty,
      uniqueProducts,
      uniqueSeasons,
      channels,
      stockWeeks,
      totalRatio,
    };
  }, [normalProductsBySeason.당시즌, yyyymm]);

  const 차기시즌Total = useMemo(() => {
    const data = normalProductsBySeason.차기시즌;
    if (data.length === 0) return null;
    
    const totalStockAmt = data.reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
    const totalSaleAmt = data.reduce((sum, row) => sum + (row.SALE_AMT || 0), 0);
    const totalStockQty = data.reduce((sum, row) => sum + (row.END_STOCK_QTY || 0), 0);
    const uniqueProducts = new Set(data.map(row => row.PRDT_CD)).size;
    const uniqueSeasons = new Set(data.map(row => row.SESN).filter(s => s)).size;
    const channels = Array.from(new Set(data.map(row => row.CHANNEL))).join("/");
    
    const stockWeeks = calculateStockWeeks(totalStockAmt, totalSaleAmt, yyyymm);
    const totalRatio = data.reduce((sum, row) => sum + (row.SALE_RATIO_MID_STOCK || 0), 0);
    
    return {
      totalStockAmt,
      totalSaleAmt,
      totalStockQty,
      uniqueProducts,
      uniqueSeasons,
      channels,
      stockWeeks,
      totalRatio,
    };
  }, [normalProductsBySeason.차기시즌, yyyymm]);

  const 과시즌Total = useMemo(() => {
    const data = normalProductsBySeason.과시즌;
    if (data.length === 0) return null;
    
    const totalStockAmt = data.reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
    const totalSaleAmt = data.reduce((sum, row) => sum + (row.SALE_AMT || 0), 0);
    const totalStockQty = data.reduce((sum, row) => sum + (row.END_STOCK_QTY || 0), 0);
    const uniqueProducts = new Set(data.map(row => row.PRDT_CD)).size;
    const uniqueSeasons = new Set(data.map(row => row.SESN).filter(s => s)).size;
    const channels = Array.from(new Set(data.map(row => row.CHANNEL))).join("/");
    
    const stockWeeks = calculateStockWeeks(totalStockAmt, totalSaleAmt, yyyymm);
    const totalRatio = data.reduce((sum, row) => sum + (row.SALE_RATIO_MID_STOCK || 0), 0);
    
    return {
      totalStockAmt,
      totalSaleAmt,
      totalStockQty,
      uniqueProducts,
      uniqueSeasons,
      channels,
      stockWeeks,
      totalRatio,
    };
  }, [normalProductsBySeason.과시즌, yyyymm]);

  const 정체재고Total = useMemo(() => {
    const data = stagnantProducts;
    if (data.length === 0) return null;
    
    const totalStockAmt = data.reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);
    const totalSaleAmt = data.reduce((sum, row) => sum + (row.SALE_AMT || 0), 0);
    const totalStockQty = data.reduce((sum, row) => sum + (row.END_STOCK_QTY || 0), 0);
    const uniqueProducts = new Set(data.map(row => row.PRDT_CD)).size;
    const uniqueSeasons = new Set(data.map(row => row.SESN).filter(s => s)).size;
    const channels = Array.from(new Set(data.map(row => row.CHANNEL))).join("/");
    
    const stockWeeks = calculateStockWeeks(totalStockAmt, totalSaleAmt, yyyymm);
    const totalRatio = data.reduce((sum, row) => sum + (row.SALE_RATIO_MID_STOCK || 0), 0);
    
    return {
      totalStockAmt,
      totalSaleAmt,
      totalStockQty,
      uniqueProducts,
      uniqueSeasons,
      channels,
      stockWeeks,
      totalRatio,
    };
  }, [stagnantProducts, yyyymm]);

  // 카드 데이터
  const cardData = useMemo(() => {
    const total = summaryData.reduce(
      (acc, item) => {
        if (item.stockStatus === "정체재고") {
          acc.stagnant.stockAmt += item.totalStockAmt;
          acc.stagnant.productCount += item.productCount;
          acc.stagnant.saleAmt += item.totalSaleAmt;
        } else {
          acc.normal.stockAmt += item.totalStockAmt;
          acc.normal.productCount += item.productCount;
          acc.normal.saleAmt += item.totalSaleAmt;
        }
        return acc;
      },
      {
        stagnant: { stockAmt: 0, productCount: 0, saleAmt: 0 },
        normal: { stockAmt: 0, productCount: 0, saleAmt: 0 },
      }
    );
    return total;
  }, [summaryData]);

  // 중분류별 테이블 데이터
  const tableData = useMemo(() => {
    const items = ["전체", "신발", "모자", "가방", "기타"];
    const stagnantData: Record<string, { stockAmt: number; stockQty: number; productCount: number; saleAmt: number }> = {};
    const normalData: Record<string, { stockAmt: number; stockQty: number; productCount: number; saleAmt: number }> = {};

    // 초기화
    items.forEach(item => {
      stagnantData[item] = { stockAmt: 0, stockQty: 0, productCount: 0, saleAmt: 0 };
      normalData[item] = { stockAmt: 0, stockQty: 0, productCount: 0, saleAmt: 0 };
    });

    // 전체 재고금액 계산 (전체재고대비 % 계산용)
    // 박스는 항상 전체 데이터를 표시하므로 원본 data를 사용
    const totalStockAmt = data.reduce((sum, row) => sum + (row.END_STOCK_TAG_AMT || 0), 0);

    // 중분류별로 집계 - 박스는 항상 전체 데이터를 표시하므로 원본 data를 사용
    data.forEach(row => {
      const status = getStockStatus(row);
      const itemKey = row.ITEM_STD;

      if (status === "정체재고") {
        if (items.includes(itemKey)) {
          stagnantData[itemKey].stockAmt += row.END_STOCK_TAG_AMT || 0;
          stagnantData[itemKey].stockQty += row.END_STOCK_QTY || 0;
          stagnantData[itemKey].productCount += 1;
          stagnantData[itemKey].saleAmt += row.SALE_AMT || 0;
        }
        // 전체에도 추가
        stagnantData["전체"].stockAmt += row.END_STOCK_TAG_AMT || 0;
        stagnantData["전체"].stockQty += row.END_STOCK_QTY || 0;
        stagnantData["전체"].productCount += 1;
        stagnantData["전체"].saleAmt += row.SALE_AMT || 0;
      } else {
        if (items.includes(itemKey)) {
          normalData[itemKey].stockAmt += row.END_STOCK_TAG_AMT || 0;
          normalData[itemKey].stockQty += row.END_STOCK_QTY || 0;
          normalData[itemKey].productCount += 1;
          normalData[itemKey].saleAmt += row.SALE_AMT || 0;
        }
        // 전체에도 추가
        normalData["전체"].stockAmt += row.END_STOCK_TAG_AMT || 0;
        normalData["전체"].stockQty += row.END_STOCK_QTY || 0;
        normalData["전체"].productCount += 1;
        normalData["전체"].saleAmt += row.SALE_AMT || 0;
      }
    });

    return { stagnantData, normalData, totalStockAmt };
  }, [data, thresholdPercent]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-10">
          <p className="text-red-500">❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-red-500">⚠️</span>
          정체재고 분석
        </h2>
        {/* 기준 선택 탭 */}
        <div className="flex gap-1">
          {PRODUCT_TYPE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setProductType(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                productType === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 컨트롤 */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">기준월:</label>
          <select
            value={yyyymm}
            onChange={(e) => setYyyymm(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 정체재고 판별 기준 텍스트 */}
        <div className="text-xs text-gray-600">
          <span className="font-medium">정체재고 판별 기준:</span>{" "}
          품번별 판매금액 ÷ (해당 중분류의 기말재고 합) &lt; {thresholdPercent}% 인 경우 정체재고로 분류
        </div>

        {/* 정체재고 기준 입력 (직접 입력: 예) 0.01, 0.02, 0.03 등 */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">정체재고 기준:</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={thresholdPercent}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value) || value < 0) {
                  setThresholdPercent(0);
                } else {
                  setThresholdPercent(value);
                }
              }}
              step={0.01}
              min={0}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm text-right"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">채널:</label>
          <div className="flex gap-1">
            {CHANNEL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setChannelFilter(tab)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  channelFilter === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={showOnlyStagnant}
              onChange={(e) => setShowOnlyStagnant(e.target.checked)}
              className="mr-2"
            />
            정체재고만 보기
          </label>
        </div>
      </div>

      {/* 테이블 형태의 요약 */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* 정체재고 테이블 */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-700 mb-3">정체재고</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-red-300">
                  <th className="text-left py-2 px-2 font-medium text-red-700">구분</th>
                  <th className="text-right py-2 px-2 font-medium text-red-700">재고금액 (전체재고대비 %)</th>
                  <th className="text-right py-2 px-2 font-medium text-red-700">재고수량</th>
                  <th className="text-right py-2 px-2 font-medium text-red-700">품번수</th>
                  <th className="text-right py-2 px-2 font-medium text-red-700">매출금액</th>
                </tr>
              </thead>
              <tbody>
                {["전체", "신발", "모자", "가방", "기타"].map((item) => {
                  const data = tableData.stagnantData[item];
                  const percentage = tableData.totalStockAmt > 0 
                    ? ((data.stockAmt / tableData.totalStockAmt) * 100).toFixed(2)
                    : "0.00";
                  const isSelected = itemFilter === item;
                  return (
                    <tr 
                      key={item} 
                      className={`border-b border-red-200 cursor-pointer hover:bg-red-100 transition-colors ${
                        isSelected ? "bg-red-200 font-bold" : ""
                      }`}
                      onClick={() => setItemFilter(item as ItemFilter)}
                    >
                      <td className="py-2 px-2 font-medium">{item}</td>
                      <td className="text-right py-2 px-2">
                        {formatCurrency(data.stockAmt)} <span className="text-xs text-gray-600">({percentage}%)</span>
                      </td>
                      <td className="text-right py-2 px-2">{new Intl.NumberFormat("ko-KR").format(data.stockQty)}</td>
                      <td className="text-right py-2 px-2">{data.productCount}개</td>
                      <td className="text-right py-2 px-2">{formatCurrency(data.saleAmt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 정상재고 테이블 */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-3">정상재고</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-green-300">
                  <th className="text-left py-2 px-2 font-medium text-green-700">구분</th>
                  <th className="text-right py-2 px-2 font-medium text-green-700">재고금액</th>
                  <th className="text-right py-2 px-2 font-medium text-green-700">재고수량</th>
                  <th className="text-right py-2 px-2 font-medium text-green-700">품번수</th>
                  <th className="text-right py-2 px-2 font-medium text-green-700">매출금액</th>
                </tr>
              </thead>
              <tbody>
                {["전체", "신발", "모자", "가방", "기타"].map((item) => {
                  const data = tableData.normalData[item];
                  return (
                    <tr key={item} className="border-b border-green-200">
                      <td className="py-2 px-2 font-medium">{item}</td>
                      <td className="text-right py-2 px-2">{formatCurrency(data.stockAmt)}</td>
                      <td className="text-right py-2 px-2">{new Intl.NumberFormat("ko-KR").format(data.stockQty)}</td>
                      <td className="text-right py-2 px-2">{data.productCount}개</td>
                      <td className="text-right py-2 px-2">{formatCurrency(data.saleAmt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 품번 리스트 테이블 */}
      <div className="space-y-6">
        {/* 당시즌 정상재고 테이블 */}
        {normalProductsBySeason.당시즌.length > 0 && !showOnlyStagnant && (
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              당시즌 정상재고 - {normalProductsBySeason.당시즌.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "300px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고주수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* 총액 행 */}
                  {당시즌Total && (
                    <tr className="bg-gray-100 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">(Total)</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{당시즌Total.uniqueProducts}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{당시즌Total.uniqueSeasons}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{당시즌Total.channels}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {당시즌Total.stockWeeks !== null ? `${당시즌Total.stockWeeks.toFixed(0)}주` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(당시즌Total.totalStockQty)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(당시즌Total.totalSaleAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(당시즌Total.totalStockAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {당시즌Total.totalRatio !== null
                          ? `${(당시즌Total.totalRatio * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center"></td>
                    </tr>
                  )}
                  {normalProductsBySeason.당시즌.map((row, idx) => (
                    <tr
                      key={`${row.PRDT_CD}-${row.CHANNEL}-${idx}`}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ITEM_STD}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.PRDT_CD}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.SESN || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.CHANNEL}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {(() => {
                          const stockWeeks = calculateStockWeeks(
                            row.END_STOCK_TAG_AMT || 0,
                            row.SALE_AMT || 0,
                            row.YYYYMM || yyyymm
                          );
                          return stockWeeks !== null ? `${stockWeeks.toFixed(0)}주` : "-";
                        })()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(row.END_STOCK_QTY || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.SALE_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.END_STOCK_TAG_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {row.SALE_RATIO_MID_STOCK !== null
                          ? `${(row.SALE_RATIO_MID_STOCK * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {getStockStatus(row)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 차기시즌 정상재고 테이블 */}
        {normalProductsBySeason.차기시즌.length > 0 && !showOnlyStagnant && (
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              차기시즌 정상재고 - {normalProductsBySeason.차기시즌.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "300px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고주수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* 총액 행 */}
                  {차기시즌Total && (
                    <tr className="bg-gray-100 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">(Total)</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{차기시즌Total.uniqueProducts}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{차기시즌Total.uniqueSeasons}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{차기시즌Total.channels}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {차기시즌Total.stockWeeks !== null ? `${차기시즌Total.stockWeeks.toFixed(0)}주` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(차기시즌Total.totalStockQty)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(차기시즌Total.totalSaleAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(차기시즌Total.totalStockAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {차기시즌Total.totalRatio !== null
                          ? `${(차기시즌Total.totalRatio * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center"></td>
                    </tr>
                  )}
                  {normalProductsBySeason.차기시즌.map((row, idx) => (
                    <tr
                      key={`${row.PRDT_CD}-${row.CHANNEL}-${idx}`}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ITEM_STD}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.PRDT_CD}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.SESN || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.CHANNEL}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {(() => {
                          const stockWeeks = calculateStockWeeks(
                            row.END_STOCK_TAG_AMT || 0,
                            row.SALE_AMT || 0,
                            row.YYYYMM || yyyymm
                          );
                          return stockWeeks !== null ? `${stockWeeks.toFixed(0)}주` : "-";
                        })()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(row.END_STOCK_QTY || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.SALE_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.END_STOCK_TAG_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {row.SALE_RATIO_MID_STOCK !== null
                          ? `${(row.SALE_RATIO_MID_STOCK * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {getStockStatus(row)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 과시즌 정상재고 테이블 */}
        {normalProductsBySeason.과시즌.length > 0 && !showOnlyStagnant && (
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              과시즌 정상재고 - {normalProductsBySeason.과시즌.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "300px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고주수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* 총액 행 */}
                  {과시즌Total && (
                    <tr className="bg-gray-100 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">(Total)</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{과시즌Total.uniqueProducts}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{과시즌Total.uniqueSeasons}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{과시즌Total.channels}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {과시즌Total.stockWeeks !== null ? `${과시즌Total.stockWeeks.toFixed(0)}주` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(과시즌Total.totalStockQty)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(과시즌Total.totalSaleAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(과시즌Total.totalStockAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {과시즌Total.totalRatio !== null
                          ? `${(과시즌Total.totalRatio * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center"></td>
                    </tr>
                  )}
                  {normalProductsBySeason.과시즌.map((row, idx) => (
                    <tr
                      key={`${row.PRDT_CD}-${row.CHANNEL}-${idx}`}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ITEM_STD}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.PRDT_CD}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.SESN || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.CHANNEL}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {(() => {
                          const stockWeeks = calculateStockWeeks(
                            row.END_STOCK_TAG_AMT || 0,
                            row.SALE_AMT || 0,
                            row.YYYYMM || yyyymm
                          );
                          return stockWeeks !== null ? `${stockWeeks.toFixed(0)}주` : "-";
                        })()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(row.END_STOCK_QTY || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.SALE_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.END_STOCK_TAG_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {row.SALE_RATIO_MID_STOCK !== null
                          ? `${(row.SALE_RATIO_MID_STOCK * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {getStockStatus(row)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 정체재고 테이블 */}
        {stagnantProducts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              정체재고 - {stagnantProducts.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "300px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고주수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* 총액 행 */}
                  {정체재고Total && (
                    <tr className="bg-gray-100 font-semibold">
                      <td className="px-4 py-3 text-sm text-gray-900">(Total)</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{정체재고Total.uniqueProducts}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{정체재고Total.uniqueSeasons}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{정체재고Total.channels}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {정체재고Total.stockWeeks !== null ? `${정체재고Total.stockWeeks.toFixed(0)}주` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(정체재고Total.totalStockQty)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(정체재고Total.totalSaleAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(정체재고Total.totalStockAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {정체재고Total.totalRatio !== null
                          ? `${(정체재고Total.totalRatio * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center"></td>
                    </tr>
                  )}
                  {stagnantProducts.map((row, idx) => (
                    <tr
                      key={`${row.PRDT_CD}-${row.CHANNEL}-${idx}`}
                      className="bg-red-50 hover:bg-red-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ITEM_STD}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.PRDT_CD}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.SESN || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.CHANNEL}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {(() => {
                          const stockWeeks = calculateStockWeeks(
                            row.END_STOCK_TAG_AMT || 0,
                            row.SALE_AMT || 0,
                            row.YYYYMM || yyyymm
                          );
                          return stockWeeks !== null ? `${stockWeeks.toFixed(0)}주` : "-";
                        })()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {new Intl.NumberFormat("ko-KR").format(row.END_STOCK_QTY || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.SALE_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(row.END_STOCK_TAG_AMT || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {row.SALE_RATIO_MID_STOCK !== null
                          ? `${(row.SALE_RATIO_MID_STOCK * 100).toFixed(4)}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {getStockStatus(row)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


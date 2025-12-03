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

const ITEM_COLORS: Record<string, string> = {
  "신발": "#3B82F6",
  "모자": "#10B981",
  "가방": "#F59E0B",
  "기타": "#8B5CF6",
};

export default function StagnantStockSection({ brand }: StagnantStockSectionProps) {
  // 현재 월까지의 옵션 생성 함수
  const generateMonthOptions = useMemo((): string[] => {
    const options: string[] = [];
    const startDate = new Date(2024, 0, 1); // 2024년 1월
    const endDate = new Date(); // 현재 날짜
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      options.push(`${year}${month}`);
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    
    return options.reverse(); // 최신 월이 먼저 나오도록 역순 정렬
  }, []);

  // 초기값을 가장 최근 월로 설정
  const getInitialMonth = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}${month}`;
  };

  const [data, setData] = useState<StagnantStockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yyyymm, setYyyymm] = useState(getInitialMonth());
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("전체");
  const [itemFilter, setItemFilter] = useState<ItemFilter>("전체");
  const [showOnlyStagnant, setShowOnlyStagnant] = useState(false);
  const [thresholdPercent, setThresholdPercent] = useState<number>(0.01); // 정체재고 기준 (% 단위, 예: 0.01 = 0.01%)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const channelParam = channelFilter === "전체" ? "ALL" : channelFilter;
        const response = await fetch(
          `/api/snow/stagnant-stock?yyyymm=${yyyymm}&brdCd=${BRAND_CODE_MAP[brand]}&channel=${channelParam}`
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
  }, [brand, yyyymm, channelFilter]);

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

  // 정체재고와 정상재고로 분리
  const stagnantProducts = useMemo(() => {
    return filteredProductList.filter(row => getStockStatus(row) === "정체재고");
  }, [filteredProductList]);

  const normalProducts = useMemo(() => {
    return filteredProductList.filter(row => getStockStatus(row) === "정상재고");
  }, [filteredProductList]);

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
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-red-500">⚠️</span>
        정체재고 분석
      </h2>

      {/* 필터 컨트롤 */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">기준월:</label>
          <select
            value={yyyymm}
            onChange={(e) => setYyyymm(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            {generateMonthOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
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

      {/* 카드 요약 */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-700 mb-2">정체재고</h3>
          <div className="space-y-1 text-sm">
            <div>
              재고금액: <span className="font-bold">{formatCurrency(cardData.stagnant.stockAmt)}</span>
              {(() => {
                const totalStock = cardData.stagnant.stockAmt + cardData.normal.stockAmt;
                const percentage = totalStock > 0 
                  ? ((cardData.stagnant.stockAmt / totalStock) * 100).toFixed(2)
                  : "0.00";
                return (
                  <span className="text-gray-600 ml-2">(전체재고대비 {percentage}%)</span>
                );
              })()}
            </div>
            <div>품번수: <span className="font-bold">{cardData.stagnant.productCount}개</span></div>
            <div>매출금액: <span className="font-bold">{formatCurrency(cardData.stagnant.saleAmt)}</span></div>
          </div>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-2">정상재고</h3>
          <div className="space-y-1 text-sm">
            <div>재고금액: <span className="font-bold">{formatCurrency(cardData.normal.stockAmt)}</span></div>
            <div>품번수: <span className="font-bold">{cardData.normal.productCount}개</span></div>
            <div>매출금액: <span className="font-bold">{formatCurrency(cardData.normal.saleAmt)}</span></div>
          </div>
        </div>
      </div>

      {/* 중분류 탭 (테이블 바로 위) */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">중분류:</label>
          <div className="flex gap-1">
            {ITEM_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setItemFilter(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  itemFilter === tab
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 품번 리스트 테이블 */}
      <div className="space-y-6">
        {/* 정체재고 테이블 */}
        {stagnantProducts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              정체재고 - {stagnantProducts.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "600px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                          {row.STOCK_STATUS}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 정상재고 테이블 */}
        {normalProducts.length > 0 && !showOnlyStagnant && (
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              정상재고 - {normalProducts.length}개
            </h3>
            <div className="overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: "600px" }}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">중분류</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">품번</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">시즌</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">채널</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">매출금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">재고금액</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">비율</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {normalProducts.map((row, idx) => (
                    <tr
                      key={`${row.PRDT_CD}-${row.CHANNEL}-${idx}`}
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.ITEM_STD}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.PRDT_CD}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.SESN || "-"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.CHANNEL}</td>
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
                          {row.STOCK_STATUS}
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

      {/* 설명 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
        <p className="font-medium mb-1">정체재고 판별 기준:</p>
        <p>품번별 판매금액 ÷ (해당 중분류의 기말재고 합) &lt; 0.01% (0.0001) 인 경우 정체재고로 분류</p>
      </div>
    </div>
  );
}


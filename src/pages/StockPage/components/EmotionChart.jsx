import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { getChartData } from "../../../api/StockAPI";

export default function EmotionChart({ stockName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // stockName이 변경될 때 기존 데이터 초기화
    setData([]);

    // 새로운 stockName에 대한 데이터 가져오기
    getChartData(stockName).then((newData) => setData(newData));
  }, [stockName]); // stockName이 변경될 때마다 실행

  return (
    <div className="md:col-span-1 w-full rounded-lg shadow-md bg-white dark:bg-gray-800 p-4">
      <div className="border-b pb-2">
        <h2 className="text-lg font-bold">과거 주식과 감정분석 비교</h2>
        <p className="text-sm text-gray-500">
          시간에 따른 주가와 감정 점수 변화
        </p>
      </div>
      <div className="pt-4 h-[250px]">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} height={500}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" tickFormatter={(day) => day.split("T")[0]} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="stock"
                stroke="#8884d8"
                dot={false}
                strokeWidth={3}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sentiment"
                stroke="#82ca9d"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

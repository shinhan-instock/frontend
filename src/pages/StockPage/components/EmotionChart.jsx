import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { getChartData } from "../../../api/StockAPI";
import { ResponsiveContainer } from "recharts";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`border-b pb-2 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export default function EmotionChart({ stockName }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getChartData(stockName).then((data) => setData(data));
  }, []);

  return (
    <Card className="md:col-span-1 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">과거 주식과 감정분석 비교</CardTitle>
        <CardDescription>시간에 따른 주가와 감정 점수 변화</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 h-[250px]">
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
      </CardContent>
    </Card>
  );
}

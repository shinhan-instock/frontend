import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    day: "2024-12-01",
    stock: 70000,
    sentiment: 78,
  },
  {
    day: "2024-12-02",
    stock: 70100,
    sentiment: 79,
  },
  {
    day: "2024-12-03",
    stock: 69900,
    sentiment: 75,
  },
  {
    day: "2024-12-04",
    stock: 69800,
    sentiment: 73,
  },
  {
    day: "2024-12-05",
    stock: 70100,
    sentiment: 80,
  },
  {
    day: "2024-12-06",
    stock: 71100,
    sentiment: 83,
  },
  {
    day: "2024-12-07",
    stock: 70800,
    sentiment: 83,
  },
  {
    day: "2024-12-08",
    stock: 71300,
    sentiment: 82,
  },
  {
    day: "2024-12-09",
    stock: 71200,
    sentiment: 85,
  },
  {
    day: "2024-12-10",
    stock: 70300,
    sentiment: 81,
  },
  {
    day: "2024-12-11",
    stock: 68000,
    sentiment: 79,
  },
  {
    day: "2024-12-12",
    stock: 67500,
    sentiment: 76,
  },
  {
    day: "2024-12-13",
    stock: 67600,
    sentiment: 76,
  },
  {
    day: "2024-12-14",
    stock: 64330,
    sentiment: 73,
  },
  {
    day: "2024-12-15",
    stock: 62010,
    sentiment: 70,
  },
  {
    day: "2024-12-16",
    stock: 61000,
    sentiment: 66,
  },
  {
    day: "2024-12-17",
    stock: 60900,
    sentiment: 63,
  },
  {
    day: "2024-12-18",
    stock: 58800,
    sentiment: 50,
  },
  {
    day: "2024-12-19",
    stock: 59900,
    sentiment: 53,
  },
  {
    day: "2024-12-20",
    stock: 60000,
    sentiment: 0,
  },
  {
    day: "2024-12-21",
    stock: 55000,
    sentiment: 55,
  },
  {
    day: "2024-12-22",
    stock: 57000,
    sentiment: 54,
  },
  {
    day: "2024-12-23",
    stock: 57300,
    sentiment: 55,
  },
  {
    day: "2024-12-24",
    stock: 58800,
    sentiment: 57,
  },
  {
    day: "2024-12-25",
    stock: 58400,
    sentiment: 52,
  },
  {
    day: "2024-12-26",
    stock: 58800,
    sentiment: 51,
  },
  {
    day: "2024-12-27",
    stock: 55000,
    sentiment: 49,
  },
  {
    day: "2024-12-28",
    stock: 56700,
    sentiment: 58,
  },
  {
    day: "2024-12-29",
    stock: 56800,
    sentiment: 59,
  },
  {
    day: "2024-12-30",
    stock: 57900,
    sentiment: 63,
  },
  {
    day: "2024-12-31",
    stock: 60100,
    sentiment: 66,
  },
];

export default function EmotionChart() {
  return (
    <div>
      <LineChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="day" />
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
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="sentiment"
          stroke="#82ca9d"
          dot={false}
        />
      </LineChart>
    </div>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Price = {
  category: string;
  configData: {
    id: string;
    pt?: number;
  };
  value: number;
};

type PriceChartProps = {
  prices: Price[];
};

const PriceChart: React.FC<PriceChartProps> = ({ prices }) => {
  const firstFivePrices = prices.slice(0, 5); // Get only the first 5 prices
  const data = firstFivePrices.map((item) => ({
    name: item.configData.id,
    price: item.value,
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" fill="#8884d8" />
    </BarChart>
  );
};

export default PriceChart;

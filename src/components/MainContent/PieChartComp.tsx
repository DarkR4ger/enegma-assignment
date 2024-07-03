
import { DataProp } from "./ApiTable";
import { Cell, Legend,PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import styles from './piechartcomp.module.css'
import { useEffect, useState } from "react";

type ChartDataType = {
  name: string;
  total: number
}

export default function PieChartComp({ data }: { data: DataProp[] }) {

  const [chartData, setChartData] = useState<ChartDataType[]>([])

  const processRequestData = (data: DataProp[]) => {
    const requestCounts: { [key: string]: number } = data.reduce((acc, item) => {
      const requestType = item.user_agent;
      if (!acc[requestType]) {
        acc[requestType] = 0;
      }
      acc[requestType]++;
      return acc;
    }, {});

    const chartData = Object.keys(requestCounts).map(key => ({
      name: key,
      total: requestCounts[key]
    }));

    setChartData(chartData)
  };


  useEffect(() => {
    processRequestData(data)
  }, [data])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA6C39'];

  return (
    <div className={styles.pieContainer}>
      <h2>Browsers</h2>
      <p style={{color: 'grey', marginTop: '10px'}}>Number of request by browsers</p>
      {!chartData && <div>Loading...</div>}
      {chartData &&

        <ResponsiveContainer width="100%" height="90%">
          <PieChart
            width={400}
            height={400}
          >
            <Tooltip />
            <Legend />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

        </ResponsiveContainer>
      }
    </div>
  )
}

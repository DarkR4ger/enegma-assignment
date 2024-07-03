
import { BarChart, Bar, ResponsiveContainer, XAxis, Legend, Tooltip, YAxis, CartesianGrid, Rectangle } from "recharts"
import { DataProp } from "./ApiTable"
import styles from './barcharcomp.module.css'
import { useEffect, useState } from "react";

type ChartDataType = {
  name: string;
  totalRequestReceived: number
}

export default function BarCharComp({ data }: { data: DataProp[] }) {

  const [chartData, setChartData] = useState<ChartDataType[]>([])

  const processRequestData = (data: DataProp[]) => {
    const requestCounts: { [key: string]: number } = data.reduce((acc, item) => {
      const requestType = item.request_type;
      if (!acc[requestType]) {
        acc[requestType] = 0;
      }
      acc[requestType]++;
      return acc;
    }, {});

    const chartData = Object.keys(requestCounts).map(key => ({
      name: key,
      totalRequestReceived: requestCounts[key]
    }));

    setChartData(chartData)
  };


  useEffect(() => {
    processRequestData(data)

  }, [data])


  return (
    <div className={styles.barContainer}>
      <h2>Request Type</h2>
      <p style={{color: 'grey', marginTop: '10px', marginBottom: '10px'}}>Number of request based on type</p>
      {!chartData && <div>Loading...</div>}
      {chartData &&

        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
          >
            <XAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRequestReceived" fill="#5932ea" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

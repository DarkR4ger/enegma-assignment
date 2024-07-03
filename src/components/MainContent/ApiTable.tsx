
import { SearchIcon } from 'lucide-react';
import styles from './apitable.module.css'

export type DataProp = {
  id: number;
  endpoint: string;
  request_type: string;
  timestamp: string
  request_body: string
  content_type: string;
  ip_address: string;
  os: string;
  user_agent: string;
  status: string;
}

export default function ApiTable({data}: {data: DataProp[]}){
  return (
    <div className={styles.table_container}>
      <div className={styles.top_section}>
        <h2>Request</h2>
        <div className={styles.filter_section}>
          <div className={styles.search_section}>
            <SearchIcon />
            <input type="search" placeholder='Search' />
          </div>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>EndPoint</th>
            <th>RequestType</th>
            <th>RequestTime</th>
            <th>Payload</th>
            <th>Content-type</th>
            <th>IP Address</th>
            <th>OS</th>
            <th>UserAgent</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.endpoint}</td>
                <td>{data.request_type}</td>
                <td>{data.timestamp}</td>
                <td>{data.request_body}</td>
                <td>{data.content_type}</td>
                <td>{data.ip_address}</td>
                <td>{data.os}</td>
                <td>{data.user_agent.slice(0,7)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

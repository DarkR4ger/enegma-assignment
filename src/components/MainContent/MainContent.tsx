
import { SearchIcon } from 'lucide-react'
import styles from './maincontent.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ApiTable, { DataProp } from './ApiTable'
import BarCharComp from './BarCharComp'
import PieChartComp from './PieChartComp'

export default function MainContent() {

  const [data, setData] = useState<DataProp[]>([])

  const getData = async () => {
    try {
      const res = await axios.get('/api/hits')
      const data:DataProp[] = await res.data
      setData(data)
    }
    catch(err){
      console.log(err)
    }
    
  }

  useEffect(()  => {
    getData();
  },[])


  return (
    <main className={styles.container}>
      <section className={styles.top_section}>
        <h2>Hello Evano 👋</h2>
        <div className={styles.top_section_search}>
          <SearchIcon />
          <input type='text' placeholder='Search' />
        </div>
      </section>
      <p>Please hit the <code>/api/get-items, /api/update-items, /api/put-items, /api/delete-items</code> to update the table</p>
      <section style={{display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '4rem'}}>
        <BarCharComp data={data} />
        <PieChartComp data={data} />
      </section>
      <section>
        <ApiTable data={data}/>
      </section>
    </main>
  )
}

import { BadgeHelp, BadgePercent, ChevronRight, Hexagon, LayoutDashboard, Package, SquareUser, Wallet } from "lucide-react";
import style from './sidebar.module.css'

const navLists = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard />
  },
  {
    name: 'Product',
    icon: <Package />
  },
  {
    name: 'Customers',
    icon: <SquareUser />
  },
  {
    name: 'Income',
    icon: <Wallet />
  },
  {
    name: 'Promote',
    icon: <BadgePercent />
  },
  {
    name: 'Help',
    icon: <BadgeHelp />
  },
]

export default function SideBar() {

  return (
    <div className={style.container}>
      <section className={style.nav_container}>
        <div className={style.logo}>
          <Hexagon />
          <h1>API Dashboard</h1>
        </div>
        <nav>
          {navLists.map((list, index) => {
            return (
              <div key={index} className={style.navList}>
                <div>
                  <div>{list.icon}</div>
                  <p>{list.name}</p>
                </div>
                <ChevronRight />
              </div>
            )
          })}

        </nav>
      </section>
    </div>
  )
}

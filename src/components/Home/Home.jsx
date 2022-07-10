import Posts from "./Posts/Posts"
import './Home.scss'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"


const Home = () => {
  return (
    <div className='HomeContainer'>
      <Navbar/>
      <Posts/>
      <Sidebar />
    </div>
  )
}

export default Home
import HomeCard from "../components/HomeCard";
import { HiUser } from 'react-icons/hi'
import { TbTestPipe } from 'react-icons/tb'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaBed } from 'react-icons/fa'

function Home() {
  return (
    <div className="home">
      <div className="card-list">
        <HomeCard title="Patients" count={569} percentChange={3.4} changeType='negative' color='red' icon={HiUser} />
        <HomeCard title="Tests" count={3231} percentChange={-10.5} changeType='positive' color='green' icon={TbTestPipe} />
        <HomeCard title="Staff" count={123} percentChange={5.6} changeType='positive' color='blue' icon={BsFillPeopleFill}/>
        <HomeCard title="Beds" count={1089} percentChange={0} changeType='neutral' color='orange' icon={FaBed}/>
      </div>
    </div>
  );
}

export default Home;

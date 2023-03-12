import HomeCard from '../components/HomeCard';
import { HiUser } from 'react-icons/hi';
import { TbTestPipe } from 'react-icons/tb';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBed } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../data';
import { handleAxiosError } from '../helpers';

type Stats = {
  users: number;
  patients: number;
  procedures: number;
  appointments: number;
  rooms: number;
};

function Home() {
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stats`)
      .then((response) => setStats(response.data))
      .catch((error) => handleAxiosError(error));
  }, []);

  return (
    <div className="home">
      <div className="card-list">
        <HomeCard
          title="Patients"
          count={stats?.patients}
          percentChange={3.4}
          changeType="negative"
          color="red"
          icon={HiUser}
        />
        <HomeCard
          title="Appointments"
          count={stats?.appointments}
          percentChange={-10.5}
          changeType="positive"
          color="green"
          icon={TbTestPipe}
        />
        <HomeCard
          title="Tests"
          count={stats?.procedures}
          percentChange={-10.5}
          changeType="positive"
          color="green"
          icon={TbTestPipe}
        />
        <HomeCard
          title="Staff"
          count={stats?.users}
          percentChange={5.6}
          changeType="positive"
          color="blue"
          icon={BsFillPeopleFill}
        />
        <HomeCard
          title="Rooms"
          count={stats?.rooms}
          percentChange={0}
          changeType="neutral"
          color="orange"
          icon={FaBed}
        />
      </div>
    </div>
  );
}

export default Home;

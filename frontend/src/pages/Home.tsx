import HomeCard from "../components/HomeCard";

function Home() {
  return (
    <div className="home">
      <div className="card-list">
        <HomeCard title="Patients" count={569} percentChange={3.4} changeType='negative' color='red' />
        <HomeCard title="Tests" count={3231} percentChange={-10.5} changeType='positive' color='green' />
        <HomeCard title="Staff" count={123} percentChange={5.6} changeType='positive' color='blue' />
        <HomeCard title="Beds" count={1089} percentChange={0} changeType='neutral' color='orange' />
      </div>
    </div>
  );
}

export default Home;

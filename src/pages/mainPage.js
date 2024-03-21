import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Map from '../components/Map';
import Table from '../components/Table';

function MainPage() {
  return (
    <div className="container">
          <Navbar />
          <Search />
          <Map />
          <Table />
    </div>
  );
}

export default MainPage;
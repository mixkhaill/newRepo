import { useState, useEffect } from 'react';
import {allHotels} from '../actions/hotel'
import SmallCard from '../components/SmallCard/SmallCard';
import Search from '../components/forms/Search';
import "./index.scss";
import banner from "../assets/kot.png"

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(()=> {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };

  return (
    <>
    
    <div className="banner-image">
      <img src={banner} alt="banner" />
    </div>
    <div className='col search'>
      <br/>
      <Search/>
    </div>
    <div className="container-fluid home-main">
      <br />

        <div className="col-sm">
          {hotels.map((h)=> 
          <SmallCard key={h._id} h={h}/>)}
        </div>
    </div>
    </>
  );
};

export default Home;

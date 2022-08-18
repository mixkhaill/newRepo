import {useState} from 'react'
import {toast} from 'react-toastify'
import {DatePicker, Select} from 'antd'
import {createHotel} from '../actions/hotel'
import {useSelector} from 'react-redux'
import HotelCreateForm from "../components/forms/HotelCreateForm";


const {Option} = Select;

const NewHotel = () => {

  const {auth} = useSelector((state) => ({...state}));
  const {token} = auth;

  const [values, setValues] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    price: "",
    types: "",
  })
  const [preview, setPreview] = useState(
  "https://via.placeholder.com/100x100.png?text=PREVIEW");

  const [location, setLocation] = useState("");
  
  const {title, description, image, price, types, } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData()
    hotelData.append('title', title);
    hotelData.append('description', description);
    hotelData.append('location', location);
    hotelData.append('price', price);
    image && hotelData.append('image', image);
    hotelData.append('types', types);
    
    console.log(...hotelData);
    
    try{
      let res = await createHotel(token, hotelData);
    console.log('hotel create response', res);
    toast.success('New hotel is posted');
    setTimeout(()=> {
      window.location.reload();
    }, 1000);
    }catch (err) {
      console.log(err)
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) =>{
    setPreview(URL.createObjectURL(e.target.files[0]))
    setValues({...values, image: e.target.files[0]})
  }
  const handleChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <>
    <div className="container-fluid bg-secondary p-5 text-center">
      <h2>add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
          <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
              <img src={preview} alt="prew-img"  className="img img-fluid m2"/>
             {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
             {/* {JSON.stringify(location)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;

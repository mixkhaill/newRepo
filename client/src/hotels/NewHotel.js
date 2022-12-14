import {useState} from 'react'
import {toast} from 'react-toastify'
import {DatePicker, Select} from 'antd'
import {createHotel} from '../actions/hotel'
import {useSelector} from 'react-redux'
import HotelCreateForm from "../components/forms/HotelCreateForm";
import "./index.scss";



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
    toast.success('Hotel został dodany');
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
    <div className="image-prev">
        <img 
        src={preview} 
        alt="prew-img"  
        />
        </div>
      <div className="container-fluid">
          <div className="row">
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
      </div>
    </>
  );
};

export default NewHotel;

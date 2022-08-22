import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {Select} from 'antd'
import {read, updateHotel} from '../actions/hotel'
import {useSelector} from 'react-redux'
import HotelEditForm from '../components/forms/HotelEditForm'

const {Option} = Select;

const EditHotel = ({match}) => {

    const {auth} = useSelector((state) => ({...state}));
    const {token} = auth;

    const [values, setValues] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        types: "",
      })
      const [image, setImage] = useState("")
      const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW");

    const {title, description, price, types, location,} = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hotelData = new FormData()
        hotelData.append('title', title);
        hotelData.append('description', description);
        hotelData.append('location', location);
        hotelData.append('price', price);
        image && hotelData.append('image', image);
        hotelData.append('types', types);
        
        try{
            let res = await updateHotel(token, hotelData, match.params.hotelId)
            console.log('Hotel update', res);
            toast.success(`${res.data.title} aktualizowany`);
        } catch(err) {
            console.log(err);
            toast.error(err.response.data.err);
        }
    };

    const handleImageChange = (e) =>{
        setPreview(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0]);
      }
      const handleChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value});
      }


    useEffect(()=> {
        loadSellerHotel()
    },[]);

    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);
        setValues({...values, ...res.data});
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }
    
    return(
        <>
        <div className="image-prev">
        <img 
        src={preview} 
        alt="prew-img"  
        />
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="row">
                    <HotelEditForm
                    values={values}
                    setValues={setValues}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleSubmit={handleSubmit}
                    />
                </div>
                <div className="row">
                </div>
            </div>
        </div>
        </>
    );
};

export default EditHotel
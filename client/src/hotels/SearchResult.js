import {useState, useEffect} from 'react'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import Search from '../components/forms/Search';
import {searchListings} from '../actions/hotel'
import SmallCard  from '../components/SmallCard/SmallCard'


const SearchResult = () => {

    const [searchLocation, setSearchLocation] = useState('');
    const [searchTypes, setSearchTypes,] = useState('');
    const [hotels, setHotels] = useState([]);

    useEffect(()=> {
        const {location, types} = queryString.parse(window.location.search);
        searchListings({location, types}).then(res => {
            setHotels(res.data)
        })
    }, [window.location.search])

    return(
        <>
        <div className="col"> 
        <br/>
        <Search/>
        </div>
        <div className="container">
            <div className="row">
                {
                    hotels.map(h => <SmallCard key={h._id} h={h}/> )
                }
            </div>
        </div>
        </>
    )
}

export default SearchResult;
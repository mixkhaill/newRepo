import React from 'react'
import {useState} from 'react'
import {Select} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import AlgoliaPlaces from 'algolia-places-react'
import moment from 'moment'
import {useHistory} from 'react-router-dom'

const {Option} = Select;


const config = {
    appID: process.env.REACT_APP_ALGOLIA_APP_ID,
    apikey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: "pl",
  };


const Search = () => {
    const [location, setLocation] = useState('')
    const [types, setTypes] = useState('')

    const history = useHistory();


    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&types=${types}`)
    };
    return (
        <div className='d-flex pb-4 search-main'>
            <div className="w-100 search-location">
                <AlgoliaPlaces 
                placeholder="Location"
                defaultValue={location}
                options={config}
                onChange={({suggestion}) =>setLocation(suggestion.value)}
                style={{height: "50px"}}
                />
                </div>
                <Select 
                onChange={(value) => 
                setTypes(value)}
                className="w-100 search-select" 
                size="large" 
                placeholder="Typ zwierzęcia">
                    <Option key={1}>pies</Option>
                    <Option key={2}>kot</Option>
                </Select>

                <SearchOutlined 
                onClick={handleSubmit} 
                className="btn btn-primary p-3 btn-square"
                />
        </div>
        )
};
export default Search;
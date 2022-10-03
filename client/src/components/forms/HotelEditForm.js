import AlgoliaPlaces from "algolia-places-react";
import { Select } from "antd";
import moment from "moment";

const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "pl",
};

const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, description, location, price, types, } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-primary m-2 mt-3">
          Edytuj zdjęcie
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Opis"
          className="form-control m-2"
          value={description}
        />

        {location && location.length && (
          <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Lokalizacja"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Cena"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, types: value })}
          className="w-100 m-2"
          size="large"
          placeholder="typ zwierzęcia"
          value={types}
        >
          <Option key={1}>pies</Option>
          <Option key={2}>kot</Option>
        </Select>
      </div>
      <button className="btn btn-primary m-2">Zapisz</button>
    </form>
  );
};

export default HotelEditForm;

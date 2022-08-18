import { DatePicker, Select } from "antd";
import moment from "moment";

const HotelBookingDate = ({
  values,
  setValues,
  handleSubmit,
}) => {
  const {from, to } = values;

  return (
    <form onSubmit={handleSubmit}>
        
      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(0, "days")
        }
      />
    </form>
  );
};

export default HotelBookingDate;

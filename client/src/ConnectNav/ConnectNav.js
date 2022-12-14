import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./index.scss";


const { Meta } = Card;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Unable to access settings. Try again");
    }
  };

  return (
    <div className="connect-nav">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`dołączył ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
              <Card>
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
              <Card onClick={handlePayoutSettings} className="pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
          </>
        )}
    </div>
  );
};

export default ConnectNav;

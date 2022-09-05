import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./TopNav/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./HomeModule/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard/Dashboard";
import DashboardSeller from "./DashboardSeller/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResult from "./hotels/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        <Route exact path="/search-result" component={SearchResult} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

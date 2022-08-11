import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./components/Detail/Detail";
import Dashboard from "./components/Dashboard/Dashboard";
import Search from "./components/Search/Search";
import Favorites from "./components/Favorites/Favorites";
import CreatePackage from "./components/Dashboard/CreatePackage";
import CreateActivity from "./components/Dashboard/CreateActivity";
import ModifyPackages from "./components/Dashboard/ModifyPackage";
import Checkout from "./components/Checkout/Checkout.jsx";
import Historial from "./components/Historial/Historial.jsx";
import ListPackages from "./components/Dashboard/ListPackages.jsx";
import ModifyActivity from "./components/Dashboard/ModifyActivity.jsx";
import ListActivities from "./components/Dashboard/ListActivities.jsx";
import ListUsers from "./components/Dashboard/ListUsers.jsx";
import PopUpParent from './components/PopUps/PopUpParent.jsx'
import CreateAccountModal from './components/CreateAccount Modal/CreateAccountModal.jsx'
import CheckoutParent from './components/Checkout/CheckoutForm/CheckoutParent.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListCategories from "./components/Dashboard/ListCategories.jsx";
import Privacy from "./components/Information/Privacy.jsx";
import Terms from "./components/Information/Terms.jsx";
import Faq from "./components/Information/Faq.jsx";
import Error404 from "./components/Error404/Error404.jsx";
import { useSelector } from "react-redux";
import ListOrders from "./components/Dashboard/ListOrders.jsx";
import CheckoutConfirmation from './components/Checkout/CheckoutForm/CheckoutConfirmation.jsx'
import ListDeletedPackages from "./components/Dashboard/ListDeletedPackages.jsx";
import Contact from "./components/Information/Contact.jsx";
import About from "./components/Information/About.jsx";
import CheckoutCancel from "./components/Checkout/CheckoutForm/CheckoutCancel.jsx";
// import Footer from './components/Footer/Footer.jsx';

function App() {
  const user = useSelector( (state) => state.user )
 
  return (
    <BrowserRouter>
      <Navbar />
      <PopUpParent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={ user.is_admin ? <CreatePackage /> : <Navigate to='/' /> } />
        <Route path="/dashboard/orders" element={ user.is_admin ? <ListOrders /> : <Navigate to='/' />} />
        <Route path="/dashboard/listPackages" element={ user.is_admin ? <ListPackages /> : <Navigate to='/' />} />
        <Route path="/dashboard/listDeletedPackages" element={ user.is_admin ? <ListDeletedPackages /> : <Navigate to='/' />} />
        <Route path="/dashboard/listActivities" element={ user.is_admin ? <ListActivities /> : <Navigate to='/' />} />
        <Route path="/dashboard/listCategories" element={ user.is_admin ? <ListCategories /> : <Navigate to='/' />} />
        <Route path="/dashboard/listUsers" element={ user.is_admin ? <ListUsers /> : <Navigate to='/' />} />
        <Route path="/dashboard/packages" element={ user.is_admin ? <CreatePackage /> : <Navigate to='/' />} />
        <Route path="/dashboard/activities" element={ user.is_admin ? <CreateActivity /> : <Navigate to='/' />} />
        <Route path="/dashboard/modifyPackage/:id" element={ user.is_admin ? <ModifyPackages /> : <Navigate to='/' />} />
        <Route path="/dashboard/modifyActivities/:id" element={ user.is_admin ? <ModifyActivity /> : <Navigate to='/' />} />
        {/* <Route path="/checkout" element={ Object.keys(user).length ? <CheckoutParent /> : <Navigate to='/' />} /> */}
        <Route path="/checkout" element={ <CheckoutParent /> } />
        <Route path="/checkout/confirmation" element={ <CheckoutConfirmation /> } />
        <Route path="/checkout/cancel" element={ <CheckoutCancel /> } />
        <Route path="/historial/:id" element={ Object.keys(user).length ? <Historial /> : <Navigate to='/' />} />
        <Route path='/createaccount' element={ Object.keys(user).length ? <CreateAccountModal /> : <Navigate to='/' />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <BacktoTop /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

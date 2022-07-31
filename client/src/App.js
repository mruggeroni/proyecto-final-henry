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
import PopUps from './components/PopUps/PopUps.jsx'
import CreateAccountModal from './components/CreateAccount Modal/CreateAccountModal.jsx'
import CheckoutParent from './components/Checkout/CheckoutForm/CheckoutParent.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListCategories from "./components/Dashboard/ListCategories.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PopUps />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/listPackages" element={<ListPackages />} />
        <Route path="/dashboard/listActivities" element={<ListActivities />} />
        <Route path="/dashboard/listCategories" element={<ListCategories />} />
        <Route path="/dashboard/listUsers" element={<ListUsers />} />
        <Route path="/dashboard/packages" element={<CreatePackage />} />
        <Route path="/dashboard/activities" element={<CreateActivity />} />
        <Route
          path="/dashboard/modifyPackage/:id"
          element={<ModifyPackages />}
        />
        <Route
          path="/dashboard/modifyActivities/:id"
          element={<ModifyActivity />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/checkout" element={<CheckoutParent />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/faq" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path='/createaccount' element={<CreateAccountModal />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

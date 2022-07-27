import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./components/Detail/Detail";
import Dashboard from "./components/Dashboard/Dashboard";
import Search from "./components/Search/Search";
import Favorites from "./components/Favorites/Favorites";
import CreatePackage from "./components/Dashboard/CreatePackage";
import CreateActivity from "./components/Dashboard/CreateActivity";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/packages" element={<CreatePackage />} />
        <Route path="/dashboard/activities" element={<CreateActivity />} />
        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} /> */}
        {/* <Route path="/dashboard/packages" element={isAuthenticated ? <CreatePackage /> : <Navigate to="/" />} /> */}
        {/* <Route path="/dashboard/activities" element={isAuthenticated ? <CreateActivity /> : <Navigate to="/" />} /> */}
        <Route path="/profile" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Home />} />
        <Route path="/faq" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

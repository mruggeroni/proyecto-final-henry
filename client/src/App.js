import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Navbar from './components/Navbar/Navbar';
import Detail from './components/Detail/Detail';
import Dashboard from './components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Home />} />
        <Route path="/checkout" element={<Home />} />
        <Route path="/faq" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

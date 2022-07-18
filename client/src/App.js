import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" component={Landing} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

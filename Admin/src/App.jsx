import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <div>
        <ToastContainer/>
        <Navbar />
        <hr />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List/>} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

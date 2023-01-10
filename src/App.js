// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/adminUsers" element={ <AdminPanel   /> } />
          <Route path="/edit/:user" element={ <Edit   /> } />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

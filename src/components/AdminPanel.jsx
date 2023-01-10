import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
// import { jsPDF } from "jspdf";
import PdfDownloader from "./PdfDownloader";


// http://localhost:5000/api/users
// `http://localhost:5000/api/users/:${username}`

// https://last-assignment-2-backend.onrender.com

const AdminPanel = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    // e.preventDefault();
    await axios
      .get("https://last-assignment-2-backend.onrender.com/api/users", {
        withCredentials: true,
      })
      .then(async (res) => {
        console.log(res.data);
        setData(res.data);

        console.log("fetched data");
      })
      .catch((err) => {
        // window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
        navigate("/");
        console.log(err);
      });
  };

  const deleteData = async (username) => {
    // e.preventDefault();
    await axios
      .delete(`https://last-assignment-2-backend.onrender.com/api/users/:${username}`,{
        withCredentials: true,
      })
      .then(async (res) => {
        console.log(res.data);
        setData(res.data);
        // fetchData()

        console.log("fetched data");
      })
      .catch((err) => {
        // window.alert("Invalid Credentials");
        console.log("Could not delete");
        // navigate("/");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


    // var button = document.getElementById("pdfButton");
    // const convert =()=>{
    //     var doc = new jsPDF("p", "mm", [300, 300]);
    //     var makePDF = document.querySelector("#adminPanel");
    //     // fromHTML Method
    //     doc.fromHTML(makePDF);
    //     doc.save("output.pdf");
    // }
    

  

  return (
    <div className="admin-panel" >
      {/* <button onClick={convert}>Download</button> */}
      <PdfDownloader  
          downloadFileName="detailsPdf" 
          rootElementId="adminPanel" 
      />
      <table border="1px" id="adminPanel">
        <thead>
          <tr>
            <td>S.no</td>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile no.</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
              
            const base64String = Buffer.from(item.image.data).toString('base64')

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <img
                    alt="cannot view"
                    src={`data:image/png;base64,${base64String}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>
                  <button> <Link to={`/edit/:${item.username}`} className="link-text nav-link-text">
                Edit
              </Link></button>
                  <button onClick={() => deleteData(item.username)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

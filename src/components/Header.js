import { useState } from "react";
import axios from "axios";

const Header=()=>{
  let [newUser,setNewUser]=useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: ""
  });

  let [logDetail,setLogDetail]=useState({
    email: "",
    password: ""
  })

  let saveNewUser = async() =>{
    try{
      let url = 'http://localhost:3030/api/create-user-account';
      let {data} = await axios.post(url, {...newUser});
      alert(data.msg);
      if(data.status=== true){
        window.location.assign("/");
      }
    }catch(error){
      alert("server error");
    }
  }
  let checkDetails = async() =>{
    try{
      let url = 'http://localhost:3030/api/user-Login';
      let {data} = await axios.post(url, {...logDetail});
      alert(data.msg);
      if(data.status=== true){
        //window.location.assign("/");
      }
    }catch(error){
      alert(error);
    }
  }
    return <>
    <div
      className="modal fade"
      id="modelUserLogin"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalToggleLabel2">
              Login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={logDetail.email}
                onChange={(event)=>{setLogDetail({...logDetail,email:event.target.value})}}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={logDetail.password}
                onChange={(event)=>{setLogDetail({...logDetail,password:event.target.value})}}

              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={checkDetails} >
              login
            </button>
          </div>
        </div>
      </div>
    </div>

    
    
    <div
      className="modal fade"
      id="modelUserNewAccount"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalToggleLabel2">
              Create an New Account
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter full Name"
                value={newUser.name}
                onChange={(event)=>{setNewUser({...newUser, name:event.target.value})}}

              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="mobile"
                className="form-label"
              >
                Mobile
              </label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                placeholder="Enter Mobile"
                value={newUser.mobile}
                onChange={(event)=>{setNewUser({...newUser, mobile:event.target.value})}}

              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={newUser.email}
                onChange={(event)=>{setNewUser({...newUser, email:event.target.value})}}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Address
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={newUser.address}
                onChange={(event)=>{setNewUser({...newUser, address:event.target.value})}}
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={newUser.password}
                onChange={(event)=>{setNewUser({...newUser, password:event.target.value})}}

              />
            </div>
          </div>
          <div className="modal-footer">
            <button  onClick={saveNewUser} className="btn btn-success">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
    <header className="head">
        <p className="logo">e!</p>
        <div className="btns">
        <button className="btn1 btn" data-bs-toggle="modal" data-bs-target="#modelUserLogin">Login</button>
        <button className="btn2 btn" data-bs-toggle="modal" data-bs-target="#modelUserNewAccount">Create an account</button>
        </div>
    </header>
    </>
}

export default Header;
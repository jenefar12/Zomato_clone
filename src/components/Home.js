import { useEffect, useState } from "react";
import '../css/home.css';
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const [mealType,setMealType]=useState([]);
    const [placeholderText,setPlaceholderText]=useState("set a location");
    const [locationList,setLocationList]=useState([]);
    const[restaurantList,setRestaurantList]=useState([]);
    let getMealTypes = async () => {
        try{
        let url = "http://localhost:3030/api/get-meal-type-list";
        let response = await fetch(url, {method: "GET"});
        let data = await response.json();
        setMealType(data.result);
        }catch(error){
            alert("server error")
        }
    };

    let getLocationList = async()=>{
      try{
        setPlaceholderText("Getting location list...");
        setRestaurantList([]);
        let url = "http://localhost:3030/api/get-location-list";
        let response = await fetch(url, {method: "GET"});
        let data = await response.json();
        setLocationList(data.result);
        setPlaceholderText("Here is the location list");
        }catch(error){
            setPlaceholderText("fail get location, try again");
        }
    }

    let getRestaurantListByLocationId= async(id, name, city)=>{
      try{
        let url = `http://localhost:3030/api/get-restaurant-list-by-location-id/${id}`;
        let response = await fetch(url, {method: "GET"});
        let data = await response.json();
        {if(data.result.length<=0){
          alert("No restaurant available in this location");
        }}
        setRestaurantList(data.result);
        setPlaceholderText(`${name}, ${city}`);
        setLocationList([]);
        }catch(error){
            
        }
    }
    
    const navigate=useNavigate();

    useEffect(()=>{
        getMealTypes();
    },[]);
    console.log(mealType);

    return <>
    <div
      className="modal fade"
      id="login"
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
                value=""
                onChange={()=>{}}
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
                value=""
                onChange={()=>{}}

              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" >
              login
            </button>
          </div>
        </div>
      </div>
    </div>

    
    
    <div
      className="modal fade"
      id="create-account"
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
                value="deepakkumar"
                onChange={()=>{}}

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
                value="deepakkumar"
                onChange={()=>{}}

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
                value="deepak@gmail.com"
                onChange={()=>{}}
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
                value=""
                onChange={()=>{}}
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
                value=""
                onChange={()=>{}}

              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
    <main className="container-fluid">
        <div className="row">
            <div className="bgimg col-12 bg-danger p-3  d-flex flex-column gap-1">
                <div className="pe-5 d-flex justify-content-end">
                <button className="btn text-light d-lg-block d-md-block d-sm-none d-none" data-bs-toggle='modal' data-bs-target="#login">Login</button>
                <button className="btn btn-outline-light d-lg-block d-md-block d-sm-none d-none" data-bs-toggle='modal' data-bs-target="#create-account">create an account</button>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <h1 className="logo text-danger fw-bolder d-flex justify-content-center align-items-center">e!</h1>
                    <h1 className="text-light col-lg-12 col-md-11 col-9 text-center">Find the best restaurants, cafes, and bars</h1>
                </div>
                <div className="d-lg-flex flex-lg-row justify-content-lg-center gap-lg-2 p-lg-4 d-md-flex flex-md-row justify-content-md-center gap-md-2 p-md-4 d-sm-flex flex-sm-column align-items-sm-center gap-sm-3 p-sm-4 d-flex flex-column align-items-center gap-3 p-4">
                    <div className="col-lg-2 col-md-3 col-sm-7  col-7">
                        <div className="location-list w-100">
                        
                            <input type="text" placeholder={placeholderText} onFocus={getLocationList} className="form-control w-100" readOnly />
                            <ul className="list-group w-100 z-1">
                              {locationList.map((loc)=>{
                                return (
                                  <li className="list-group-item" key={loc._id} onClick={()=>{
                                    getRestaurantListByLocationId(loc.location_id, loc.name, loc.city);
                                  }}>{loc.name}, {loc.city}</li>
                                )
                              })}
                              
                            </ul>
                        
                        </div> 
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-7 col-7 ">
                        <section className="location-list w-100">
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                          <input type="text" placeholder="Search for restaurants" className="form-control border-light" readOnly/>
                        </div>
                        <ul className="list-group w-100">
                              {restaurantList.map((res)=>{
                                return (
                                  <li className="list-group-item" key={res._id} onClick={()=>navigate(`/restaurant/${res._id}`)}>
                                    <img src={`../img/${res.image}`} alt="img" className="me-2" style={{
                                      width:"40px",
                                      height:"40px",
                                      borderRadius:"20px"
                                    }}/>
                                    {res.name}, {res.city}</li>
                                )
                              })}
                              
                            </ul>
                        </section>
                    </div>
                 </div>
            </div>
            <div className="row">
                <div className="col-lg-10 mt-lg-5 m-lg-auto col-md-11 m-md-auto mt-md-5">
                    <h2 className="fw-bolder">Quick Searches</h2>
                    <p className="text-secondary">Discover restaurants by type of meal</p>
                    <div className="row">
                        <div className="d-lg-flex justify-content-lg-between align-content-lg-center flex-lg-wrap d-md-flex flex-md-wrap justify-content-md-between col-lg-11 col-md-10">
                           {
                            mealType.map((value,index)=>{
                                return(
                                <div onClick={()=>navigate(`/search/${value.meal_type}/${value.name}`)} key={value._id} className="col-lg-3 d-lg-flex me-lg-5 mb-lg-4 d-flex mb-5 col-md-4 me-md-4">
                                    <img className="col-lg-7 col-6 col-md-11 shadow-lg" src={`./img/${value.image}`} alt="" />
                                    <div className="col-lg-9 p-lg-4 ps-lg-4 col-md-10 shadow-lg p-4">
                                    <h6 className="fw-bold">{value.name}</h6>
                                    <p className="col-lg-9 col-10  col-md-12 text-secondary">{value.content}</p>
                                    </div>
                                </div>
                                )
                            })
                           }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
}

export default Home;
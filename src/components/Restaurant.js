import { useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Restaurant =()=>{
  let {id} = useParams();
  const [rDetails,setRDetails]=useState(null);
  const [menuList,setMenuList]=useState([]);
  const [totalPrice,setTotalPrice]=useState(0);
  let getRestaurantDetail=async()=>{
    let url=`http://localhost:3030/api/get-restaurant-details-by-id/${id}`;
    let response=await fetch(url, {method:"GET"});
    let data=await response.json();
    console.log(data)
    setRDetails(data.result);
  }

  let getMenuList=async()=>{
    let url=`http://localhost:3030/api/get-menu-items-by-restaurant-id/${id}`;
    let response=await fetch(url, {method:"GET"});
    let data=await response.json();
    console.log(data)
    setMenuList(data.result);
  }

  let addQty=(index)=>{
    setTotalPrice(Number(menuList[index].price)+totalPrice);
    menuList[index].qty += 1;
    setMenuList([...menuList])
  }

  let removeQty=(index)=>{
    setTotalPrice(totalPrice-Number(menuList[index].price));
    menuList[index].qty -= 1;
    setMenuList([...menuList])
  }

  let makePayment = async() => {
    let url="http://localhost:3030/api/create-order-id";
    let {data}=await axios.post(url,{amount:totalPrice});
    let {order}=data;
    console.log(order);
    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato Clone ",
      description: "Make Payment to get orders",
      image: "https://w7.pngwing.com/pngs/176/785/png-transparent-zomato-thumbnail-review-platforms-logos-thumbnail.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        try{
        let userOrders=menuList.filter((menu)=>menu.qty > 0)
        let sendData={
          payment_id:response.razorpay_payment_id,
          order_id:response.razorpay_order_id,
          signature:response.razorpay_signature,
          order:userOrders
        }
        let url="http://localhost:3030/api/verify-payment";
        let {data}=await axios.post(url,sendData);
        console.log(data);
        if(data.status === true){
          alert("Payment done successfully");
          window.location.assign("/");
        }else{
          alert("payment failed");
        }
      }catch(error){
        console.log(error);
      }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };


  useEffect(()=>{
    getRestaurantDetail();
  },[])

    return <>
    {rDetails !== null?(
      <>
        <div
      className="modal fade"
      id="slideShow"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg " style={{height:"75vh"}}>
        <div className="modal-content">
          <div className="modal-body h-75">
            <Carousel showThumbs={false} infiniteLoop={true}>
              {rDetails.thumb.map((value, index) => {
                return (
                  <div key={index} className="w-100">
                    <img src={"/img/" + value} alt="img" />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalToggleLabel">
              Menus @ {rDetails.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body ">
            {
              menuList.map((menu,index)=>{
                return(
                  <div className="row p-2" key={menu._id}>
                  <div className="col-8">
                    <p className="mb-1 h6">{menu.name}</p>
                    <p className="mb-1">₹{menu.price}</p>
                    <p className="small text-muted">{menu.description}</p>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div className="menu-food-item">
                      <img src={`../img/${menu.image}`} alt="" />
                      {menu.qty === 0 ?(<button
                          className="btn btn-primary btn-sm add"
                          onClick={()=>addQty(index)}
                        >
                          Add
                        </button>):(<div className="order-item-count section ">
                          <span
                            className="hand"
                            onClick={()=>removeQty(index)}
                          >
                            -
                          </span>
                          <span>{menu.qty}</span>
                          <span
                            className="hand"
                            onClick={()=>addQty(index)}
                          >
                            +
                          </span>
                        </div>)}

                    </div>
                  </div>
                  <hr className=" p-0 my-2" />
                </div>

                )
              })
}


              <div className="d-flex justify-content-between">
                <h3>Total {totalPrice}</h3>
                <button
                  className="btn btn-danger"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                >
                  PROCEED
                </button>
              </div>

          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="exampleModalToggle2"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalToggleLabel2">
              name
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
                value="Nashik"
                onChange={()=>{}}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-danger"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Back
            </button>
            <button className="btn btn-success" onClick={makePayment}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <Header bgColor="bg-danger" />
    </div>
    
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="restaurant-main-image position-relative">
              <img src={"/img/"+rDetails.image} alt="" className="" />
              <button
                className="btn btn-outline-light position-absolute btn-gallery"
                data-bs-toggle="modal"
                data-bs-target="#slideShow">
                Click To Get Image Gallery</button>
            </div>
          </div>
          <div className="col-12">
            <h3 className="mt-4">{rDetails.name}</h3>
            <div className="d-flex justify-content-between">
              <ul className="list-unstyled d-flex gap-3">
                <li>Overview</li>
                <li>Contact</li>
              </ul>
              <a className="btn btn-danger align-self-start" data-bs-toggle="modal" href="#exampleModalToggle" role="button" onClick={()=>getMenuList()}>
                Menus
              </a>
            </div>
            <hr className="mt-0" />
            <div className="over-view">
              <p className="h5 mb-4">About this place</p>
              <p className="mb-0 fw-bold">Cuisine</p>
              <p></p>

                <p className="mb-0 fw-bold">Average Cost</p>
                <p>₹{rDetails.min_price} /-for two people (approx.)</p>
              </div>

              <div className="over-view">
                <p className="mb-0 fw-bold">Phone Number</p>
                <p>{rDetails.contact_number}</p>
                <p className="mb-0 fw-bold">Address</p>
                <p>{rDetails.locality}, {rDetails.city}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>):null}
  </>
}

export default Restaurant;
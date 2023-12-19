import {useNavigate, useParams } from 'react-router-dom';
import food from '../css/food.png'
import Header from './Header';
import { useEffect,useState } from 'react';
import axios from 'axios';

const Search = () => {
  let navigate=useNavigate();
  let { meal_id, meal_type_name } = useParams();
  let [filterOption,setFilterOption] = useState({
    meal_type:meal_id
  })
  let [locations, setLocations] = useState([]);
  let [restaurantList,setRestaurantList]=useState([]);
  
  let getLocationList = async () => {
    try {
      let url = `http://localhost:3030/api/get-location-list`;
      let response = await fetch(url, { method: "GET" });
      let data = await response.json();
      setLocations(data.result);
    } catch (error) {}
  };

  let getFilterData=async()=>{
    let url="http://localhost:3030/api/filter";
    let {data}= await axios.post(url,{...filterOption});
    setRestaurantList(data.result);
    console.log(data.result);
  }
  let filter=async(type,event)=>{
    let {value}=event.target;
    switch(type){
      case 'loc':
        if(value === ""){
          delete filterOption.location;
        }else{
          filterOption["location"]=value;
        }
      break;
      case 'sort':
        filterOption["sort"]=value;
        break;
      case 'cuisine':
        if(event.target.checked){

          if(filterOption['cuisine_id']!==undefined){
            let isIncluded=filterOption['cuisine_id'].includes(Number(value));
            if(isIncluded === false){
              filterOption['cuisine_id']=[...filterOption['cuisine_id'],Number(value)];
            }
          }else{
            filterOption['cuisine_id']=[Number(value)];
          }
        }else{
          let cuisine = filterOption['cuisine_id'].filter((id)=>Number(value) !== id);
          if(cuisine.length === 0){
            delete filterOption.cuisine_id;
          }else{
            filterOption['cuisine_id']=[...cuisine];
          }
        }
        console.log(filterOption['cuisine_id']);
        break;
      case 'cost':
        filterOption['cost']=Number(value);
        console.log(filterOption['cost'])
        filterOption['cost_values']=[];
        restaurantList.map((res)=>{
          filterOption['cost_values'].push(res.min_price);
        })
        console.log(filterOption['cost_values'])
        break;
      default:
        break;
    }
    setFilterOption({...filterOption});
  }
 
  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(()=>{
    getFilterData();
  },[filterOption]);

  return (
    <>
      <div>
    <main className="container-fluid">
      
        
            <section className="row bg-danger">
                <Header />
            </section>
        

        <section className="row m-2">
            <h2 className="col-11 col-md-10 col-lg-11 m-auto mb-2 fw-bolder">{meal_type_name} Places in Mumbai</h2>
            <section className="col-11 m-auto d-flex flex-lg-row flex-md-column flex-sm-column">
                <section className="col-lg-2 col-md-12 col-sm-12 shadow-lg p-4">
                    <h3 className="d-lg-block d-md-block d-sm-none">Filters</h3>
                    <h3 className="d-lg-none d-md-none d-flex justify-content-between "data-bs-toggle='collapse' href='#search'>
                        <span>Filters/sort</span>
                        <span>j</span>
                    </h3>
                    <aside id="search" className="collapse d-lg-block d-md-block">
                    <div>
                        <label htmlFor="option" className="form-check-label fs-5">Select Location</label>
                        <select name="" id="option" className="form-select" onChange={(event)=>filter('loc',event)}>
                            <option value="">select location</option>
                            {locations.map((loc)=>{
                                return(
                                    <option key={loc._id} value={loc.location_id}>{loc.name}, {loc.city}</option>
                                )
                            })}
                        </select>
                    </div>
 
                    <label htmlFor="" className="form-check-label fs-5 mt-2">Cusine</label>
                    <div className="form-check pb-1">
                        <input type="checkbox" className="form-check-input" value={1} onChange={(event)=>filter('cuisine',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">North Indian</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="checkbox" className="form-check-input" value={2} onChange={(event)=>filter('cuisine',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">South Indian</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="checkbox" className="form-check-input" value={3} onChange={(event)=>filter('cuisine',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Chinese</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="checkbox" className="form-check-input" value={4} onChange={(event)=>filter('cuisine',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Fast Food</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="checkbox" className="form-check-input" value={5} onChange={(event)=>filter('cuisine',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Street Food</label>
                    </div>

                    <label htmlFor="" className="form-check-label fs-5 mt-2">Cost For Two</label>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" value={500} onChange={(event)=>filter('cost',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Less than`500</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" value={1000} onChange={(event)=>filter('cost',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">`500 to`1000</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" />
                        <label htmlFor="" className="form-check-label text-secondary">`1000 to `1500</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" />
                        <label htmlFor="" className="form-check-label text-secondary">`1500 to `2000</label>
                    </div>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" />
                        <label htmlFor="" className="form-check-label text-secondary">`2000+</label>
                    </div>
                    <h3 className=" fs-5 mt-2">Sort</h3>
                    <div className="form-check pb-1">
                        <input type="radio" className="form-check-input" name="ans" value='1'  onChange={(event)=>filter('sort',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Price low to high</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" name="ans" value='-1' onChange={(event)=>filter('sort',event)} />
                        <label htmlFor="" className="form-check-label text-secondary">Price high to low</label>
                    </div>
                </aside>
                </section>
                <section className="col-lg-10 col-md-12 ms-lg-5 mt-md-4 mt-sm-4">
                  {restaurantList.map((restaurant)=>{
                    return(
                      <section key={restaurant._id} onClick={()=>navigate("/restaurant/"+restaurant._id)} className="mb-4 p-3 shadow-lg">
                        <section className="d-flex">
                            <img className="rounded-5" src={food} alt="food" />
                            <section className="d-flex flex-column justify-content-center ms-3">
                                <h3 className="fw-bold">{restaurant.name}</h3>
                                <p className="fw-medium m-0">{restaurant.city}</p>
                                <p className="text-secondary">{restaurant.locality}, {restaurant.city}</p>
                            </section>
                        </section>
                        <hr />
                        <section className="d-flex">
                            <section>
                                <p className="text-secondary ">CUISINES:</p>
                                <p className="text-secondary">COST FOR TWO:</p>
                            </section>
                            <section className="ps-5">
                              <p>
                                {restaurant.cuisine.map((value)=>{
                                  return value.name
                                }).join(", ")}
                                </p>
                                <p>${restaurant.min_price}</p>
                            </section>
                        </section>
                    </section>
                    )
                  })}
                    <ul className="pagination mt-4 d-flex justify-content-center">
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li onClick={()=>navigate(`/search/1/breakfast`)} className="page-item ms-3"><a className="page-link" href="">1</a></li>
                        <li onClick={()=>navigate(`/search/2/Lunch`)} className="page-item ms-3"><a className="page-link" href="">2</a></li>
                        <li onClick={()=>navigate(`/search/3/Dinner`)} className="page-item ms-3"><a className="page-link" href="#">3</a></li>
                        <li onClick={()=>navigate(`/search/4/Snacks`)} className="page-item ms-3"><a className="page-link" href="">4</a></li>
                        <li onClick={()=>navigate(`/search/5/Drinks`)} className="page-item ms-3"><a className="page-link" href="">5</a></li>
                        <li onClick={()=>navigate(`/search/6/NightLife`)} className="page-item ms-3"><a className="page-link" href="#">6</a></li>
                        <li className="page-item ms-3">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                </section>
            </section>
        </section>
    </main>
    </div>
    </>
  );
};
  
  export default Search;
import React, { useEffect, useState } from 'react'
import './listItems.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ListItems = ({ apiUrl }) => {
  const [allFood, setAllFood] = useState([]);

  const fetchFood = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/foods/food`);
      if (response.data.success === true) {
        setAllFood(response.data.data);
    
      }
    } catch (error) {
      console.log("FoodFetchError:", error)
    }
  };



  useEffect(() => {
    fetchFood()
  }, []);

  const removeFood = async (food_Id) =>{
    try {
      const response = await axios.post(`${apiUrl}api/foods/remove`,{id:food_Id} )
      if(response.data.success === true){
        fetchFood();
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("RemoveError:", error);
    }
  }

  return (
    <div className='list_Item'>
      <ToastContainer style={{width:"80%"}}/>
      <h2>All Food List</h2>
      <div className="header">
        <div className="image">Image</div>
        <div className="name">Name</div>
        <div className="category">Category</div>
        <div className="price">Price</div>
        <div className="remove">Remove</div>
      </div>
      {
        allFood.length > 0 ? <>
          {
            allFood.map((food) => {
              return <div className="content" key={food._id}>
                <div className="image">
                  <img src={`${apiUrl}images/${food.image}`} alt="" />
                </div>
                <div className="name">{food.name}
                
                </div>
                <div className="category">{food.category}</div>
                <div className="price">${food.price}</div>
                <div className="remove" onClick={()=> removeFood(food._id)}>X</div>
              </div>
            })
          }
        </> : <>No Food available</>
      }
    </div>
  )
}

export default ListItems

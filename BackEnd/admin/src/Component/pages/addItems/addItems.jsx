import React, { useState } from 'react';
import './addItems.css';
import image_Icon from '../../Assets/profile_icon.png';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AddItems = ({apiUrl}) => {
    
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name:"",
        description:"Food provides essential nutrients for overall health and well-being",
        price:"",
        category:"Salad"
    });
    const [emptyField, setEmptyField] = useState(false);

    const submitHandler = async (e) =>{
        if(!image){
            setEmptyField(true)
        }else{
            setEmptyField(false)
        }

        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${apiUrl}api/foods/add`, formData);
            if(response.data.message === "food added"){
                setData({
                    name:"",
                    description:"Food provides essential nutrients for overall health and well-being",
                    price:"",
                    category:"Salad"
                })
                setImage(null)
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
           console.log(error);
        }
    }



    const onchangeHandler = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>({...prev, [name]:value}));
    }


    return (
        <div className='addItems'>
             <ToastContainer style={{width:"80%"}}/>
            <form className='addForm' onSubmit={submitHandler} >
                <div className="add-img-con flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image? window.URL.createObjectURL(image):image_Icon} alt="Uploaded Preview" />
                    </label>
                    {emptyField?<small> Please fill the empty field</small>:""}
                    <input onChange={(e)=>setImage(e.target.files[0])}  hidden={true} type="file" id='image' />
                </div>
                <div className="add-name-con flex-col">
                    <p>Product name</p>
                    <input onChange={onchangeHandler} value={data.name} type="text" name="name" required placeholder='Type here' />
                </div>
                <div className="add-description-con flex-col">
                    <p>Product description</p>
                    <textarea onChange={onchangeHandler} value={data.description} name="description" required placeholder='Type description here' rows="5"></textarea>
                </div>
                <div className="add-category-price-con">
                    <div className="add-category-con flex-col">
                        <p>Product category</p>
                        <select name="category" onChange={onchangeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price-con flex-col">
                        <p>Product price</p>
                        <input onChange={onchangeHandler} value={data.price}  type="number" name="price" required placeholder='#2000' />
                    </div>
                </div>
                <button className="add-button" type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default AddItems;

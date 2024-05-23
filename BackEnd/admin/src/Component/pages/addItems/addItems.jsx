import React, { useState } from 'react';
import axios from 'axios';
import './addItems.css';
import image_Icon from '../../Assets/profile_icon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItems = () => {
    const apiURL = "http://localhost:6886";
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    });

    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const formHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        formData.append("image", image);

        try {
            const response = await axios.post(`${apiURL}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    category: "Salad",
                    price: ""
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                console.error('Error adding item', response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error adding item', error);
        }
    };

    return (
        <div className='addItems'>
            <form className='addForm' onSubmit={formHandler} >
                <div className="add-img-con flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? window.URL.createObjectURL(image) : image_Icon} alt="Uploaded Preview" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-name-con flex-col">
                    <p>Product name</p>
                    <input onChange={handleOnchange} value={data.name} type="text" name="name" required placeholder='Type here' />
                </div>
                <div className="add-description-con flex-col">
                    <p>Product description</p>
                    <textarea onChange={handleOnchange} value={data.description} name="description" required placeholder='Type description here' rows="5"></textarea>
                </div>
                <div className="add-category-price-con">
                    <div className="add-category-con flex-col">
                        <p>Product category</p>
                        <select name="category" value={data.category} onChange={handleOnchange}>
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
                        <input onChange={handleOnchange} value={data.price} type="number" name="price" required placeholder='$20' />
                    </div>
                </div>
                <button className="add-button" type='submit'>ADD</button>
            </form>
            <ToastContainer style={{width:"80%"}} />
        </div>
    );
};

export default AddItems;

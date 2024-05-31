import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'



const Add = ({url}) => {

    
    const [image, setImage]= useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        category:"salade",
        price:""
    })

    const onchangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onsubmithandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success){
            setData({
                name:"",
                description:"",
                category:"salade",
                price:""
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }



  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmithandler}>
        <div className='add-img-upload flex-col'>
            <p>upload image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
            <p>prooduct name</p>
            <input onChange={onchangehandler} value={data.name} type="text" name='name' placeholder='type here' />
        </div>
        <div className="add-product-disc flex-col">
            <p>product discription</p>
            <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='write content here'></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>product category</p>
                <select onChange={onchangehandler} value={data.category} name="category">
                    <option value="salade">salade</option>
                    <option value="rolls">rolls</option>
                    <option value="deserts">deserts</option>
                    <option value="sandwich">sandwich</option>
                    <option value="cake">cake</option>
                    <option value="pure veg">pure veg</option>
                    <option value="pasta">pasta</option>
                    <option value="noodles">noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>product price</p>
                <input onChange={onchangehandler} value={data.price} type="Number" name='price' placeholder='$20'/>
            </div>
        </div>
        <button type='submit' className='add-botton'>ADD</button>
      </form>
    </div>
  )
}

export default Add

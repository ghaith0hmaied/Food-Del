import React, { useContext,useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onchangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems= [];
    food_list.map((item)=>{
        if (cartItems[item._id]>0){
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo);
        }
    })
    console.log(orderItems);
}
  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
           <p className="title">delivery information</p>
           <div className="multi-fields">
               <input name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='first name'/>
               <input name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='last name'/>
           </div>
           <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email adresse'/>
           <input name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='Street'/>
           <div className="multi-fields">
               <input name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City'/>
               <input name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State'/>
           </div>
           <div className="multi-fields">
               <input name='zipCode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
               <input name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country'/>
           </div>
           <input  name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
      <div className="place-order-right">
      <div className="cart-total">
            <h2>cart total</h2>
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery fee</p>
                    <p>{getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder

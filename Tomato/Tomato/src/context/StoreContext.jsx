import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)
const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems]= useState({});

    const url = "http://localhost:4000"

    const [token,setToken] = useState("");

    const [food_list,setFoodList]= useState([]);
    const addToCart= async(ItemId) =>{
        if(!cartItems[ItemId]){
            setCartItems((prev=>({...prev,[ItemId]:1})))

        }
        else{
            setCartItems((prev=>({...prev,[ItemId]:prev[ItemId]+1})))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{ItemId},{header:{token}})
        }

    }
    const removeFromCart=(ItemId) =>{
            setCartItems((prev=>({...prev,[ItemId]:prev[ItemId]-1})))
        }
      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item)
            totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
      }

      const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
      }


      useEffect(()=>{      
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
      })


    const contextValue = {
        addToCart,
        food_list,
        setCartItems,
        removeFromCart,
        cartItems,
        getTotalCartAmount,
        url,
        token,
        setToken

    };
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
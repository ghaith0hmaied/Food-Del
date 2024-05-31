import React, {useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItems from '../FoodItems/FoodItems'
const FoodDisplay = ({category}) => {
    const {food_list} = useContext (StoreContext)
    if (!food_list) {
        return (
          <div className='food-display' id='food-display'> 
            <h2>Top dishes near you</h2>
            <p>No food items available</p>
          </div>
        );
      }
  return (
    <div className='food-display' id='food-display'> 
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
      {food_list.map((item,index)=>{

        if(category==="All" || category===item.category){
            return <FoodItems key={index}
            id={item._id} 
            name={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image}/>
        }

      })}
      </div>
    </div>
  )
}

export default FoodDisplay;

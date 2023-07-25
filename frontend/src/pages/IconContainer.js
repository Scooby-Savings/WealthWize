import React, { useState } from 'react';
import GroceriesIcon from '../images/Icons/groceries';
import DiningIcon from '../images/Icons/dining';
import EntertainmentIcon from '../images/Icons/entertainment';
import ClothingIcon from '../images/Icons/clothing';
import SubscriptionIcon from '../images/Icons/subscription';
import UtilitiesIcon from '../images/Icons/utilities';
import MedicalIcon from '../images/Icons/medical';
import TransportationIcon from '../images/Icons/transportation';
import HousingIcon from '../images/Icons/housing';

const IconContainer = ({ setCategory }) => {

  // uses empty strings to clear/reset icon background colors
  const clearedIconBackgroundColors = {
    Groceries: '', 
    Dining: '',
    Entertainment: '',
    Clothing: '',
    Subscriptions: '',
    Utilities: '',
    Medical: '',
    Transportation: '',
    Housing: '',
  };
  
  const [iconBackgroundColors, setIconBackgroundColors] = useState(clearedIconBackgroundColors);
  
  const handleIconClick = (event) => {
    // prevent icon click from submitting the form
    event.preventDefault();
    const iconCategory = event.currentTarget.getAttribute('value');
    // highlight the icon that was just clicked
    setIconBackgroundColors({...clearedIconBackgroundColors, [iconCategory]: '#FFCC80'});
    setCategory(iconCategory);
  }
  
  return (
    <div className='category-buttons category-buttons-expense'>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Groceries}} value="Groceries" onClick={(e) => handleIconClick(e)}><GroceriesIcon /></button>
          <p>Grocery</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Dining}} value="Dining" onClick={(e) => handleIconClick(e)}><DiningIcon /></button>
          <p>Dining</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Entertainment}} value="Entertainment" onClick={(e) => handleIconClick(e)}><EntertainmentIcon /></button>
          <p>Entertainment</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Clothing}} value="Clothing" onClick={(e) => handleIconClick(e)}><ClothingIcon /></button>
          <p>Clothing</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Subscriptions}} value="Subscriptions" onClick={(e) => handleIconClick(e)}><SubscriptionIcon /></button>
          <p>Subscriptions</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Utilities}} value="Utilities" onClick={(e) => handleIconClick(e)}><UtilitiesIcon /></button>
          <p>Utilites</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Medical}} value="Medical" onClick={(e) => handleIconClick(e)}><MedicalIcon /></button>
          <p>Medical</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Transportation}} value="Transportation" onClick={(e) => handleIconClick(e)}><TransportationIcon /></button>
          <p>Transportation</p>
      </div>
      <div>
          <button style={{backgroundColor: iconBackgroundColors.Housing}} value="Housing" onClick={(e) => handleIconClick(e)}><HousingIcon /></button>
          <p>Housing</p>
      </div>
    </div>
  );
};

export default IconContainer;
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
import IconButton from './IconButton';

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
      <IconButton
        backgroundColor={iconBackgroundColors.Groceries}
        value='Groceries'
        image={<GroceriesIcon />}
        handleClick={handleIconClick}
        text='Grocery'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Dining}
        value='Dining'
        image={<DiningIcon />}
        handleClick={handleIconClick}
        text='Dining'
      />
      <IconButton 
        backgroundColor={iconBackgroundColors.Entertainment}
        value='Entertainment'
        image={<EntertainmentIcon />}
        handleClick={handleIconClick}
        text='Entertainment'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Clothing}
        value='Clothing'
        image={<ClothingIcon />}
        handleClick={handleIconClick}
        text='Clothing'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Subscriptions}
        value='Subscriptions'
        image={<SubscriptionIcon />}
        handleClick={handleIconClick}
        text='Subscriptions'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Utilities}
        value='Utilities'
        image={<UtilitiesIcon />}
        handleClick={handleIconClick}
        text='Utilities'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Medical}
        value='Medical'
        image={<MedicalIcon />}
        handleClick={handleIconClick}
        text='Medical'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Transportation}
        value='Transportation'
        image={<TransportationIcon />}
        handleClick={handleIconClick}
        text='Transportation'
      />
      <IconButton
        backgroundColor={iconBackgroundColors.Housing}
        value='Housing'
        image={<HousingIcon />}
        handleClick={handleIconClick}
        text='Housing'
      />
    </div>
  );
};

export default IconContainer;
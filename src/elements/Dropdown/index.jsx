import React, { useState } from 'react';
import './style.css'

const Dropdown = (props) => {
    const {categories} = props
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    props.categoryClick(event.target.value)
  };

  return (
    <div className='dropdown'>
      <label htmlFor="dropdown">Выберите категорию:</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="all">Все категории</option>
        {
            categories ? categories.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
            })
            : <option value="">Категории еще не подвезли!</option>
        }
       
      </select>
    </div>
  );
};

export default Dropdown;

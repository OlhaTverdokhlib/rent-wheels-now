import React, { useState, useEffect } from 'react';
import fetchCars from '../../services/fetchCars';
import carsFilterStyles from './CarsFilter.module.scss';

const CarsFilter = ({
  selectedMake,
  setSelectedMake,
  selectedPrice,
  setSelectedPrice,
  minMileage,
  setMinMileage,
  maxMileage,
  setMaxMileage,
}) => {
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    fetchCars()
      .then(data => {
        const uniqueMakes = [...new Set(data.map(car => car.make))].sort();
        setMakes(uniqueMakes);
      })
      .catch(error => {
        console.error('Error Car brand fetch', error);
      });
  }, []);

  const handleMakeChange = event => {
    setSelectedMake(event.target.value);
  };

  const handlePriceChange = event => {
    setSelectedPrice(event.target.value);
  };

const formatMileage = mileage => {
  const numericString = mileage.toString().replace(/[^\d]/g, '');
  const parts = [];
  for (let i = numericString.length; i > 0; i -= 3) {
    parts.unshift(numericString.substring(i - 3, i));
  }
  return parts.join(',');
};



  const handleMinMileageChange = event => {
    let formattedMileage = formatMileage(event.target.value);
    setMinMileage(formattedMileage);
  };

  const handleMaxMileageChange = event => {
    let formattedMileage = formatMileage(event.target.value);
    setMaxMileage(formattedMileage);
  };

  return (
    <div className={carsFilterStyles.block}>
      <div className={carsFilterStyles.block__item}>
        <label className={carsFilterStyles.block__brand__legend}>
          Card brand:
        </label>

        <select
          value={selectedMake}
          onChange={handleMakeChange}
          className={carsFilterStyles.block__select}
        >
          <option
            value="All Makes"
            className={carsFilterStyles.block__select__option}
          >
            Enter the text
          </option>
          {makes.map(make => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <div className={carsFilterStyles.block__select__bg}></div>
      </div>
      <div className={carsFilterStyles.block__item}>
        <label>Price/ 1hour</label>
        <select
          value={selectedPrice}
          onChange={handlePriceChange}
          className={carsFilterStyles.block__select}
        >
          <option value="To $">To $</option>
          <option value="20">$20</option>
          <option value="30">$30</option>
          <option value="40">$40</option>
          <option value="50">$50</option>
          <option value="60">$60</option>
          <option value="70">$60</option>
          <option value="80">$80</option>
          <option value="90">$90</option>
          <option value="100">$100</option>
          <option value="110">$110</option>
          <option value="120">$120</option>
          <option value="130">$130</option>
          <option value="140">$140</option>
          <option value="150">$150</option>
          <option value="160">$160</option>
          <option value="170">$120</option>
          <option value="180">$130</option>
          <option value="190">$140</option>
          <option value="200">$150</option>
          <option value="210">$160</option>
        </select>
        <div className={carsFilterStyles.block__select__bg}></div>
      </div>
      <div className={carsFilterStyles.block__item}>
        <label>Сar mileage / km</label>
        <div className={carsFilterStyles.block__item__mileage}>
          <input
            type="text"
            value={minMileage}
            onChange={handleMinMileageChange}
            placeholder="From"
            maxLength={6}
            className={carsFilterStyles.block__item__mileage__select}
          />
          <input
            type="text"
            value={maxMileage}
            onChange={handleMaxMileageChange}
            placeholder="To"
            maxLength={6}
            className={carsFilterStyles.block__item__mileage__select}
          />
        </div>
      </div>
    </div>
  );
};

export default CarsFilter;

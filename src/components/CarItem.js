// CarItem.js
import React from 'react';

export function CarItem({ car }) {
  return (
    <div className="car-item">
      <h4>{car.name}</h4>
      <p>Year: {car.year}</p>
      <p>Engine: {car.engine}</p>
      <p>Price: {car.price}</p>
      <p>Brand: {car.brand}</p>
    </div>
  );
}

export default CarItem;

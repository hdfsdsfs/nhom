// CarDetail.js
import React from 'react';

export function CarDetail({ car, onClose }) {
  return (
    <div className="car-detail">
      <h2>{car.model}</h2>
      <img src={car.image} alt={car.model} className="car-detail-image" />
      <p>{car.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CarDetail;

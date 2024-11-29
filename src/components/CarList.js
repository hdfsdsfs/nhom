import React, { useState } from "react";
import { filterCarsByPrice, getCarById } from "../services/carService";

const CarList = () => {
  const [budget, setBudget] = useState(50000); // Ngân sách mặc định
  const filteredCars = filterCarsByPrice(budget); // Lọc xe theo ngân sách

  return (
    <div>
      <h1>Danh sách xe phù hợp</h1>
      <label>
        Ngân sách tối đa: 
        <input 
          type="number" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
        />
      </label>
      <ul>
        {filteredCars.map((car) => (
          <li key={car.id}>
            <h3>{car.name}</h3>
            <p>{car.description}</p>
            <p>Giá: {car.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;

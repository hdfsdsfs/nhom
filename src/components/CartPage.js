import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

export function CartPage() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [selectedCars, setSelectedCars] = useState([]); // Lưu trữ các xe đã chọn để so sánh

  const handleCompare = () => {
    if (selectedCars.length === 2) {
      alert('Comparing the selected cars: ' + selectedCars.map(car => car.name).join(' and '));
      // Chuyển tới bảng so sánh chi tiết
    } else {
      alert('Please select exactly two cars to compare.');
    }
  };

  const toggleSelectCar = (car) => {
    setSelectedCars((prev) => {
      if (prev.includes(car)) {
        return prev.filter(c => c !== car);
      } else {
        return [...prev, car];
      }
    });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((car) => (
            <div key={car.id} className="cart-item">
              <img src={car.image} alt={car.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h4>{car.name}</h4>
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Quantity:</strong> {car.quantity}</p>
                <p><strong>Total:</strong> ${car.price * car.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => removeFromCart(car.id)} className="remove-button">Remove</button>
                <button onClick={() => toggleSelectCar(car)} className="compare-button">
                  {selectedCars.includes(car) ? 'Deselect' : 'Select'} for Comparison
                </button>
              </div>
            </div>
          ))}
          <button className="clear-cart-button" onClick={clearCart}>
            Clear Cart
          </button>
          {selectedCars.length === 2 && (
            <button className="compare-button" onClick={handleCompare}>
              Compare Selected Cars
            </button>
          )}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Bảng so sánh khi có hai xe được chọn */}
      {selectedCars.length === 2 && (
        <div className="comparison-table">
          <h3>Comparison Table</h3>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>{selectedCars[0].name}</th>
                <th>{selectedCars[1].name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price</td>
                <td>${selectedCars[0].price}</td>
                <td>${selectedCars[1].price}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{selectedCars[0].year}</td>
                <td>{selectedCars[1].year}</td>
              </tr>
              <tr>
                <td>Engine</td>
                <td>{selectedCars[0].engine}</td>
                <td>{selectedCars[1].engine}</td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>{selectedCars[0].brand}</td>
                <td>{selectedCars[1].brand}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{selectedCars[0].description}</td>
                <td>{selectedCars[1].description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CartPage;

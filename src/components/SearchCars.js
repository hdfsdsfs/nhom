import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Thêm import cho Link
import './SearchCars.css'; // Import CSS riêng cho trang SearchCars

export function SearchCars() {
  const [query, setQuery] = useState('');
  const [cars, setCars] = useState([]); // Dữ liệu xe sẽ được lưu trữ ở đây

  useEffect(() => {
    // Lấy dữ liệu từ carsData.json
    const fetchCarsData = async () => {
      const response = await fetch('/carsData.json'); // Đảm bảo file carsData.json nằm trong thư mục 'public'
      const data = await response.json();
      setCars(data); // Lưu dữ liệu vào state
    };

    fetchCarsData(); // Gọi hàm khi component được render
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value); // Cập nhật query khi người dùng nhập vào ô tìm kiếm
  };

  // Lọc xe theo tên hoặc mô hình (case-insensitive)
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <section id="search">
      <h2>Search for Cars</h2>
      <input
        type="text"
        placeholder="Search by name or model..."
        value={query}
        onChange={handleSearch} // Cập nhật giá trị tìm kiếm
      />
      <CarList cars={filteredCars} />
    </section>
  );
}

function CarList({ cars }) {
  return (
    <div className="car-list">
      {cars.length > 0 ? (
        cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="car-item">
            <h4>{car.name}</h4>
          </Link>
        ))
      ) : (
        <p>No cars found.</p> // Nếu không tìm thấy xe nào
      )}
    </div>
  );
}

export default SearchCars;

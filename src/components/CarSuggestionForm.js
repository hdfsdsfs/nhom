import React, { useState, useEffect } from "react";
import './CarSuggestionForm.css';

export function CarSuggestionForm() {
  const [formData, setFormData] = useState({
    seats: "",
    budget: "",
    purpose: "",
  });

  const [suggestedCar, setSuggestedCar] = useState("");
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu xe từ file JSON khi component được render
    const fetchCarsData = async () => {
      const response = await fetch("/carsData.json"); // Đảm bảo bạn đặt file trong thư mục 'public'
      const data = await response.json();
      setCarsData(data);
    };
    fetchCarsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { seats, budget, purpose } = formData;

    // Tìm kiếm xe phù hợp dựa trên dữ liệu từ file JSON
    const car = carsData.find(
      (car) => car.seats === seats && car.budget === budget && car.purpose === purpose
    );

    if (car) {
      setSuggestedCar(`${car.name} - ${car.description}`);
    } else {
      setSuggestedCar("Hiện tại không có xe phù hợp.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} id="car-suggestion-form">
        <h2>Gợi ý xe phù hợp</h2>

        <label>
          Số ghế:
          <select name="seats" value={formData.seats} onChange={handleChange} required>
            <option value="">Chọn số ghế</option>
            <option value="4">4 ghế</option>
            <option value="7">7 ghế</option>
            <option value="8">8 ghế trở lên</option>
          </select>
        </label>

        <label>
          Ngân sách:
          <select name="budget" value={formData.budget} onChange={handleChange} required>
            <option value="">Chọn ngân sách</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </label>

        <label>
          Mục đích sử dụng:
          <select name="purpose" value={formData.purpose} onChange={handleChange} required>
            <option value="">Chọn mục đích</option>
            <option value="family">Gia đình</option>
            <option value="travel">Du lịch</option>
            <option value="business">Kinh doanh</option>
          </select>
        </label>

        <button type="submit">Gợi ý xe</button>

        {suggestedCar && <p className="suggestion-result">{suggestedCar}</p>}
      </form>
    </div>
  );
}

export default CarSuggestionForm;

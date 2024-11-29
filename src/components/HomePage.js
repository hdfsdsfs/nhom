import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import file CSS cho HomePage
import carImage1 from '../assets/car1.jpg'; // Hình ảnh đầu tiên
import carImage2 from '../assets/car2.jpg'; // Hình ảnh thứ hai
import carImage3 from '../assets/car3.jpg'; // Hình ảnh thứ ba

const images = [carImage1, carImage2, carImage3]; // Danh sách hình ảnh

export function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Trạng thái cho hình ảnh hiện tại
  const [isTransitioning, setIsTransitioning] = useState(false); // Trạng thái chuyển đổi

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true); // Bắt đầu chuyển đổi
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Chuyển sang hình ảnh tiếp theo
        setIsTransitioning(false); // Kết thúc chuyển đổi
      }, 500); // Thời gian hiệu ứng chuyển đổi
    }, 3000); // Thay đổi hình ảnh sau mỗi 3 giây

    return () => clearInterval(intervalId); // Dọn dẹp khi component bị hủy
  }, []);

  return (
    <section className="home-page">
      <div className="advertisement">
        <img 
          src={images[currentImageIndex]} // Sử dụng hình ảnh hiện tại
          alt="Quảng Cáo Porsche" 
          className={`advertisement-image ${isTransitioning ? 'fade-out' : 'fade-in'}`} 
        />
        <div className="advertisement-text">
          <h2>Khám Phá Dòng Xe Sang Trọng</h2>
          <p>Tham gia trải nghiệm những mẫu xe hiệu suất cao của Porsche.</p>
          <button className="explore-button">Tìm Hiểu Thêm</button>
        </div>
      </div>

      {/* Thêm thông tin về dòng xe */}
      <div className="car-info">
        <h2>Các Dòng Xe Nổi Bật</h2>
        <div className="car-list">
          <div className="car-item">
            <img src={carImage1} alt="Xe Porsche 1" className="car-image" />
            <h4>Porsche 911</h4>
            <p>Chiếc xe thể thao huyền thoại với hiệu suất vượt trội.</p>
          </div>
          <div className="car-item">
            <img src={carImage2} alt="Xe Porsche 2" className="car-image" />
            <h4>Porsche Cayenne</h4>
            <p>Xe SUV sang trọng với khả năng off-road xuất sắc.</p>
          </div>
          <div className="car-item">
            <img src={carImage3} alt="Xe Porsche 3" className="car-image" />
            <h4>Porsche Macan</h4>
            <p>Xe compact SUV với thiết kế thể thao và động cơ mạnh mẽ.</p>
          </div>
        </div>
      </div>

  {/* Phần ưu đãi đặc biệt */}
<div className="special-offers">
  <h2>Ưu Đãi Đặc Biệt</h2>
  <p>Khám phá các ưu đãi hấp dẫn dành riêng cho bạn.</p>
 
</div>



     {/* Phần tin tức mới nhất */}
<div className="latest-news">
  <h2>Tin Tức Mới Nhất</h2>
  <p>Khám phá những tin tức mới nhất từ hãng xe Porsche về các sản phẩm và sự kiện sắp tới!</p>
  <button className="explore-button">Đọc Tin Tức</button>
</div>

    </section>
  );
}

export default HomePage;

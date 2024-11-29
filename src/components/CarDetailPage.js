import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Import useCart
import './CarDetailPage.css';

function CarDetailPage() {
  const { carId } = useParams();
  const { addToCart } = useCart(); // Lấy hàm addToCart từ context

  const [car, setCar] = useState(null); // Lưu trữ thông tin xe
  const [comments, setComments] = useState([]); // Danh sách bình luận
  const [newComment, setNewComment] = useState(''); // Nội dung bình luận mới
  const [rating, setRating] = useState(5); // Đánh giá (mặc định là 5 sao)
  const [filterRating, setFilterRating] = useState(0); // Bộ lọc số sao

  // Lấy dữ liệu xe từ carsData.json khi trang tải lần đầu
  useEffect(() => {
    const fetchCarData = async () => {
      const response = await fetch('/carsData.json'); // Đảm bảo bạn đặt file trong thư mục public
      const data = await response.json();
      const car = data.find((c) => c.id === parseInt(carId)); // Tìm xe theo carId
      setCar(car);
    };
    fetchCarData();
  }, [carId]);

  // Lấy bình luận từ localStorage khi trang tải lần đầu
  useEffect(() => {
    const savedComments = localStorage.getItem('carComments');
    if (savedComments) {
      const parsedComments = JSON.parse(savedComments);
      setComments(parsedComments[carId] || []); // Lấy bình luận theo carId
    }
  }, [carId]);

  // Lưu bình luận vào localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('carComments');
    const parsedComments = savedComments ? JSON.parse(savedComments) : {};

    // Cập nhật bình luận cho carId hiện tại
    parsedComments[carId] = comments;
    localStorage.setItem('carComments', JSON.stringify(parsedComments));
  }, [comments, carId]);

  if (!car) {
    return <p>Car not found.</p>;
  }

  const handleAddToCart = () => {
    addToCart(car); // Thêm xe vào giỏ hàng
    alert(`${car.name} has been added to the cart!`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, rating, date: new Date().toLocaleString() }]);
      setNewComment('');
      setRating(5); // Reset đánh giá về 5
    }
  };

  // Lọc bình luận theo số sao
  const filteredComments = filterRating
    ? comments.filter((comment) => comment.rating === filterRating)
    : comments;

  return (
    <div className="car-detail-page">
      <div className="car-detail-header">
        <h3>{car.name}</h3>
        <img src={car.image} alt={car.name} className="car-detail-image" />
      </div>
      <div className="car-detail-info">
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Engine:</strong> {car.engine}</p>
        <p><strong>Price:</strong> {car.price}</p>
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Description:</strong> {car.description}</p>

        <div className="button-container">
          <Link to="/search" className="back-button">Back to Search</Link>
          <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      {/* Mục bình luận và đánh giá */}
      <div className="car-comments-section">
        <h4>Comments and Ratings</h4>

        {/* Bộ lọc bình luận */}
        <div className="filter-section">
          <label>
            Filter by Rating:
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Danh sách bình luận */}
        <ul className="comments-list">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment, index) => (
              <li key={index} className="comment-item">
                <p><strong>Date:</strong> {comment.date}</p>
                <p><strong>Rating:</strong> {comment.rating} ⭐</p>
                <p>{comment.text}</p>
              </li>
            ))
          ) : (
            <p>No comments found for this rating.</p>
          )}
        </ul>

        {/* Form thêm bình luận */}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            required
            className="comment-textarea"
          />
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="rating-select">
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="submit-comment-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CarDetailPage;

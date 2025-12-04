import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, Loader } from "lucide-react";
import { motion } from "framer-motion";

const ProductGrid = () => {
  const [products, setProducts] = useState([]); // Chứa danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null);

  // Hàm lấy dữ liệu từ Backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Không thể kết nối Server");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Nạp dữ liệu mẫu (Chỉ dùng nút này để test bài tập lớn)
  const seedData = async () => {
    try {
      await fetch("http://localhost:5000/api/seed", { method: "GET" });
      alert("Đã nạp dữ liệu mẫu vào Database! Hãy tải lại trang.");
      fetchProducts();
    } catch (err) {
      alert("Lỗi nạp dữ liệu");
    }
  };

  // Gọi hàm lấy dữ liệu khi web vừa mở lên
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20">
        <Loader className="animate-spin mx-auto" /> Đang tải sản phẩm...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>Lỗi: {error}</p>
        <p className="text-sm text-gray-500 mt-2">
          Hãy chắc chắn bạn đã chạy lệnh: <b>node index.js</b> ở thư mục server
        </p>
      </div>
    );

  return (
    <section className="py-16 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Dữ liệu này được lấy trực tiếp từ MongoDB 🍃
          </p>
          {/* Nút tạm để bạn nạp dữ liệu mẫu */}
          {products.length === 0 && (
            <button
              onClick={seedData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Click để tạo dữ liệu mẫu vào DB
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id} // MongoDB dùng _id thay vì id
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between items-end">
                  <div>
                    <span className="text-xl font-bold text-red-600 block">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="bg-gray-900 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

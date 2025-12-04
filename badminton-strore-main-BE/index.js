import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./models/Product.js";

const app = express();
app.use(cors());
app.use(express.json());

// 1. KẾT NỐI MONGODB
mongoose
  .connect("mongodb://127.0.0.1:27017/badminton-store")
  .then(() => console.log("✅ Đã kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// 2. API TẠO DỮ LIỆU MẪU (Đã sửa ảnh chuẩn thể thao)

app.get('/api/seed', async (req, res) => { 
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: "Vợt Yonex Astrox 100",
        price: "3.200.000đ",
        oldPrice: "4.100.000đ",
        rating: 5,
        image:
          "/image/vot-yonex-astrox100.jpg",
        tag: "Hot Hit",
      },
      {
        name: "Giày Yonex Strider Wide",
        price: "2.400.000đ",
        oldPrice: "2.800.000đ",
        rating: 5,
        image:
          "/image/giay-yonex-shb-sr1wex-den-cam.jpg",
        tag: "-15%",
      },
      {
        name: "Áo cầu lông Yonex TRM3066 - Georgia Peach chính hãng",
        price: "350.000đ",
        oldPrice: null,
        rating: 4,
        image:
          "/image/ao-yonex-trm3066-georgia-peach.jpg",
        tag: "Mới",
      },
      {
        name: "Balo cầu lông Yonex BA92412BEX - Dark Green chính hãng",
        price: "850.000đ",
        oldPrice: "1.200.000đ",
        rating: 5,
        image:
          "/image/balo-yonex-ba92421bex-dark-green.jpg",
        tag: "Giảm sâu",
      },
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "Đã tạo dữ liệu mẫu thành công!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. API LẤY DANH SÁCH SẢN PHẨM
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. CHẠY SERVER (Đây là đoạn quan trọng để server không bị tắt)
app.listen(5000, () => {
  console.log("🚀 Server đang chạy tại http://localhost:5000");
});

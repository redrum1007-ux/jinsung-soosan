const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Product = require('./models/Product');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payment', require('./routes/payment'));

// Sync Database & Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }) // Set force: true to reset DB on restart
    .then(async () => {
        console.log('Database synced');
        
        // Seed initial products if empty
        const count = await Product.count();
        if (count === 0) {
            const initialProducts = [
                {
                    name: "완도산 특대 전복 (1kg)",
                    price: 59000,
                    discount: "-15%",
                    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    isHot: false,
                    category: "건어물"
                },
                {
                    name: "명품 영광 굴비 세트",
                    price: 120000,
                    discount: null,
                    image: "https://images.unsplash.com/photo-1534604973900-c41846f47c40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    isHot: false,
                    category: "건어물"
                },
                {
                    name: "자연산 수산물 랜덤박스",
                    price: 35000,
                    discount: "HOT",
                    image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    isHot: true,
                    category: "건어물"
                },
                {
                    name: "프리미엄 육수용 멸치",
                    price: 15000,
                    discount: null,
                    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                    isHot: false,
                    category: "멸치"
                }
            ];
            await Product.bulkCreate(initialProducts);
            console.log('Initial products seeded');
        }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch(err => console.log(err));

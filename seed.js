const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts); // bật layouts
app.set('layout', 'layout');

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/crud-demo');

    // Xóa dữ liệu cũ
    await Supplier.deleteMany({});
    await Product.deleteMany({});

    // Tạo supplier mới
    const sony = await Supplier.create({ name: 'Sony', address: 'Tokyo', phone: '0909123456' });
    const xiaomi = await Supplier.create({ name: 'Xiaomi', address: 'Beijing', phone: '0912345678' });

    // Tạo sản phẩm mới
    await Product.create([
        { name: 'Sony Bravia 55"', price: 1500, quantity: 8, supplier: sony._id },
        { name: 'Sony WH-1000XM5', price: 400, quantity: 20, supplier: sony._id },
        { name: 'Xiaomi Mi 14 Ultra', price: 900, quantity: 12, supplier: xiaomi._id },
        { name: 'Xiaomi Pad 6 Pro', price: 600, quantity: 18, supplier: xiaomi._id },
        { name: 'Sony PlayStation 5', price: 550, quantity: 10, supplier: sony._id },
        { name: 'Xiaomi Smart Band 8', price: 70, quantity: 50, supplier: xiaomi._id }
    ]);

    console.log('✅ Seed dữ liệu mới thành công!');
    process.exit();
}

seed().catch(err => console.error(err));
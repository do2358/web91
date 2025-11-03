import { hash } from 'crypto';
import mongoose from 'mongoose';
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const userSchema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String,
    apiKey: String
});
// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const UsersModel = mongoose.model('users', userSchema);
export default UsersModel;
// createAdmin.js (temporary script to run once)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // update path if needed
import bcrypt from 'bcrypt';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists');
    return process.exit(0);
  }

    const admin = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin'
  });

  await admin.save();
  console.log('✅ Admin created');
  process.exit(0);
};

createAdmin();

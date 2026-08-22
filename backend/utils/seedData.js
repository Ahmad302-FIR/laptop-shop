import { Admin } from '../models/Admin.js';
import { Product } from '../models/Product.js';
import { initialProducts } from './initialProducts.js';

export const seedDatabase = async () => {
  try {
    // 1. Seed Default Admin Account
    const defaultUsername = (
      process.env.ADMIN_USERNAME && process.env.ADMIN_USERNAME !== 'your_admin_username_here'
        ? process.env.ADMIN_USERNAME
        : process.env.ADMIN_DEFAULT_USERNAME || 'admin'
    ).toLowerCase();

    const defaultPassword =
      process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD !== 'your_admin_password_here'
        ? process.env.ADMIN_PASSWORD
        : process.env.ADMIN_DEFAULT_PASSWORD || 'admin12345';

    const existingAdmin = await Admin.findOne({ username: defaultUsername });
    if (!existingAdmin) {
      await Admin.create({
        username: defaultUsername,
        password: defaultPassword,
        role: 'admin'
      });
      console.log(`[Seed] Default Admin account created: username="${defaultUsername}"`);
    }

    // 2. Seed Initial Products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const formatted = initialProducts.map(({ id, ...rest }) => rest);
      await Product.insertMany(formatted);
      console.log(`[Seed] Initialized ${formatted.length} products in database.`);
    }
  } catch (error) {
    console.error('[Seed] Notice during database auto-seed:', error.message);
  }
};

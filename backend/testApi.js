/**
 * Comprehensive API Integration Test Script
 */
import app from './server.js';
import http from 'http';

const TEST_PORT = 5098;
const server = http.createServer(app);

const runTests = async () => {
  await new Promise((resolve) => server.listen(TEST_PORT, resolve));
  console.log(`\n======================================================`);
  console.log(`🧪 Running Backend API Endpoint Automated Tests on :${TEST_PORT}`);
  console.log(`======================================================\n`);

  const BASE = `http://127.0.0.1:${TEST_PORT}/api`;

  const makeReq = async (path, method = 'GET', body = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  };

  try {
    // Test 1: GET /api/products
    console.log('1. Testing GET /api/products (Public)...');
    const t1 = await makeReq('/products');
    console.log(`   Status: ${t1.status}, Products Count: ${t1.data.count || t1.data.data?.length}`);
    if (t1.status !== 200) throw new Error('GET /api/products failed');

    // Test 2: POST /api/admin/login
    console.log('\n2. Testing POST /api/admin/login (Admin Credentials)...');
    const t2 = await makeReq('/admin/login', 'POST', {
      username: 'admin',
      password: 'admin12345'
    });
    console.log(`   Status: ${t2.status}, Token Received: ${Boolean(t2.data.token)}`);
    if (t2.status !== 200 || !t2.data.token) throw new Error('Admin login failed');
    const token = t2.data.token;

    // Test 3: GET /api/admin/me (Protected Route)
    console.log('\n3. Testing GET /api/admin/me (Protected JWT Verification)...');
    const t3 = await makeReq('/admin/me', 'GET', null, token);
    console.log(`   Status: ${t3.status}, Username: ${t3.data.admin?.username}`);
    if (t3.status !== 200) throw new Error('Protected /admin/me failed');

    // Test 4: POST /api/products (Add New Laptop)
    console.log('\n4. Testing POST /api/products (Protected Create Laptop)...');
    const sampleLaptop = {
      name: 'Lenovo ThinkPad X1 Carbon Gen 9',
      brand: 'Lenovo',
      category: 'business',
      processor: 'Intel Core i7-1185G7',
      ram: '16GB LPDDR4x',
      storage: '512GB PCIe NVMe SSD',
      display: '14.0" 4K UHD IPS Anti-Glare',
      price: 155000,
      stock: 'available',
      featured: true,
      onSale: false,
      images: [
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
      ]
    };
    const t4 = await makeReq('/products', 'POST', sampleLaptop, token);
    console.log(`   Status: ${t4.status}, Created ID: ${t4.data.data?.id || t4.data.data?._id}`);
    if (t4.status !== 201) throw new Error('Create product failed');
    const createdId = t4.data.data?.id || t4.data.data?._id;

    // Test 5: PATCH /api/products/:id/stock (Toggle Stock)
    console.log('\n5. Testing PATCH /api/products/:id/stock (Quick Stock Toggle)...');
    const t5 = await makeReq(`/products/${createdId}/stock`, 'PATCH', { stock: 'sold' }, token);
    console.log(`   Status: ${t5.status}, Stock Status: ${t5.data.data?.stock}`);
    if (t5.status !== 200 || t5.data.data?.stock !== 'sold') throw new Error('Toggle stock failed');

    // Test 6: PATCH /api/products/:id/price (Price & Sale Toggle)
    console.log('\n6. Testing PATCH /api/products/:id/price (Discount Promotion)...');
    const t6 = await makeReq(`/products/${createdId}/price`, 'PATCH', {
      price: 145000,
      oldPrice: 155000,
      onSale: true
    }, token);
    console.log(`   Status: ${t6.status}, New Price: ${t6.data.data?.price}, onSale: ${t6.data.data?.onSale}`);
    if (t6.status !== 200) throw new Error('Price update failed');

    // Test 7: DELETE /api/products/:id (Delete Product)
    console.log('\n7. Testing DELETE /api/products/:id (Protected Delete)...');
    const t7 = await makeReq(`/products/${createdId}`, 'DELETE', null, token);
    console.log(`   Status: ${t7.status}, Message: ${t7.data.message}`);
    if (t7.status !== 200) throw new Error('Delete product failed');

    console.log('\n======================================================');
    console.log('🎉 ALL BACKEND API ENDPOINTS TESTED AND PASSED 100%!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  } finally {
    server.close();
  }
};

runTests();

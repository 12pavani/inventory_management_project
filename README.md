<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>📦 Inventory Management System</h1>

<p>A full-stack inventory management application built with FastAPI and React, deployed on Render. This system helps businesses manage their inventory, track products, and communicate with suppliers efficiently.</p>

<h2>🌐 Live Demo</h2>
<ul>
    <li><strong>Frontend:</strong> <a href="https://inventory-management-frontend-5bio.onrender.com">https://inventory-management-frontend-5bio.onrender.com</a></li>
    <li><strong>Backend API:</strong> <a href="https://inventory-management-backend-ppyt.onrender.com">https://inventory-management-backend-ppyt.onrender.com</a></li>
    <li><strong>API Documentation:</strong> <a href="https://inventory-management-backend-ppyt.onrender.com/docs">https://inventory-management-backend-ppyt.onrender.com/docs</a></li>
</ul>

<h2>✨ Features</h2>

<h3>Product Management</h3>
<ul>
    <li>Add, edit, and delete products</li>
    <li>Track quantity in stock and quantity sold</li>
    <li>Automatic revenue calculation</li>
    <li>Real-time product search</li>
    <li>Product count display</li>
</ul>

<h3>Supplier Management</h3>
<ul>
    <li>Manage supplier information</li>
    <li>Email communication system</li>
    <li>Link products to suppliers</li>
</ul>

<h3>User Interface</h3>
<ul>
    <li>Responsive Bootstrap design</li>
    <li>Navigation bar with product counter</li>
    <li>Search functionality</li>
    <li>Interactive forms with validation</li>
</ul>

<h2>🛠️ Tech Stack</h2>

<h3>Backend</h3>
<ul>
    <li>FastAPI</li>
    <li>Tortoise ORM</li>
    <li>PostgreSQL</li>
    <li>FastAPI-Mail</li>
    <li>Python 3.8+</li>
    <li>CORS enabled for cross-origin requests</li>
</ul>

<h3>Frontend</h3>
<ul>
    <li>React</li>
    <li>React Bootstrap</li>
    <li>React Router</li>
    <li>Context API for state management</li>
    <li>React Hooks</li>
</ul>

<h2>💻 Components Structure</h2>

<h3>Context Components</h3>
<pre><code>- ProductContext.js  // Manages global product state
- SupplierContext.js // Manages supplier information
- UpdateContext.js   // Handles product updates</code></pre>

<h3>UI Components</h3>
<pre><code>- NavBar.js       // Navigation with search and product counter
- AddProducts.js  // Product addition form
- ProductList.js  // Display and manage products</code></pre>

<h2>🚀 Local Development Setup</h2>

<h3>Backend Setup</h3>

1. Clone the repository
<pre><code>git clone
cd inventory-management</code></pre>

2. Create virtual environment
<pre><code>python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate</code></pre>

3. Install dependencies
<pre><code>pip install fastapi uvicorn tortoise-orm fastapi-mail python-dotenv</code></pre>

4. Set up environment variables (.env)
<pre><code>EMAIL=your-email@gmail.com
PASS=your-email-password
DATABASE_URL=postgresql://username:password@localhost:5432/dbname</code></pre>

5. Run development server
<pre><code>uvicorn app:app --reload --port 8000</code></pre>

<h3>Frontend Setup</h3>

1. Navigate to frontend directory
<pre><code>cd frontend</code></pre>

2. Install dependencies
<pre><code>npm install</code></pre>

3. Set up environment variables (.env)
<pre><code>REACT_APP_API_URL=http://localhost:8000</code></pre>

4. Start development server
<pre><code>npm start</code></pre>

<h2>📡 API Endpoints</h2>

<h3>Products</h3>
<pre><code>GET /product         - List all products
GET /product/{id}    - Get product details
POST /product/{supplier_id} - Create product
PUT /product/{id}    - Update product
DELETE /product/{id} - Delete product</code></pre>

<h3>Suppliers</h3>
<pre><code>GET /supplier        - List suppliers
POST /supplier       - Add supplier
PUT /supplier/{id}   - Update supplier
DELETE /supplier/{id}- Delete supplier</code></pre>

<h3>Email</h3>
<pre><code>POST /email/{product_id} - Send supplier email</code></pre>

<h2>📊 Data Models</h2>

<h3>Product Model</h3>
<pre><code>{
    id: number;
    name: string;
    quantity_in_stock: number;
    quantity_sold: number;
    unit_price: number;
    revenue: number;
    supplied_by: number;
}</code></pre>

<h3>Supplier Model</h3>
<pre><code>{
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
}</code></pre>

<h2>🔄 State Management Example</h2>
<pre><code>// Product Context Usage
const [Products, setProducts] = useContext(ProductContext);

// Update Product
const updateForm = (e) => {
    setProductInfo({
        ...productInfo,
        [e.target.name]: e.target.value
    });
};</code></pre>

<h2>🚀 Deployment</h2>

<h3>Backend Deployment</h3>
<ol>
    <li>Create a new Web Service on Render</li>
    <li>Connect your GitHub repository</li>
    <li>Configure environment variables:
        <ul>
            <li>DATABASE_URL</li>
            <li>EMAIL</li>
            <li>PASS</li>
        </ul>
    </li>
    <li>Set build command: <code>pip install -r requirements.txt</code></li>
    <li>Set start command: <code>uvicorn app:app --host 0.0.0.0 --port $PORT</code></li>
</ol>

<h3>Frontend Deployment</h3>
<ol>
    <li>Create a new Static Site on Render</li>
    <li>Connect your GitHub repository</li>
    <li>Set build command: <code>npm install && npm run build</code></li>
    <li>Set publish directory: <code>build</code></li>
</ol>

<h2>🔐 Security Features</h2>
<ul>
    <li>CORS configuration for specified origins</li>
    <li>Environment variables for sensitive data</li>
    <li>Email authentication</li>
    <li>Input validation</li>
</ul>

<h2>🐛 Troubleshooting</h2>
Common issues and solutions:
<ul>
    <li>CORS errors: Check if your domain is added to the allowed origins</li>
    <li>Database connection: Verify PostgreSQL connection string</li>
    <li>Email sending failures: Check email credentials</li>
</ul>

<h2>📱 Responsive Design</h2>
The application is fully responsive and tested on:
<ul>
    <li>Desktop (1200px+)</li>
    <li>Tablet (768px - 1199px)</li>
    <li>Mobile (320px - 767px)</li>
</ul>

<h2>🤝 Contributing</h2>
<ol>
    <li>Fork the repository</li>
    <li>Create your feature branch</li>
    <li>Commit your changes</li>
    <li>Push to the branch</li>
    <li>Create a Pull Request</li>
</ol>

<h2>📄 License</h2>
<p>This project is licensed under the MIT License.</p>

<p>Made with ❤️ using FastAPI and React</p>

</body>
</html>

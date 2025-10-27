const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 75000 },
  { id: 2, name: 'Mobile', price: 25000 },
  { id: 3, name: 'Tablet', price: 35000 }
];

// Route to render products with EJS
app.get('/products', (req, res) => {
  res.render('products', {
    title: 'Product Catalog',
    products: products
  });
});

// Root route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Welcome to the store!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
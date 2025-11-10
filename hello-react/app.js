// Greeting component
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Footer component
function Footer() {
  return <p>&copy; 2025 CSC13008-23KTPM1</p>;
}

// App
function App() {
  return (
    <div>
      <Greeting />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

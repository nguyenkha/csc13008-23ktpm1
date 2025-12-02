import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const isAuthenticated = false; // Simulated authentication status
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true }); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Protected content</h1>
      <nav>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  );
};

// Home Component
const Home = () => (
  <div>
    <h1>Welcome to the Home page</h1>
    <nav>
      <Link to="/protected" className="link">Go to Protected Content</Link>
      <Link to="/login" className="link">Login</Link>
    </nav>
  </div>
);

// Login Component
const Login = () => (
  <div>
    <h1>Please log in</h1>
    <nav>
      <Link to="/">Back to Home</Link>
    </nav>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home route */}
      <Route path="/protected" element={<ProtectedRoute />} /> {/* Protected route */}
      <Route path="/login" element={<Login />} /> {/* Login route */}
    </Routes>
  </Router>
);

export default App;
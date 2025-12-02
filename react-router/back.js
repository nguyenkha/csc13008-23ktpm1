import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate(-1)}>Back</button> {/* Navigate to previous page */}
      <nav>
        <Link to="/">Go to Home</Link> {/* Link to Home */}
      </nav>
    </div>
  );
};

const App = () => (
  <Router>
    <nav>
      <Link to="/" className="link">Home</Link>
      <Link to="/dashboard" className="link">Dashboard</Link>
    </nav>
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App; 
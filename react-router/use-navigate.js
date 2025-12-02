import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (email) {
      navigate('/profile'); // Navigate to Profile page if email is entered
    } else {
      alert('Please enter an email!'); // Alert user if email is empty
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
      />
      <button onClick={handleSignup}>Signup</button> {/* Call handleSignup on click */}
      <nav>
        <Link to="/">Back to Home</Link> {/* Navigation back to Home page */}
      </nav>
    </div>
  );
};

// Home Component
const Home = () => (
  <div>
    <h1>Welcome to the Home page</h1>
    <nav>
      <Link to="/signup">Signup</Link> {/* Link to Signup page */}
    </nav>
  </div>
);

// Profile Component
const Profile = () => (
  <div>
    <h1>Welcome to your profile</h1>
    <p>Your profile page is successfully loaded!</p>
    <nav>
      <Link to="/">Go to Home</Link> {/* Link back to Home */}
    </nav>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      {/* Routes */}
      <Route path="/" element={<Home />} /> {/* Home Route */}
      <Route path="/signup" element={<Signup />} /> {/* Signup Route */}
      <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
    </Routes>
  </Router>
);

export default App;
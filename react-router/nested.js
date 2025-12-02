import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Dashboard Component
const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <nav>
      <Link to="/dashboard/profile" className="link">Profile</Link>
      <Link to="/dashboard/settings" className="link">Settings</Link>
      <Link to="/dashboard/notifications" className="link">Notifications</Link>
    </nav>
  </div>
);

// Child Components
const Profile = () => <h2>Profile section</h2>;
const Settings = () => <h2>Settings section</h2>;
const Notifications = () => <h2>Notifications section</h2>;

const App = () => (
  <Router>
    <nav>
      <Link to="/" className="link">Home</Link>
      <Link to="/dashboard" className="link">Dashboard</Link>
    </nav>
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/notifications" element={<Notifications />} />
    </Routes>
  </Router>
);

export default App
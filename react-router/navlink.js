import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

const Home = () => <h1>Welcome to my portfolio</h1>;
const About = () => <h1>About me</h1>;
const Contact = () => <h1>Contact me</h1>;

const App = () => (
  <Router>
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { color: 'red', fontWeight: 'bold' } : undefined)}
        className="link">Home</NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => (isActive ? { color: 'red', fontWeight: 'bold' } : undefined)}
        className="link">About</NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) => (isActive ? { color: 'red', fontWeight: 'bold' } : undefined)}
        className="link">Contact</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);

export default App
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <h1>Welcome to my portfolio</h1>;
const About = () => <h1>About me</h1>;
const Projects = () => <h1>My projects</h1>;
const Contact = () => <h1>Contact me</h1>;

const App = () => (
<Router>
  <nav>
    <Link to="/" className="link">Home</Link>
    <Link to="/about" className="link">About</Link>
    <Link to="/projects" className="link">Projects</Link>
    <Link to="/contact" className="link">Contact</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Router>
);

export default App
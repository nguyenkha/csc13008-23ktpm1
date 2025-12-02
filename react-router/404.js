import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => <h1>Welcome to my portfolio</h1>;
const About = () => <h1>About me</h1>;
const Contact = () => <h1>Contact me</h1>;
// A NotFound component to display a 404 message
const NotFound = () => <h1>404 page not found</h1>;

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      {/* A wildcard route (*) to catch all undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App 
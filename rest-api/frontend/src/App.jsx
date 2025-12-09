import './App.css'
import { useState } from 'react'
import ShippingForm from './ShippingForm'
import ListOrders from './ListOrders';
import ApiContext from './ApiContext';

function App() {
  const apiUrl = 'http://localhost:4000';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3d3RvaW9uYnNvc2Fnd3FsbHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE3NjAsImV4cCI6MjA3OTQ4Nzc2MH0.VjuT1OG-Yy0sRv3B0gWQBGWkQ1kkklsMjSDSwP_6pXs';
  const [currentPage, setCurrentPage] = useState('Home');

  // Function to change page
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <ListOrders setCurrentPage={setCurrentPage} />;
      case 'ShippingForm':
        return <ShippingForm setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <ApiContext.Provider value={{ url: apiUrl, key: apiKey }}>
        {renderPage()}
      </ApiContext.Provider>
    </>
  )
}

export default App

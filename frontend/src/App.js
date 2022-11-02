import React, {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Fragment>
    <Router>
      <Header/>
      <Container>
      <main className="py-3">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
      </Routes>
      </main>
      </Container>
      
    </Router>
     <Footer/>
    
    
      
    </Fragment>
  );
}

export default App;
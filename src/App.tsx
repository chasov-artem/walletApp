import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './pages/TransactionsList';
import TransactionDetail from './pages/TransactionDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="*" element={<div style={{padding:48,textAlign:'center'}}>Not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;

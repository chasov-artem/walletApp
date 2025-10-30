import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsList from "./pages/TransactionsList";
import TransactionDetail from "./pages/TransactionDetail";

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route
          path="*"
          element={
            <div style={{ padding: 48, textAlign: "center" }}>Not found</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

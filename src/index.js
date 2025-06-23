
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import InvestmentEngine from "./InvestmentEngine";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <div className="px-6 md:px-20 pb-20">
      <InvestmentEngine />
    </div>
  </>
);

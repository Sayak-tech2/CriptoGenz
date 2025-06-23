
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InvestmentEngine() {
  const [amount, setAmount] = useState(5000);
  const [suggestions, setSuggestions] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "inr",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      })
      .then((res) => setCoins(res.data));
  }, []);

  const handleSuggest = () => {
    const stable = coins[0];
    const growth = coins[1];
    const risky = coins[5];
    const suggestion = [
      {
        category: "Stable",
        coin: stable.name,
        symbol: stable.symbol,
        amount: (amount * 0.5).toFixed(0),
      },
      {
        category: "Growth",
        coin: growth.name,
        symbol: growth.symbol,
        amount: (amount * 0.3).toFixed(0),
      },
      {
        category: "Risky",
        coin: risky.name,
        symbol: risky.symbol,
        amount: (amount * 0.2).toFixed(0),
      },
    ];
    setSuggestions(suggestion);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-bold text-purple-600 mb-2">
        💡 Smart Investment Suggestion
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter how much you want to invest (₹) and get a suggested portfolio.
      </p>

      <div className="flex gap-4 items-center mb-4">
        <input
          type="range"
          min={1000}
          max={100000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
        <span className="text-md font-bold text-indigo-700">₹{amount}</span>
      </div>

      <button
        onClick={handleSuggest}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
      >
        Generate Suggestion
      </button>

      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-bold text-gray-700 mb-2">Suggested Allocation:</h3>
          <ul className="space-y-2">
            {suggestions.map((sug, idx) => (
              <li
                key={idx}
                className="border border-gray-200 p-3 rounded-md bg-gray-50"
              >
                <span className="font-semibold">{sug.category}</span>: ₹{sug.amount} →
                <span className="ml-1 font-medium text-indigo-600"> {sug.coin} ({sug.symbol.toUpperCase()})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

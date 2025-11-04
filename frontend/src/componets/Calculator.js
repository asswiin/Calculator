import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (val) => setInput(input + val);
  const clear = () => setInput("");
  
  const calculate = async () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      await axios.post("http://172.20.10.3:5000/api/calculations", {
        expression: input,
        result
      });
      getHistory();
    } catch {
      setInput("Error");
    }
  };

  const getHistory = async () => {
    const res = await axios.get("http://172.20.10.3:5000/api/calculations");
    setHistory(res.data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>MERN Calculator</h2>
      <input type="text" value={input} readOnly style={{ width: "100%", marginBottom: 10 }} />
      <div>
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((val) => (
          <button
            key={val}
            onClick={() => (val === "=" ? calculate() : handleClick(val))}
            style={{ width: 50, height: 50, margin: 5 }}
          >
            {val}
          </button>
        ))}
        <button onClick={clear} style={{ width: 110, height: 50, margin: 5 }}>Clear</button>
      </div>
      <h3>History</h3>
      <ul>
        {history.map((h, index) => (
          <li key={index}>{h.expression} = {h.result}</li>
        ))}
      </ul>
    </div>
  );
}
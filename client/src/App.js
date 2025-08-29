import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");

  const handleRun = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", {
        code,
        language,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running code");
    }
  };

  return (
    <div className="app-container">
      <h1>🖥️ Online Code Compiler</h1>

      <select
        className="language-select"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
      >
        <option value="python3">Python</option>
        <option value="cpp17">C++</option>
        <option value="java">Java</option>
      </select>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br />
      <button onClick={handleRun}>▶ Run</button>

      <div className="output-box">
        <h3>Output:</h3>
        <div>{output}</div>
      </div>
    </div>
  );
}

export default App;

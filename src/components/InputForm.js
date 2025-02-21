import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => setInputData(e.target.value);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const res = await axios.post("https://your-backend-url/bfhl", parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API error.");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div>
      <textarea
        value={inputData}
        onChange={handleInputChange}
        placeholder='Enter JSON data (e.g., { "data": ["A", "1", "z"] })'
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <br /><br />
      <label>Select Options: </label>
      <select multiple onChange={handleOptionChange}>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_alphabet">Highest Alphabet</option>
      </select>

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) =>
                  selectedOptions.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default InputForm;


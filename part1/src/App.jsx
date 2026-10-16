import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    console.log("clicked good");
    setGood(good + 1);
  };

  const handleNeutral = () => {
    console.log("clicked neutral");
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    console.log("clicked bad");
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => handleGood()}>good</button>
        <button onClick={() => handleNeutral()}>neutral</button>
        <button onClick={() => handleBad()}>bad</button>
      </div>
      <h2>statistics</h2>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </>
  );
};

export default App;

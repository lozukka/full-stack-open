import { useState } from "react";

const Statistics = ({ feedback }) => {
  console.log(feedback);

  const all = feedback.good + feedback.neutral + feedback.bad;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  const average = all === 0 ? 0 : (feedback.good - feedback.bad) / all;
  const positive = all === 0 ? 0 : (feedback.good / all) * 100;

  return (
    <>
      <StatisticsLine text="good" value={feedback.good} />
      <StatisticsLine text="neutral" value={feedback.neutral} />
      <StatisticsLine text="bad" value={feedback.bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={`${positive} %`} />
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticsLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    const newFeedback = {
      ...feedback,
      good: feedback.good + 1,
    };
    setFeedback(newFeedback);
  };
  const handleNeutralClick = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1,
    };
    setFeedback(newFeedback);
  };
  const handleBadClick = () => {
    const newFeedback = {
      ...feedback,
      bad: feedback.bad + 1,
    };
    setFeedback(newFeedback);
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>
      <h2>statistics</h2>
      <div>
        <Statistics feedback={feedback} />
      </div>
    </>
  );
};

export default App;

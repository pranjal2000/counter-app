import "./App.css";
function CounterValue(props) {
  return (
    <div className="counterValue">
      <h5>Counter value</h5>
      <p>{props.count}</p>
    </div>
  );
}

export default CounterValue;

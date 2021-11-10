import "./App.css";
import React, { useState, useEffect } from "react";
import CounterValue from "./CounterValue";

function App() {
  var initialValue = 1;
  const maxValue = 1000;
  const [count, setCount] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCount = () => {
    setLoading(true);
    fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pranjalSingh: count,
        }),
      }
    )
      .then((res) => {
        res.json();
        setLoading(false);
      })
      .catch((err) => console.log("error"));
  };

  function handleChange(count) {
    if (count <= maxValue) {
      setCount(count);
      updateCount();
    }
  }

  useEffect(() => {
    fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          initialValue = parseInt(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="app">
        {loading ? (
          <div className="loader">
            <div></div> <h5>Saving counter value</h5>
          </div>
        ) : null}

        <div className="counter">
          <div>
            <button className="red" onClick={() => handleChange(count - 1)}>
              -
            </button>
          </div>

          <div>
            <input
              type="text"
              name="counter"
              value={count}
              onChange={(e) => handleChange(parseInt(e.target.value))}
            />
          </div>

          <div className="inc">
            <button onClick={() => handleChange(count + 1)}>+</button>
          </div>
        </div>
        <CounterValue count={count}></CounterValue>
      </div>
    );
  }
}

export default App;

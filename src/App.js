import "./App.css";
import React, { useState, useEffect } from "react";
import CounterValue from "./CounterValue";

function App() {
  var initialValue = 1;
  var maxValue = 1000;
  const [count, setCount] = useState(initialValue);
  const [loading, setLoading] = useState(true);
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
        // setLoading(false);
      })
      .catch((err) => console.log("error"));
  };

  function handleChange(cnt) {
    console.log(cnt);
    if (cnt == "" || cnt == null) {
      setCount(0);
      return;
    }

    cnt = parseInt(cnt);
    if (cnt >= count && cnt <= maxValue) {
      setCount(cnt);
      updateCount();
    } else if (cnt <= count && cnt >= initialValue) {
      setCount(cnt);
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
          // setLoading(false);
          initialValue = parseInt(result);
        },
        (error) => {
          // setLoading(false);
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
              onChange={(e) => handleChange(e.target.value)}
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

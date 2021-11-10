import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function CounterValue(props) {
  return (
    <div className="counterValue">
      <h5>Counter value</h5>
      <p>{props.count}</p>
    </div>
  );
}

export default CounterValue;

import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    console.log("Component rendered!");
    renderCount.current += 1;
  });

  const squared = useMemo(() => {
    console.log("Calculating square...");
    return number * number;
  }, [number]);

  const handleAlert = useCallback(() => {
    alert(`Input value is: ${inputRef.current.value}`);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Hooks Example</h2>

      <p>Number: {number}</p>
      <p>Square (useMemo): {squared}</p>
      <button onClick={() => setNumber(number + 1)}>Increase Number</button>

      <hr />

      <h3>Counter (useReducer)</h3>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <hr />

      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={handleAlert}>Show Input (useCallback)</button>
      <p>Render count (useRef): {renderCount.current}</p>
    </div>
  );
}

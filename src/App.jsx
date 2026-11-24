
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setExpression("");
    } else if (value === "DEL") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    } else if (value === "=") {
      try {
        if (!/^[0-9+\-*/.()\s]+$/.test(display)) {
          throw new Error("Invalid expression");
        }

        const answer = Function('"use strict"; return (' + display + ')')();

        if (!Number.isFinite(answer)) throw new Error();

        setExpression(display + " =");
        setDisplay(String(Number(answer.toPrecision(12))));
      } catch {
        setDisplay("Error");
        setExpression("Invalid calculation");
      }
    } else if (value === "±") {
      if (display !== "0" && display !== "Error") {
        setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
      }
    } else if (value === "%") {
      const answer = Number(display) / 100;
      if (Number.isFinite(answer)) setDisplay(String(answer));
    } else {
      if (display === "Error") {
        setDisplay(value);
      } else {
        setDisplay(display === "0" ? value : display + value);
      }
      setExpression("");
    }
  };

  const buttons = [
    "AC", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "±", "0", ".", "="
  ];

  return (
    <div className="calculator">
      <header className="header">
        <h1>Simple Calci</h1>
        <p>Calculate with simplicity</p>
      </header>

      <div className="display">
        <div className="expression">
          {expression || "Ready to calculate"}
        </div>
        <div className="result">{display}</div>
      </div>

      <div className="buttons">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button)}
            className={
              button === "=" ? "equal" :
              ["/", "*", "-", "+"].includes(button) ? "operator" :
              ["AC", "DEL", "%"].includes(button) ? "utility" : ""
            }
          >
            {button === "*" ? "×" : button === "/" ? "÷" : button}
          </button>
        ))}
      </div>

      <footer>Designed by Sirisha P</footer>
    </div>
  );
}

export default App;

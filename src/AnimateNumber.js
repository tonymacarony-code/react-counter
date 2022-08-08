import React, { useState, useEffect, useRef } from "react";

import "./styles.css";

//   100
//-> 100.91

//   1000
//-> 10

const animationDuration = 300;
const animationLag = 100;

export default function AnimateNumber({ value }) {
  const [prevValue, setPrevValue] = useState(value);
  const [diffIndex, setDiffIndex] = useState(0);

  const timeout = useRef(null);
  const timeoutFunc = useRef(null);

  useEffect(() => {
    // flush timeout in case an update comes before the timer fires
    if (timeoutFunc.current) {
      clearTimeout(timeout.current);
      timeoutFunc.current();
    }

    timeoutFunc.current = () => {
      timeoutFunc.current = null;
      timeout.current = null;
      setPrevValue(value);
    };

    // reset value after animation
    timeout.current = setTimeout(
      timeoutFunc.current,
      animationDuration + `${value}`.length * animationLag
    );
  }, [value]);

  useEffect(() => {
    if (value === prevValue) {
      // triggers when the prevValue gets changed in the above useEffect
      return;
    }

    let diffIndex = `${value}`
      .split("")
      .findIndex((v, i) => !`${prevValue}`[i] || v !== `${prevValue}`[i]);

    if (diffIndex === -1) {
      diffIndex = `${value}`.length;
    }

    setDiffIndex(diffIndex);
  }, [value, prevValue]);

  const isAnimating =
    value !== prevValue && `${value}`[diffIndex] !== `${prevValue}`[diffIndex];

  if (!isAnimating) {
    return <div className="wrapper">{prevValue}</div>;
  }

  const commonPart = diffIndex > 0 ? `${value}`.slice(0, diffIndex) : "";
  const prevDiff = `${prevValue}`.slice(diffIndex);
  const nextDiff = `${value}`.slice(diffIndex);
  const restDelay = `${(nextDiff.length - prevDiff.length) * animationLag}ms`;

  return (
    <div className="wrapper">
      {commonPart}
      {nextDiff.split("").map((digit, i) => {
        const animationDelay = `${i * animationLag}ms`;
        return (
          <div
            key={i}
            className="container isAnimating"
            style={{ animationDelay }}
          >
            <div className="nextValue" style={{ animationDelay }}>
              {digit}
            </div>
            <div className="value" style={{ animationDelay }}>
              {prevDiff[i] || ""}
            </div>
          </div>
        );
      })}
      {prevDiff.length > nextDiff.length && (
        <div
          className="container isAnimating"
          style={{ animationDelay: restDelay }}
        >
          <div className="nextValue" style={{ animationDelay: restDelay }}>
            {" "}
          </div>
          <div className="value" style={{ animationDelay: restDelay }}>
            {prevDiff.slice(prevDiff.length - nextDiff.length)}
          </div>
        </div>
      )}
    </div>
  );
}

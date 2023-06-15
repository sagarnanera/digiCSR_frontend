import React, { useState, useRef, useEffect } from "react";
import "./PinInput.css";

function PinInput({ length, onComplete }) {
  const [pin, setPin] = useState("");
  const pinInputRefs = useRef([]);

  useEffect(() => {
    pinInputRefs.current = pinInputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    setPin((prevPin) => {
      const updatedPin = [...prevPin];
      updatedPin[index] = value;
      return updatedPin;
    });

    if (value && index < length - 1) {
      pinInputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !pin[index]) {
      if (index > 0) {
        pinInputRefs.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    if (pin.length === length) {
      // Call the onComplete callback with the pin value when it is complete
      onComplete(pin.join(""));
    }
  }, [onComplete, pin, length]);

  return (
    <div className="pin-input-container">
      {Array(length)
        .fill()
        .map((_, index) => (
          <div className="pin-input-box" key={index}>
            <input
              type="text"
              value={pin[index] || ""}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleBackspace(index, e)}
              ref={(input) => (pinInputRefs.current[index] = input)}
              maxLength={1}
              autoFocus={index === 0}
            />
            {!pin[index] && (
              <div
                className="pin-placeholder"
                onClick={() => pinInputRefs.current[index].focus()}
              >
                o
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default PinInput;

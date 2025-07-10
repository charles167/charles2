import React, { useEffect, useState } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fullText = "reignboxes";
    const splitText = fullText.split("");
    setLetters(
      splitText.map((letter, index) => ({ letter, delay: index * 150 }))
    );
  }, []);
  setTimeout(() => {
    navigate("/store");
  }, 3000);
  return (
    <div className="netflix-container">
      {letters.map((item, index) => (
        <span
          key={index}
          className="netflix-letter"
          style={{ animationDelay: `${item.delay}ms` }}
        >
          {item.letter}
        </span>
      ))}
    </div>
  );
};

export default Landing;

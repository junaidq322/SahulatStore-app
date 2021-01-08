import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Accessories",
      handler: props.actionProvider.Accessories,
      id: 1,
    },
    { 
      text: "Clothing", 
      handler: props.actionProvider.Clothing, 
      id: 2 },
    { 
      text: "Other", 
      handler: props.actionProvider.Other, 
      id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
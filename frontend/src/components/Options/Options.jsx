import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Accessories",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Clothing", handler: () => {}, id: 2 },
    { text: "Other", handler: () => {}, id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";

const config = {
  botName: "SahulatBot",
  initialMessages: [
    createChatBotMessage(`Hello. How may i help you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;
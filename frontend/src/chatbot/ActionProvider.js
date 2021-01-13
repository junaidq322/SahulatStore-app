import { Redirect } from "react-router-dom";
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Hello Customer. Please tell your query");
      this.addMessageToState(message);
    };
  
    Accessories = () => {
      document.location.href='/search/category/Accessories';
      const message = this.createChatBotMessage("Hello Customer. Welcome to Accessories page");
      this.addMessageToState(message);
      
    };
    Clothing = () => {
      document.location.href='/search/category/Clothing';
      const message = this.createChatBotMessage(
        "Fantastic. Here is your quiz. Good luck!",
        {
          widget: "javascriptQuiz",
        }
      );
  
      this.addMessageToState(message);
    };
    
    handleJavascriptQuiz = () => {
      const message = this.createChatBotMessage(
        "Fantastic. Here is your quiz. Good luck!",
        {
          widget: "javascriptQuiz",
        }
      );
  
      this.addMessageToState(message);
    };
  
    Other = () => {
      const message = this.createChatBotMessage("Welcome to others page");
      this.addMessageToState(message);
      window.location.href='/search/category/Others';
    };
  
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  export default ActionProvider;
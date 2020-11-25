class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("hello")) {
        this.actionProvider.greet();
      }
  
      if (lowercase.includes("javascript") || lowercase.includes("js")) {
        this.actionProvider.handleJavascriptQuiz();
      }
      if (lowercase.includes("Clothing") || lowercase.includes("Clothes")) {
        this.actionProvider.handleJavascriptQuiz();
      }
      if (lowercase.includes("Accessories") || lowercase.includes("Clothes")) {
        this.actionProvider.handleJavascriptQuiz();
      }
      if (lowercase.includes("Other") || lowercase.includes("Others")) {
        this.actionProvider.handleJavascriptQuiz();
      }
    }
  }
  
  export default MessageParser;
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("hello") || lowercase.includes("hey")) {
        this.actionProvider.greet();
      }
      if (lowercase.includes("clothing") || lowercase.includes("clothes")) {
        this.actionProvider.Clothing();
      }
      if (lowercase.includes("accessories") || lowercase.includes("Acc")) {
        this.actionProvider.Accessories();
      }
      if (lowercase.includes("others") || lowercase.includes("other")) {
        this.actionProvider.Other();
      }
    }
  }
  
  export default MessageParser;
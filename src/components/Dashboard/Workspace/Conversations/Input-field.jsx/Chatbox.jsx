import { useState } from "react";
import "../Input-field.jsx/Chatbox.css";

function ChatBox({ addMessage, activeUserUid, chatType }) {
  const [message, setMessage] = useState(""); // State to store the message input

  const sendMessage = async () => {
    const apiUrl = "http://206.189.91.54/api/v1/messages";
    const headers = {
      "Content-Type": "application/json",
      "access-token": "Qdia5nwkc9fxtuZVlLU0Yw",
      client: "jBRsjRTAugAWh0DvRCozEw",
      expiry: "1697244413",
      uid: "heygson@gmail.com",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          receiver_id: chatType === "channel" ? activeUserUid : 1, // Use appropriate receiver_id based on chat type
          receiver_class: chatType === "channel" ? "Channel" : "User", // Use appropriate receiver_class based on chat type
          body: message, // Use the message from the state
        }),
      });

      if (response.ok) {
        // Message sent successfully, you can handle the response here if needed
        addMessage(activeUserUid, message); // Call the addMessage function with the message
        setMessage(""); // Clear the message input
      } else {
        // Handle errors here
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="chat-box-wrapper">
      <input
        type="text"
        placeholder={`Message ${chatType === "channel" ? "channel" : "user"}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <span className="send-message-button" onClick={sendMessage}>
        <img src="images/icons8-send-30.png" alt="Send Icon" />
      </span>
    </div>
  );
}

export default ChatBox;

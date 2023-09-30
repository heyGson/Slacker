import "../Channels/Modal.css";
import { useState } from "react";

function Modal({ onClose, addItem }) {
  const [channelName, setChannelName] = useState("");
  const [channelMembers, setChannelMembers] = useState("");

  const handleSaveChannel = () => {
    const requestBody = {
      name: channelName,
      user_ids: [parseInt(channelMembers)], // Convert channelMembers to an integer and put it in an array
    };

    fetch("http://206.189.91.54/api/v1/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": "Qdia5nwkc9fxtuZVlLU0Yw",
        client: "jBRsjRTAugAWh0DvRCozEw",
        expiry: "1697244413",
        uid: "heygson@gmail.com",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          // If the API request is successful, fetch the channel data
          return response.json();
        } else {
          // Handle errors if the API request fails
          throw new Error("Error creating channel");
        }
      })
      .then((data) => {
        // Pass the entire data object received from the API response to addItem
        addItem(data);

        // Close the modal after adding the channel
        onClose();
      })
      .catch((error) => {
        console.error("Error creating channel:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };
  return (
    <div className="modal-main-wrapper">
      <div className="modal-container">
        <div className="input-container">
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <label htmlFor="name">Channel name</label>
        </div>
        <div className="input-container" id="add-member">
          <input
            type="text"
            id="members"
            autoComplete="off"
            value={channelMembers}
            onChange={(e) => setChannelMembers(e.target.value)}
          />
          <label htmlFor="members">Add people to channel</label>
        </div>
        <div>
          <button onClick={handleSaveChannel}>Save Channel</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import "../Workspace/Workspace-component.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SidebarHeader from "./Sidebar/Sidebar Header/Sidebar-header";
import Threads from "./Sidebar/Threads/Threads-component";
import MentionsReactions from "./Sidebar/Mentions & Reactions/Mentions-Reactions-component";
import DraftsSent from "./Sidebar/Drafts & Sent/Drafts-Sent-component";
import Canvas from "./Sidebar/Canvases/Canvas-component";
import Files from "./Sidebar/Files/Files-component";
import More from "./Sidebar/More/More-component";
import Channel from "./Sidebar/Channels/Channel-component";
import DirectMessage from "./Sidebar/Direct Messages/Direct-Message-component";
// import Messages from "./Sidebar/Direct Messages/Messages";
import Modal from "./Sidebar/Channels/Modal";
import ChatBox from "./Conversations/Input-field.jsx/Chatbox";
import Search from "./Conversations/Search-bar/Search";
import SearchResultList from "./Conversations/Search-bar/SearchResultList";
import ChatboxHeader from "./Conversations/Chat Box Header/Chatbox-header";
import Members from "./Sidebar/Channels/Channel-members";
import NewChannel from "./Sidebar/Channels/New-channel-header";

function Workspace({ userEmail }) {
  const [active, setActive] = useState("");
  const [openDropdownChannel, setOpenDropdownChannel] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showChannelInbox, setShowChannelInbox] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedUids, setSelectedUids] = useState([]);
  const [showChatbox, setShowChatbox] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [messages, setMessages] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [activeUserUid, setActiveUserUid] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState("");

  // Load selectedUids from local storage when the component mounts
  useEffect(() => {
    const savedSelectedUids = localStorage.getItem("selectedUids");

    if (savedSelectedUids) {
      setSelectedUids(JSON.parse(savedSelectedUids));
    }
  }, []);

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Function to handle the selection of a user by uid
  const handleUserSelection = (uid) => {
    // Check if the UID is not already in the list
    if (!selectedUids.includes(uid)) {
      const newSelectedUids = [...selectedUids, uid];
      setSelectedUids(newSelectedUids);

      // Save the updated selectedUids to local storage
      localStorage.setItem("selectedUids", JSON.stringify(newSelectedUids));
    }
  };

  // Function to remove a selected UID from the list
  const removeSelectedUid = (uidToRemove) => {
    const newSelectedUids = selectedUids.filter((uid) => uid !== uidToRemove);
    setSelectedUids(newSelectedUids);

    // Save the updated selectedUids to local storage
    localStorage.setItem("selectedUids", JSON.stringify(newSelectedUids));
  };

  // function to add a new channel

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    // Save updated items array to local storage
    localStorage.setItem("items", JSON.stringify([...items, newItem]));
  };

  // function to remove channel

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setShowChannelInbox(false);

    // Save updated items array to local storage
    localStorage.setItem(
      "items",
      JSON.stringify([...items.filter((_, i) => i !== index)])
    );
  };

  // Function to handle clicks and show ChatBox
  const handleShowChatBox = (uid) => {
    setActiveUserUid(uid);
    showChatbox;
    setActive("New Direct Message");
    const userUidString = uid.toString(); // Convert the specific property to a string
    setUserUid(userUidString); // Set the userUid string here
    setShowChatbox(true);
  };

  // Function to add a message to the state
  const addMessage = (uid, newMessage) => {
    const updatedMessages = {
      ...messages,
      [uid]: [...(messages[uid] || []), newMessage],
    };

    setMessages(updatedMessages);

    // Save the updated messages to local storage
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  // Load items from local storage when the component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("items");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    // setDeleteClicked(!deleteClicked); // Toggle the state
    setDeleteClicked(true);
    setShowChatbox(false); // Hide the ChatBox and ChatboxHeader
    setUserUid(null); // Clear the userUid
    // if (!deleteClicked) {
    //   setShowChatbox(false); // Hide the ChatBox and ChatboxHeader
    //   setUserUid(null); // Clear the userUid
    // }
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero to minutes if they are less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  //========================================================================================
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChannelClick = () => {
    setActive("Channel");
    setShowChannelInbox(true);
    // setSelectedChannelName(channelName); // Set the selected channel's name
  };

  const handleNewChannelClick = (channelName) => {
    setActive("newChannel");
    setSelectedChannelName(channelName);
  };

  const handleCanvasClick = () => {
    setActive("Canvas");
  };

  const handleThreadsClick = () => {
    setActive("Threads");
  };

  const handleMentionsReactionsClick = () => {
    setActive("Mentions & Reactions");
  };

  const handleDraftsSentClick = () => {
    setActive("Drafts & Sent");
  };

  const handleFilesClick = () => {
    setActive("Files");
  };

  const handleDirectMessagesClick = () => {
    setActive("Direct Messages");
  };

  return (
    <div className="workspace-container">
      <div className="sidebar-container">
        <SidebarHeader userEmail={userEmail} />
        <div className="threads">
          <ul>
            <li>
              <Threads onClick={handleThreadsClick} name={"Threads"} />
            </li>
            <li>
              <MentionsReactions
                onClick={handleMentionsReactionsClick}
                name={"Mentions & Reactions"}
              />
            </li>
            <li>
              <DraftsSent
                onClick={handleDraftsSentClick}
                name={"Drafts & Sent"}
              />
            </li>
            <li>
              <Canvas onClick={handleCanvasClick} name={"Canvas"} />
            </li>
            <li>
              <Files onClick={handleFilesClick} name={"Files"} />
            </li>
            <li>
              <More />
            </li>
          </ul>
        </div>
        <div className="channel-directmsg-container">
          <ul>
            <li>
              <Channel onClick={handleChannelClick} name={"Channel"} />

              <ul className="new-channels-container">
                {items.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleNewChannelClick(item?.data?.name)} // Pass channel name to the function
                    name={"newChannel"}
                  >
                    {item?.data?.name}
                    <span
                      className="remove-channel"
                      onClick={() => removeItem(index)}
                    >
                      <img
                        src="images/icons8-delete-50.png"
                        alt="Delete Icon"
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span
                onClick={() => setOpenDropdownChannel(!openDropdownChannel)}
              >
                Add channels
              </span>
              {openDropdownChannel ? (
                <ul className="channelDropdown">
                  <li>
                    Add new channel
                    <span
                      id="add-channel-btn"
                      onClick={() => setOpenModal(true)}
                    >
                      +
                    </span>
                  </li>
                  <li>
                    <input
                      type="search"
                      placeholder="Search channel"
                      name="search"
                      autoComplete="off"
                      autoFocus
                    ></input>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              <DirectMessage
                onClick={handleDirectMessagesClick}
                name={"Direct Message"}
              />
            </li>
          </ul>
        </div>

        <div className="selected-uids">
          {selectedUids.map((uid, index) => {
            // Check if the current uid is the same as the logged-in user's UID
            const isCurrentUser = uid === userEmail;

            // Render only if it's not the current user's UID
            if (!isCurrentUser) {
              return (
                <div
                  key={index}
                  className="selected-uid-item"
                  name="New Direct Message"
                  onClick={() => handleShowChatBox(uid)}
                >
                  <span className="user-uid">{uid}</span>
                  <span
                    className="delete-uid"
                    onClick={() => {
                      removeSelectedUid(uid);
                      handleDeleteClick();
                    }}
                  >
                    <img src="images/icons8-delete-50.png" alt="Delete Icon" />
                  </span>
                </div>
              );
            }
            // Return null if it's the current user's UID
            return null;
          })}
        </div>
        <div className="logout">
          <Link to="/">
            <img src="images/icons8-logout-50.png" alt="Delete Icon" />
            <p>Logout</p>
          </Link>
        </div>
      </div>

      {/* =================== Conversations part here ===================================== */}
      <div className="conversations-container">
        <div className="main-conversations-wrapper">
          <div>
            {active === "New Direct Message" &&
              showChatbox &&
              !deleteClicked && (
                <ChatboxHeader
                  userEmail={userEmail}
                  activeUserUid={activeUserUid}
                  userUid={userUid}
                />
              )}
          </div>
          <div>
            {active === "newChannel" && (
              <NewChannel channelName={selectedChannelName} />
            )}
          </div>
          {active === "Direct Messages" && (
            <DirectMessage
              content={<Search setData={setData} />}
              searchResults={
                <SearchResultList
                  results={data}
                  onSelectUser={handleUserSelection}
                />
              }
            />
          )}

          {/* Pass the updateMessageData function as a prop */}
          {active === "Channel" && <Channel content={"This is the channel"} />}
          {active === "newChannel" && showChannelInbox && (
            <Channel content={<ChatBox />} />
          )}
          {active === "Canvas" && <Canvas content={"This is the canvas"} />}
          {active === "Threads" && (
            <Threads content={"This is the threads area"} />
          )}
          {active === "Mentions & Reactions" && (
            <MentionsReactions
              content={"This where the mentions and reactions are"}
            />
          )}
          {active === "Drafts & Sent" && (
            <DraftsSent content={"This where the drafts and sents are"} />
          )}
          {active === "Files" && (
            <DraftsSent
              content={"This where the files you sent or others sent go"}
            />
          )}
          {openModal ? (
            <Modal onClose={handleCloseModal} addItem={addItem} />
          ) : null}

          <div className="chatbox-main-wrapper">
            {/* For direct message */}
            {active === "New Direct Message" &&
              showChatbox &&
              !deleteClicked && (
                <>
                  {/* Render messages for the active user's UID */}
                  {messages[userUid]?.map((message, index) => (
                    <div key={index} className="message-wrapper">
                      <div className="message">
                        <span className="time-stamp">{getCurrentTime()}</span>
                        <br />
                        <p>{message}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
          </div>
        </div>
        <ChatBox addMessage={addMessage} activeUserUid={activeUserUid} />
      </div>
    </div>
  );
}

export default Workspace;

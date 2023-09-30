import "../Chat Box Header/Chatbox-header.css";

function ChatboxHeader({ userUid }) {
  return (
    <div className="chatbox-header-container">
      <div className="user-uid">{userUid}</div>
    </div>
  );
}

export default ChatboxHeader;

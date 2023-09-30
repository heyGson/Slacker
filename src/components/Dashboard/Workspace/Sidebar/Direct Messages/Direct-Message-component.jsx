import "../Direct Messages/Direct-Message-component.css";

function DirectMessage(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div className="directMessage" onClick={handleClick}>
      <div>{props.name}</div>
      <div className="direct-message-search-wrapper">
        {props.content}
        {props.searchResults}
      </div>
    </div>
  );
}

export default DirectMessage;

import "../Channels/Channel-component.css";

function Channel(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div className="channel-container" onClick={handleClick}>
      <div>{props.name}</div>
      <div>{props.content}</div>
      <div>{props.inbox}</div>
    </div>
  );
}

export default Channel;

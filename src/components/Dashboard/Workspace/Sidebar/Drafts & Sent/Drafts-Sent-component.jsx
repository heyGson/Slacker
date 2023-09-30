import "../Drafts & Sent/Drafts-Sent-component.css";

function DraftsSent(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div onClick={handleClick}>
      <div>{props.name}</div>
      <div className="content">
        <h1>{props.content}</h1>
      </div>
    </div>
  );
}

export default DraftsSent;

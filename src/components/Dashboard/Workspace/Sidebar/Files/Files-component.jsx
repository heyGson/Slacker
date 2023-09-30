import "../Files/Files-component.css";

function Files(props) {
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

export default Files;

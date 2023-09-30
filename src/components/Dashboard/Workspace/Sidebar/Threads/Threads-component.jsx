import "../Threads/Threads-component.css";

function Threads(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div onClick={handleClick}>
      <div>{props.name}</div>
      <div>
        <h1>{props.content}</h1>
      </div>
    </div>
  );
}

export default Threads;

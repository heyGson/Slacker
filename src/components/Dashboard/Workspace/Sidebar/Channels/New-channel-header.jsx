import "../Channels/Channel-component.css";

function NewChannel({ channelName }) {
  return (
    <div className="new-channel-wrapper">
      <h3> {channelName}</h3>
    </div>
  );
}

export default NewChannel;

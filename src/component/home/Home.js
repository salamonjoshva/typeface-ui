import Project from "../project/Project";
import Header from "../header/Header";
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8080/ws-message";

const Home = (props) => {
  const URL =
    SOCKET_URL + "?Authorization:Bearer " + localStorage.getItem("user");
  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    alert(msg);
  };

  return (
    <>
      <Header></Header>
      <SockJsClient
        url={URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <div
        style={{
          display: "flex",
          fontSize: "3rem",
        }}
      >
        <div className="flex flex-col">
          <div className="relative m-3 flex flex-wrap mx-auto">
            <Project></Project>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

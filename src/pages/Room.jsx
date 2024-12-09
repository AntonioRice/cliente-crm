import React from "react";
import { useRoomContext } from "../context";

const Room = () => {
  const { selectedRoom } = useRoomContext();

  return <div>Room</div>;
};

export default Room;

import { createContext, useContext, useState } from "react";
import axios from "axios";

const RoomContext = createContext();

export const useRoomContext = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3015/api/v1/rooms");
      setRooms(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching rooms", error);
    }
  };

  const clearSelectedRoom = () => {
    setSelectedRoom(null);
  };

  return <RoomContext.Provider value={{ rooms, setRooms, fetchRooms, selectedRoom, setSelectedRoom, loading, clearSelectedRoom }}>{children}</RoomContext.Provider>;
};

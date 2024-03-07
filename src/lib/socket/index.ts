import { io } from "socket.io-client";
import { SOCKET_URL } from "@/lib/constants";

const socket = io(SOCKET_URL);
socket.on("connect", () => {
  console.log("Connected to the server");
});
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
export default socket;
export const connect = (token: string) => {
  socket.auth = { token };
  socket.connect();
};
export const disconnect = () => {
  socket.disconnect();
};

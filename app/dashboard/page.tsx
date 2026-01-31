"use client";
import MainView from "../components/MainView";

console.log("API_URL:", process.env.NEXT_PUBLIC_WEBSOCKET_URL);
export default function Dashboard() {
  // const [messages, setMessages] = useState<string[]>([]);
  // const [symbols, setSymbols] = useState<any[]>([]);
  // useEffect(() => {
  //   const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
  //   socket.addEventListener("open", () => {
  //     socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  //     socket.send(
  //       JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }),
  //     );
  //     socket.send(
  //       JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }),
  //     );
  //   });
  //   socket.addEventListener("message", (event) => {
  //     console.log("data", event.data);
  //     setMessages((prev) => [event.data]);
  //   });
  //   const pingInterval = setInterval(() => {
  //     console.log("Sending ping");
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify({ type: "ping" }));
  //     }
  //   }, 2000);
  //   return () => {
  //     clearInterval(pingInterval);
  //     socket.close();
  //   };
  // }, []);

  return <MainView />;
}

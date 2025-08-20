import { useState } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      console.log("Sending to backend", input);
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });
      console.log("AI Reply:", res.data);

      const botMsg = { role: "bot", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Error: no response" },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 overflow-scroll">
      <div className=" bg-white rounded-lg p-4 overflow-scroll mt-4 w-2/3">
        <div className="flex flex-col gap-2 ">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-4 mb-4 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <span>{m.content}</span>
            </div>
          ))}
        </div>
        <div className="flex ">
          <input
            className="flex-1 border rounded-lg p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

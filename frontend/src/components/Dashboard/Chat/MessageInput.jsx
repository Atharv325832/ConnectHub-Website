import { useState, useRef, useEffect } from "react";
import socket from "../../../socket";
import { useChannels } from "../../../context/ChannelContext";
import { useAuth } from "../../../context/AuthProvider";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const { selectedChannel } = useChannels();
  const {user}=useAuth();
  const [typingUser, setTypingUser] = useState("");
  const typingTimeout = useRef(null);
  console.log(selectedChannel);
  const handleTyping = (e) => {
    setText(e.target.value);
    if (!selectedChannel) return;
    socket.emit("typing", {
      channelId: selectedChannel._id,
      username: user.username,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        channelId: selectedChannel._id,
      });
    }, 1000);
    
  };

  useEffect(() => {
    socket.on("userTyping", ({ username }) => {
      setTypingUser(username);
    });

    socket.on("userStoppedTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <>
    <div>
      {typingUser && (
    <p className="text-gray-400 text-sm italic px-3">
        {typingUser} is typing...
    </p>
)}
    </div>
    <div className="flex p-4 border-t border-gray-700">
      
      <input
        className="flex-1 bg-[#313338] text-white p-2 rounded"
        placeholder="Type a message..."
        value={text}
        onChange={handleTyping}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        className="ml-2 px-4 bg-blue-600 rounded"
      >
        Send
      </button>
    </div>
    </>
  );
};

export default MessageInput;
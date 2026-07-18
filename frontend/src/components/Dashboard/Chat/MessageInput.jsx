import { useState, useRef, useEffect } from "react";
import socket from "../../../socket";
import { useChannels } from "../../../context/ChannelContext";
import { useAuth } from "../../../context/AuthProvider";
import api from "../../../services/api";

const MessageInput = ({ onSend, replyMessage, setReplyMessage }) => {
  const [attachment, setAttachment] = useState(null);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [uploading, setUploading] = useState(false);

  const { selectedChannel } = useChannels();
  const { user } = useAuth();

  const fileInputRef = useRef(null);
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

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      setUploading(true);

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAttachment({
        url: res.data.url,
        public_id: res.data.public_id,
        name: res.data.name,
        type: res.data.type,
        size: res.data.size,
      });
      setUploading(false);

    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !attachment) return;

    onSend({
      content: text,
      replyTo: replyMessage?._id,
      attachments: attachment ? [attachment] : []
    });
    setText("");
    setReplyMessage(null);
    setAttachment(null);
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      {attachment && (
        <div className="mb-3 rounded-lg bg-gray-800 p-3 w-fit">
          {attachment.type.startsWith("image/") ? (
            <img
              src={attachment.url}
              alt={attachment.name}
              className="max-w-[220px] max-h-[220px] rounded-lg mb-2 object-cover"
            />
          ) : (
            <div className="text-5xl mb-2">📄</div>
          )}

          <div className="flex items-center justify-between gap-3">
            <span className="text-white text-sm truncate max-w-[180px]">
              {attachment.name}
            </span>

            <button
              onClick={() => {
                setAttachment(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="text-red-400 hover:text-red-600 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div>
        {typingUser && (
          <p className="text-gray-400 text-sm italic px-3">
            {typingUser} is typing...
          </p>
        )}
      </div>
      <div className="flex p-4 border-t border-gray-700">
        <button
          onClick={() => fileInputRef.current.click()}
          className="mr-2 px-3 bg-gray-700 rounded"
        >
          📎
        </button>
        {replyMessage && (
          <div className="bg-gray-800 p-2 rounded mb-2">
            <p>
              Replying to <strong>{replyMessage.sender.username}</strong>
            </p>

            <p>{replyMessage.content}</p>

            <button onClick={() => setReplyMessage(null)}>
              ✕
            </button>
          </div>
        )}

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
          {uploading ? "Uploading..." : "Send"}
        </button>
      </div>
    </>
  );
};

export default MessageInput;
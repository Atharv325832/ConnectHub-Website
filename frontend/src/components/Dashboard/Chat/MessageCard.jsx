import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { useMessages } from "../../../context/MessageContext";
import api from "../../../services/api";

const MessageCard = ({ message, onReply }) => {
  console.log(message);
  console.log("Reactions:", message.reactions);

  const [showPicker, setShowPicker] = useState(false);
  const emojis = ["👍", "❤️", "😂", "🎉", "🔥", "😢"];
  const { user } = useAuth();
  const { editMessage, deleteMessage } = useMessages();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.content);

  const saveEdit = async () => {
    try {
      await editMessage(message._id, editedText);

      setIsEditing(false);

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === message._id
            ? { ...msg, content: editedText, edited: true }
            : msg
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReaction = async (emoji) => {
    await reactToMessage(message._id, emoji);

    setShowPicker(false);
  };

  const reactToMessage = async (messageId, emoji) => {
    await api.patch(`/messages/${messageId}/reaction`, {
      emoji
    });
  };


  const handleDelete = async (id) => {
    console.log("Delete clicked:", id);

    try {
      await deleteMessage(id);
    } catch (err) {
      console.log(err);
    }
  };

  const isMe = message.sender._id === user._id;

  return (
    <div
      id={`message-${message._id}`}
      className={`flex mb-4
       ${isMe ? "justify-end" : "justify-start"}`}>

      <div className={`relative group flex gap-3 max-w-[70%] ${isMe ? "flex-row-reverse" : ""}`}>

        <img
          src={message.sender.avatar}
          alt={message.sender.username}
          className="w-10 h-10 rounded-full"
        />
      

        {/* Hover toolbar */}
        <div
          className={`absolute ${showPicker ? "flex" : "hidden group-hover:flex"
            } items-center gap-2 bg-gray-800 text-white rounded-lg px-2 py-1 shadow-md
  ${isMe ? "left-12 -top-3" : "right-12 -top-3"}`}
        >
          <button onClick={() => onReply(message)}>↩</button>

          {isMe && (
            <>
              <button onClick={handleEdit}>✏️</button>
              <button onClick={() => handleDelete(message._id)}>🗑️</button>
            </>
          )}

          <div className="relative">
            <button
              onClick={() => setShowPicker((prev) => !prev)}
            >
              😊
            </button>

            {showPicker && (
              <div className="absolute bottom-full mt-2 right-0 flex gap-2 bg-gray-800 rounded-lg p-2 shadow-lg z-50">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="text-xl hover:scale-125 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>



        {/* Message bubble */}

        <div
          className={`rounded-2xl px-4 py-2 ${isMe
            ? "bg-green-500 text-white rounded-br-sm"
            : "bg-white text-black rounded-bl-sm"
            }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {message.sender.username}
            </span>

            <span
              className={`text-xs ${isMe ? "text-green-100" : "text-gray-500"
                }`}
            >
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>

          {isEditing ? (
            <input
              autoFocus
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveEdit();
                }

                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditedText(message.content);
                }
              }}
              className="w-full rounded bg-gray-700 px-3 py-2 text-white outline-none"
            />
          ) : (
            <>
              {message.deleted ? (
                <p className="italic text-gray-400">
                  This message was deleted.
                </p>
              ) : (
                <>
                  {message.replyTo && (
                    <div className="mb-2 rounded-md border-l-4 border-gray-400 bg-black/10 px-3 py-2"
                      onClick={() => {
                        const element = document.getElementById(
                          `message-${message.replyTo._id}`
                        );

                        if (!element) return;

                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });

                        element.classList.add("bg-yellow-100");

                        setTimeout(() => {
                          element.classList.remove("bg-yellow-100");
                        }, 800);
                      }}>
                      <p className="text-xs font-semibold">
                        ↳ {message.replyTo.sender.username}
                      </p>

                      <p className="truncate text-xs opacity-70">
                        {message.replyTo.content}
                      </p>
                    </div>
                  )}

                  <p className="break-words">
                    {message.content}

                    {message.edited && (
                      <span className="ml-2 text-xs opacity-70">
                        (edited)
                      </span>
                    )}
                  </p>

                  {message.attachments?.map((file) => (
                    <div key={file.url} className="mt-2">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="max-w-xs rounded-lg"
                        />
                      ) : (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          📎 {file.name}
                        </a>
                      )}
                    </div>
                  ))}

                  {message.reactions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.reactions.map((reaction) => (
                        <button
                          key={reaction.emoji}
                          className="px-2 py-1 rounded-full bg-gray-700 text-white text-sm"
                        >
                          {reaction.emoji} {reaction.users.length}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default MessageCard;
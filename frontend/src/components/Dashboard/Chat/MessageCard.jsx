import { useAuth } from "../../../context/AuthProvider";

const MessageCard = ({ message }) => {
  const { user } = useAuth();

  const isMe = message.sender._id === user._id;

  return (
    <div className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-3 max-w-[70%] ${
          isMe ? "flex-row-reverse" : ""
        }`}
      >
        <img
          src={message.sender.avatar}
          alt={message.sender.username}
          className="w-10 h-10 rounded-full"
        />

        <div
          className={`rounded-2xl px-4 py-2 ${
            isMe
              ? "bg-green-500 text-white rounded-br-sm"
              : "bg-white text-black rounded-bl-sm"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {message.sender.username}
            </span>

            <span
              className={`text-xs ${
                isMe ? "text-green-100" : "text-gray-500"
              }`}
            >
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <p className="break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
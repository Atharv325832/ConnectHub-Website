import { useState } from "react";
import { useChannels } from "../../../context/ChannelContext";
import { useServers } from "../../../context/ServerContext";

export default function CreateChannelModal({ show, close }) {
  const { createChannel } = useChannels();
  const { selectedServer } = useServers();
  const [name, setName] = useState("");
  const [type, setType] = useState("text");

  if (!show) return null;

  const handleClose = () => {
    setName("");
    setType("text");
    close();
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createChannel({ name: name.trim(),
         type ,
         Server: selectedServer._id,
         topic: "",
         position: 0,});
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[440px] rounded-xl bg-[#313338] p-6">
        <h2 className="text-center text-2xl font-bold text-white">
          Create Channel
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Choose a channel type and give it a name.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setType("text")}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
              type === "text" ? "bg-indigo-600" : "bg-[#1e1f22] hover:bg-[#2b2d31]"
            }`}
          >
            <span className="text-xl">#</span>
            <div>
              <div className="font-medium text-white">Text Channel</div>
              <div className="text-xs text-gray-300">
                Send messages, links, and files.
              </div>
            </div>
          </button>

          <button
            onClick={() => setType("voice")}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
              type === "voice" ? "bg-indigo-600" : "bg-[#1e1f22] hover:bg-[#2b2d31]"
            }`}
          >
            <span className="text-xl">🔊</span>
            <div>
              <div className="font-medium text-white">Voice Channel</div>
              <div className="text-xs text-gray-300">
                Talk live with members.
              </div>
            </div>
          </button>
        </div>

        <input
          type="text"
          placeholder={type === "text" ? "new-channel" : "Lounge"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-5 w-full rounded-lg bg-[#1e1f22] p-3 text-white outline-none"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={handleClose} className="text-gray-300 hover:text-white">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
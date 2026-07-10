import { useState, useRef, useEffect } from "react";
import { useChannels } from "../../../context/ChannelContext";
import ChannelRenameModal from "../Modals/ChannelRenameModal";
import InviteModal from "../Modals/InviteModal"

export default function Home({ channelModal, user, server, onInvite }) {
  const { channels, deleteChannel, rename } = useChannels();

  const [active, setActive] = useState(channels[0]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingChannel, setEditingChannel] = useState(null);

  const textChannels = channels.filter((c) => c.type === "text");
  const voiceChannels = channels.filter((c) => c.type === "voice");
  const menuRef = useRef(null);


  const handleDelete = async (channelId) => {
    try {
      await deleteChannel(channelId);
      setOpenMenuId(null);

      if (active?._id === channelId) {
        setActive(null);
      }
    } catch (error) {
      console.error("Failed to delete channel:", error);
    }
  };

  const handleRename = async (channelId, name) => {
    try {
      await rename(channelId, name);
      setEditingChannel(null);
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to rename channel:", error);
    }
  }

  useEffect(() => {
    function handleMouseDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("click", handleMouseDown);
    return () => document.removeEventListener("click", handleMouseDown);
  }, []);

  return (
    <div className="flex min-h-100vh bg-slate-950 text-slate-100 ">

      <aside className="w-72 border-r border-slate-800 p-4">

        <div className="mb-6 rounded-xl bg-slate-900 p-4">

          <h1 className="text-xl font-bold">{user?.username}</h1>

          <p className="text-sm text-slate-400"> X members · Y online</p>
        </div>

        <div className="mb-4 flex gap-2">

          <button onClick={channelModal} className="rounded bg-indigo-600 px-3 py-2 text-sm">
            + Channel
          </button>

          <button onClick={onInvite} className="rounded border border-slate-700 px-3 py-2 text-sm">
            Invite
          </button>
        </div>

        <h2 className="mb-2 text-xs font-semibold uppercase text-slate-500">
          Text Channels
        </h2>

        {textChannels.map((c) => (
          <div
            key={c._id}
            className={`group relative mb-1 flex items-center rounded-lg ${active?._id === c._id ? "bg-indigo-600" : "hover:bg-slate-900"
              }`}
          >
            <button
              onClick={() => setActive(c)}
              className="flex-1 px-3 py-2 text-left"
            >
              # {c.name}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === c._id ? null : c._id);
              }}
              className="mr-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-700"
            >
              ⋮
            </button>
            {openMenuId === c._id && (
              <div ref={menuRef} className="absolute right-2 top-full z-10 mt-1 w-40 rounded-md border border-slate-700 bg-slate-800 shadow-lg">
                <button
                  onClick={() => {
                    setEditingChannel(c);
                    setNewName(c.name);
                  }}
                  className="block w-full px-3 py-2 text-left hover:bg-slate-700"
                >
                  Rename
                </button>

                <button className="block w-full px-3 py-2 text-left hover:bg-slate-700">
                  Invite Friends
                </button>

                <button onClick={() => handleDelete(c._id)} className="block w-full px-3 py-2 text-left text-red-400 hover:bg-slate-700">
                  Delete Channel
                </button>
              </div>
            )}
            <ChannelRenameModal
              open={!!editingChannel}
              channel={editingChannel}
              onClose={() => setEditingChannel(null)}
              onSave={handleRename}
            />
          </div>
        ))}

        <h2 className="mt-4 mb-2 text-xs font-semibold uppercase text-slate-500">
          Voice Channels
        </h2>

        {voiceChannels.map((c) => (
          <div
            key={c._id}
            className={`group relative mb-1 flex items-center rounded-lg ${active?._id === c._id ? "bg-indigo-600" : "hover:bg-slate-900"
              }`}
          >
            <button
              onClick={() => setActive(c)}
              className="flex-1 px-3 py-2 text-left"
            >
              {c.name}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === c._id ? null : c._id);
              }}
              className="mr-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-700"
            >
              ⋮
            </button>

            {openMenuId === c._id && (
              <div ref={menuRef} className="absolute right-2 top-full z-10 mt-1 w-40 rounded-md border border-slate-700 bg-slate-800 shadow-lg">
                <button
                  onClick={() => {
                    setEditingChannel(c);
                    setNewName(c.name);
                  }}
                  className="block w-full px-3 py-2 text-left hover:bg-slate-700"
                >
                  Rename
                </button>
                <button className="block w-full px-3 py-2 text-left hover:bg-slate-700">
                  Invite Friends
                </button>
                <button onClick={() => handleDelete(c._id)} className="block w-full px-3 py-2 text-left text-red-400 hover:bg-slate-700">
                  Delete Channel
                </button>
              </div>
            )}
            <ChannelRenameModal
              open={!!editingChannel}
              channel={editingChannel}
              onClose={() => setEditingChannel(null)}
              onSave={handleRename}
            />
          </div>
        ))}
      </aside>
    </div>
  );
}
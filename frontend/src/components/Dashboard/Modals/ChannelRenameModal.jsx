import { useEffect, useState } from "react";

export default function ChannelRenameModal({ open, channel, onClose, onSave }) {
    const [name, setName] = useState("");
    useEffect(() => {
        if (channel) {
            setName(channel.name);
        }
    }, [channel]);

    if (!open || !channel) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
            <div className="bg-slate-900 p-6 rounded-lg w-96">

                <h2 className="text-xl font-bold mb-4">
                    Rename Channel
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded bg-slate-800 p-2"
                />

                <div className="mt-5 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-slate-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(channel._id, name)}
                        className="bg-indigo-600 px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
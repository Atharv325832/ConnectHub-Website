import { useState } from "react";

export default function InviteModal({ server, onClose }) {
  const [copied, setCopied] = useState(false);

  const inviteLink = `${window.location.origin}/invite/link/${server.inviteCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-[#313338] shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3f4147] p-5">
          <div>
            <h2 className="text-xl font-bold text-white">
              Invite Friends
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Invite people to join{" "}
              <span className="font-semibold text-white">
                {server.name}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
              Invite Link
            </p>

            <div className="flex rounded-lg overflow-hidden bg-[#1e1f22] border border-[#404249]">
              <input
                readOnly
                value={inviteLink}
                className="flex-1 bg-transparent px-4 py-3 text-white outline-none"
              />

              <button
                onClick={handleCopy}
                className="bg-indigo-600 px-4 text-white hover:bg-indigo-500"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-[#1e1f22] p-4">
            <p className="text-xs uppercase text-gray-400">
              Invite Code
            </p>

            <p className="mt-2 font-mono text-lg text-white">
              {server.inviteCode}
            </p>
          </div>

          <p className="text-sm text-gray-400">
            Anyone with this invite link can join your server.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#3f4147] p-5">
          <button
            onClick={onClose}
            className="rounded-md bg-[#404249] px-5 py-2 text-white hover:bg-[#4b4d55]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


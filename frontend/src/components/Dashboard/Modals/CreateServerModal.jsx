import { useState } from "react";
import { useServers } from "../../../context/ServerContext";

const CreateServerModal = ({ show, close }) => {
    const { createServer } = useServers();
    const [serverName, setServerName] = useState("");
    const [icon, setIcon] = useState(null);
    const [preview, setPreview] = useState("");

    const handleIcon = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIcon(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setServerName("");
        setIcon(null);
        setPreview("");
    };

    const handleClose = () => {
        resetForm();
        close();
    };

    const handleCreate = async () => {
        if (!serverName.trim()) return;
        try {
            const formData = new FormData();
            formData.append("name", serverName);
            if (icon) {
                formData.append("icon", icon);
            }
            await createServer(formData);
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-[#313338] w-[430px] rounded-xl p-6">

                <h2 className="text-white text-2xl font-bold text-center">
                    Create Your Server
                </h2>

                <p className="text-gray-400 text-center text-sm mt-2">
                    Give your new server a personality.
                </p>

                <div className="flex justify-center mt-6">

                    <label className="cursor-pointer">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-500"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-[#1e1f22] border-2 border-dashed border-gray-500 flex items-center justify-center text-3xl text-gray-400 hover:border-white">
                                +
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleIcon}
                        />
                    </label>
                </div>
                <input
                    type="text"
                    placeholder="Server Name"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="mt-6 w-full bg-[#1e1f22] text-white p-3 rounded-lg outline-none"
                />

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={handleClose}
                        className="text-gray-300 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateServerModal;
import useInviteRequests from "../../Hooks/useInvitesRequests";
import { useEffect } from "react";

const RecievedModal = () => {
const {
    received,
    fetchReceived,
    acceptInvite,
    rejectInvite,
} = useInviteRequests();

useEffect(() => {
    fetchReceived();
}, []);


return (
    <>
        {received.map((invite) => (
            <div key={invite._id}>
                <p>{invite.sender.username}</p>

                <button
                    onClick={() => acceptInvite(invite._id)}
                >
                    Accept
                </button>

                <button
                    onClick={() => rejectInvite(invite._id)}
                >
                    Reject
                </button>
            </div>
        ))}
    </>
);
};

export default RecievedModal;
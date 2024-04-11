import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();

  const { authUser } = useAuthContext();

  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // const timeStamp = message.updatedAt.substr(11, 5);
  const formattedTime = extractTime(message.createdAt);

  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className=" chat-image avatar">
        <div className=" w-10 rounded-full">
          <img src={profilePic} alt="icon" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white overflow-hidden max-w-[15rem] ${bubbleBgColor} ${shakeClass} whitespace-normal break-words`}
      >
        {message.message}
      </div>
      <div className=" chat-footer  text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

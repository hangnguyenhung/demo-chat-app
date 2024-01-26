import MySocket from "@/service/socket";
import { Button } from "@mui/material";
import { useState } from "react";

interface TypeBoxProps {
    selectedUser: any;
}

const TypeBox = (props: TypeBoxProps) => {
    const { selectedUser } = props;

    const [message, setMessage] = useState("");
    const socketInstance = MySocket.getInstance();

    const onSendMessage = () => {
        socketInstance.onMessage(message);
        setMessage("");
    };
    return (
        <div className="flex gap-1">
            {selectedUser && (
                <>
                    <textarea
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        className="w-full h-24 border-solid border-2 border-gray-300 rounded p-2"
                        placeholder="Enter your message!"></textarea>
                    <Button
                        onClick={onSendMessage}
                        className="bg-purple-700 text-white rounded p-2 h-max">
                        Gửi
                    </Button>
                </>
            )}
        </div>
    );
};

export default TypeBox;

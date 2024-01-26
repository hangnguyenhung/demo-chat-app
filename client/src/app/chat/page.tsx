"use client";
import React, { useState, useEffect, useRef, use } from "react";
import MySocket from "../../service/socket";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/sideBar";
import ChatHistory from "@/components/chatHistory";
import TypeBox from "@/components/typeBox";

const socketInstance = MySocket.getInstance();

const Chat = () => {
    const userName = useSearchParams().get("userName");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState<any>();
    const connectionRef = useRef<boolean>(false);

    const handleUsernameSelection = () => {
        if (!userName) return;
        socketInstance.onUsernameSelection(userName);
        const callback = (data: any[]) => {
            setUsers([...data] as any);
        };
        socketInstance.setUserDataChange(callback);
    };

    const handleSocketConnection = () => {
        if (!connectionRef.current) {
            const sessionID = localStorage.getItem("sessionID");
            if (sessionID) {
                socketInstance.connectToSocket(sessionID);
            }
        }
    };

    const handleSelectedUserChange = () => {
        if (selectedUser) {
            socketInstance.setSelectedUser(selectedUser.userID);
        }
    };

    useEffect(() => {
        handleUsernameSelection();
    }, [userName]);

    useEffect(() => {
        handleSocketConnection();
    }, [connectionRef]);

    useEffect(() => {
        handleSelectedUserChange();
    }, [selectedUser]);

    return (
        <div className="grid grid-flow-col h-screen">
            <div className="bg-gray-400 flex flex-col">
                {users && (
                    <SideBar
                        users={users}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                    />
                )}
            </div>
            <div className="flex flex-col col-span-4">
                <div className="p-6 border-solid border-b-2">
                    {selectedUser ? (
                        <div className="flex gap-2 items-center">
                            <div className="rounded h-2 w-2 bg-green-500"></div>
                            <div>{selectedUser.username}</div>
                        </div>
                    ) : (
                        <div>Demo chat app!</div>
                    )}
                </div>
                <div className="p-6 flex flex-col h-full">
                    <ChatHistory users={users} selectedUser={selectedUser} />
                    <TypeBox selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    );
};

export default Chat;

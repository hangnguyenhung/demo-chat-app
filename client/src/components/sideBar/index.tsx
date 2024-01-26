// side bar

import { Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

//interface
interface SideBarProps {
    users: any[];
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
    selectedUser: any;
}

const SideBar = (props: SideBarProps) => {
    const { users, selectedUser, setSelectedUser } = props;
    const [userList, setUserList] = useState<any[]>();
    const [profile, setProfile] = useState<any>();

    const router = useRouter();

    useEffect(() => {
        if (!users) return;
        let _userList: any[] = [];
        users.map((user: any) => {
            if (user.self) {
                setProfile(user);
            } else {
                _userList.push(user);
            }
        });

        setUserList(_userList);
    }, [users]);

    const onLogout = () => {
        localStorage.removeItem("sessionID");
        router.push("/");
    };

    console.log("userList", userList);

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 px-3 py-5 justify-between">
                <div className="text-white text-2xl  font-semibold">
                    {profile?.username}
                </div>
                <Button color="secondary" onClick={onLogout}>
                    Đăng xuất
                </Button>
            </div>
            <Divider />
            {userList?.map((user: any) => {
                return (
                    <div key={user.userID} className="flex gap-2 items-center">
                        <button
                            className={`flex flex-col gap-1 p-3 w-full ${
                                selectedUser &&
                                selectedUser.userID === user.userID &&
                                "bg-gray-500"
                            }`}
                            onClick={() => setSelectedUser(user)}>
                            <div className="text-white">
                                {user.username} {user.self && "(Me)"}
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="rounded h-2 w-2 bg-green-500"></div>
                                <div>online</div>
                            </div>
                            {user.hasNewMessages && (
                                <div className=" text-red-600 text-sm p-2">
                                    New
                                </div>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default SideBar;

import { io } from "socket.io-client";

class MySocket {
    private static instance: MySocket | null = null;

    public socket: any;
    public URL: string;
    private onDataChange: (users: string[]) => void = () => {};
    public users: any[] = [];
    public selectedUser: any = null;

    private constructor() {
        this.URL = "http://localhost:3001";
        this.socket = io(this.URL, { autoConnect: false });
        this.setupSocketListeners();
    }

    public static getInstance(): MySocket {
        if (!MySocket.instance) {
            MySocket.instance = new MySocket();
        }
        return MySocket.instance;
    }

    private setupSocketListeners() {
        this.socket.onAny((event: any, ...args: any) => {});
        this.socket.on("connect_error", (err: any) => {
            if (err.message === "invalid username") {
            }
        });

        this.socket.on("users", (users: any) => {
            // set self property to the user
            users.forEach((user: any) => {
                user.self = user.userID === this.socket.userID;
            });
            this.users = users;
            this.onDataChange(this.users);
        });

        // listen to new users
        this.socket.on("user connected", (userData: any) => {
            let isUserAlreadyExist = false;
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
                if (user.userID === userData.userID) {
                    user.connected = true;
                    isUserAlreadyExist = true;
                    break;
                }
            }
            if (!isUserAlreadyExist) {
                this.users.push(userData);
            }
            this.onDataChange(this.users);
        });

        // listen to private messages
        this.socket.on("private message", ({ content, from }: any) => {
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
                if (!user.messages) {
                    user["messages"] = [];
                }
                if (user.userID === from) {
                    user.messages.push({
                        content,
                        fromSelf: false,
                    });
                    if (user !== this.selectedUser) {
                        user.hasNewMessages = true;
                    }
                    break;
                }
            }
            this.onDataChange(this.users);
        });

        this.socket.on("connect", () => {
            this.users.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
        });

        this.socket.on("user disconnected", (userID: string) => {
            this.users.forEach((user) => {
                if (user.userID === userID) {
                    user.connected = false;
                }
            });
            this.onDataChange(this.users);
        });

        // get session and user details on connection
        this.socket.on("session", ({ sessionID, userID }: any) => {
            this.socket.auth = { sessionID };
            localStorage.setItem("sessionID", sessionID);
            this.socket.userID = userID;
        });
    }

    onUsernameSelection(username: string) {
        this.socket.auth = { username };
        this.socket.connect();
    }

    // set callback to update the users list
    setUserDataChange(callback: (users: string[]) => void) {
        this.onDataChange = callback;
    }

    setSelectedUser(userID: string) {
        const user = this.users.find((user) => user.userID === userID);
        this.selectedUser = user;
    }

    onJoinGroup(groupName: string) {
        this.socket.emit("join group", {
            groupName,
            userID: this.socket.userID,
        });
    }

    onMessage(content: string) {
        if (this.selectedUser) {
            this.socket.emit("private message", {
                content,
                to: this.selectedUser.userID,
                from: this.socket.userID,
            });
            if (this.selectedUser && !this.selectedUser.messages) {
                this.selectedUser["messages"] = [];
            }
            this.selectedUser.messages.push({
                content,
                fromSelf: true,
            });
        }
    }

    connectToSocket(sessionID: string) {
        this.socket.auth = { sessionID };
        this.socket.connect();
    }

    public static clearInstance() {
        MySocket.instance = null;
    }
}

export default MySocket;

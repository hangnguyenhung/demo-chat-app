interface Props {
    selectedUser: any;
    users: any;
}

const ChatHistory = (props: Props) => {
    const { selectedUser, users } = props;

    return (
        <div className="flex-1 p-2">
            {selectedUser &&
                users &&
                users.map((user: any, index: number) => {
                    if (user.userID === selectedUser.userID) {
                        return (
                            <div key={index}>
                                {user.messages &&
                                    user.messages.map(
                                        (message: any, _index: any) => {
                                            return (
                                                <div
                                                    key={_index}
                                                    className={`flex flex-col gap-1 mb-6 ${
                                                        message.fromSelf
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}>
                                                    <div>
                                                        {message.fromSelf
                                                            ? "(Me)"
                                                            : selectedUser.username}
                                                    </div>
                                                    <div>{message.content}</div>
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                        );
                    }
                })}
        </div>
    );
};

export default ChatHistory;

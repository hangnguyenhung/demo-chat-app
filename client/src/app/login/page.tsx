"use client";

import {
    Avatar,
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let _userName = data.get("userName");
        let _password = data.get("password");
        if (_userName === "") {
            alert("Vui lòng nhập tên người dùng");
            return;
        }
        if (_password === "") {
            alert("Vui lòng nhập mật khẩu");
            return;
        }

        router.push(`/chat?userName=${_userName}`);
    };

    return (
        <div className="h-screen flex flex-col bg-slate-100">
            <Typography className="font-semibold text-center mt-40 text-4xl">
                Demo Chat app
            </Typography>
            <Box className="flex flex-col items-center h-full justify-center mb-40">
                <Avatar className="mb-4" />
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="userName"
                        label="Tên đăng nhập"
                        name="userName"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        className="w-full px-4 py-6 mt-4 bg-slate-200">
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

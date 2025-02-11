"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoogleAuthCallback() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/"; // Chuyển về trang chính
                }
            })
            .catch(console.error);
        }
    }, [code]);

    return <p>Đang xử lý đăng nhập...</p>;
}

export function Dashboard() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
            window.location.href = "/"; // Nếu chưa đăng nhập, chuyển đến login
        } else {
            setToken(savedToken);
        }
    }, []);

    if (!token) return <p>Đang kiểm tra đăng nhập...</p>;

    return <h1>Chào mừng bạn đến Dashboard!</h1>;
}

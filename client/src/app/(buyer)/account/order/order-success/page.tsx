"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const transactionStatus = searchParams.get("vnp_TransactionStatus");
    const transactionId = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");
    const payDate = searchParams.get("vnp_PayDate");

    const isSuccess = transactionStatus === "00"; // 00 là giao dịch thành công

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                {isSuccess ? (
                    <>
                        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                        <h1 className="text-xl font-semibold mt-4">Thanh toán thành công!</h1>
                        <p className="text-gray-600">Mã giao dịch: <strong>{transactionId}</strong></p>
                        <p className="text-gray-600">Số tiền: <strong>{Number(amount) / 100} VND</strong></p>
                        <p className="text-gray-600">Thời gian: <strong>{payDate}</strong></p>
                    </>
                ) : (
                    <>
                        <XCircle className="text-red-500 w-16 h-16 mx-auto" />
                        <h1 className="text-xl font-semibold mt-4 text-red-600">Thanh toán thất bại</h1>
                        <p className="text-gray-600">Vui lòng kiểm tra lại hoặc thử lại sau.</p>
                    </>
                )}
                <div className="mt-6 flex gap-4 justify-center">
                    <Button onClick={() => router.push("/")}>Về trang chủ</Button>
                    {!isSuccess && <Button variant="outline" onClick={() => router.back()}>Thử lại</Button>}
                </div>
            </div>
        </div>
    );
}

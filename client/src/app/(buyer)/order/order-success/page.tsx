"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const transactionStatus = searchParams.get("vnp_TransactionStatus");
    const transactionId = searchParams.get("vnp_TxnRef");
    const amount = searchParams.get("vnp_Amount");
    const payDate = searchParams.get("vnp_PayDate");
    const cancelStatus = searchParams.get("vnp_CancelStatus"); // Mã trạng thái hủy giao dịch

    const isSuccess = transactionStatus === "00"; // 00 là giao dịch thành công
    const isCancelled = cancelStatus === "1"; // Giả sử VNPay trả về "1" khi giao dịch bị hủy

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-fit">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center absolute top">
                {isSuccess ? (
                    <>
                        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                        <h1 className="text-xl font-semibold mt-4">Payment Successful!</h1>
                        <p className="text-gray-600">Transaction ID: <strong>{transactionId}</strong></p>
                        <p className="text-gray-600">Amount: <strong>{Number(amount) / 100} VND</strong></p>
                        <p className="text-gray-600">Payment Date: <strong>{payDate}</strong></p>
                    </>
                ) : isCancelled ? (
                    <>
                        <Info className="text-yellow-500 w-16 h-16 mx-auto" />
                        <h1 className="text-xl font-semibold mt-4 text-yellow-600">Payment Cancelled</h1>
                        <p className="text-gray-600">Your transaction was cancelled.</p>
                        <p className="text-gray-600">Transaction ID: <strong>{transactionId}</strong></p>
                    </>
                ) : (
                    <>
                        <XCircle className="text-red-500 w-16 h-16 mx-auto" />
                        <h1 className="text-xl font-semibold mt-4 text-red-600">Payment Failed</h1>
                        <p className="text-gray-600">Please check again or try again later.</p>
                    </>
                )}
                <div className="mt-6 flex gap-4 justify-center">
                    <Button onClick={() => router.push("/")}>Back to Homepage</Button>
                    {!isSuccess && <Button variant="outline" onClick={() => router.back()}>Back to Previous</Button>}
                </div>
            </div>
        </div>
    );
}

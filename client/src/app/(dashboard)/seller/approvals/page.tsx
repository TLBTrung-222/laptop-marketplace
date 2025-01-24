import { ApprovalTable } from "@/features/approvals/components/approval-table";

export default function ApprovalsPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Approvals
                </h1>
            </div>
            <ApprovalTable />
        </>
    );
}

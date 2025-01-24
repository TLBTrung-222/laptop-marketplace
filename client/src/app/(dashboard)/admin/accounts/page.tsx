import { AccountTable } from "@/features/accounts/components/account-table";

export default function AccountsPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Accounts
                </h1>
            </div>
            <AccountTable />
        </>
    );
}

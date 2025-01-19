import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Header } from "@/features/admin/components/header";
import { Sidebar } from "@/features/admin/components/sidebar";

type Props = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
    return (
        <>
            <div className="flex w-full">
                <Sidebar />
                <div className="flex w-full flex-col pl-16 md:pl-48 lg:pl-64">
                    <Header />
                    <div className="h-screen overflow-y-auto bg-gray-50 px-6 py-8 pt-20">
                        <BreadcrumbNav />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

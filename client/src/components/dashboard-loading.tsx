import { TableSkeleton } from "./table-skeleton";
import { Skeleton } from "./ui/skeleton";

export const DashboardSkeleton = () => {
    return (
        <div className="flex h-screen w-full">
            <div className="flex h-screen w-[76px] flex-col items-center gap-4 border-r border-gray-200 bg-white p-2 shadow-sm md:w-[190px] lg:w-[255px] lg:p-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full min-w-10" />
                ))}
            </div>
            <div className="flex w-full flex-col">
                <div className="flex h-[60px] w-full items-center justify-end border-b border-gray-200 bg-white p-2 shadow-sm">
                    <Skeleton className="h-full w-[150px] rounded-lg" />
                </div>

                <div className="px-6 pt-4">
                    <Skeleton className="mb-2 h-5 w-40 rounded-md" />
                    <Skeleton className="mb-4 h-6 w-56 rounded-md" />
                    <TableSkeleton />
                </div>
            </div>
        </div>
    );
};

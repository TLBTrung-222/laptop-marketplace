import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    showHeader?: boolean;
}

export function TableSkeleton({
    rows = 5,
    columns = 4,
    showHeader = true,
}: TableSkeletonProps) {
    return (
        <div className="rounded-md border">
            <Table>
                {showHeader && (
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: columns }).map((_, i) => (
                                <TableHead key={`header-${i}`}>
                                    <Skeleton className="h-6 w-[120px]" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                )}
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={`row-${rowIndex}`}>
                            {Array.from({ length: columns }).map(
                                (_, colIndex) => (
                                    <TableCell
                                        key={`cell-${rowIndex}-${colIndex}`}
                                    >
                                        <Skeleton className="h-4 w-[80%]" />
                                    </TableCell>
                                ),
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

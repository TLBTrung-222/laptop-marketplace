import { Button } from "@/components/ui/button";
import { ProductTable } from "@/features/products/components/product-table";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-neutral-700">
                    Products
                </h1>
                <div className="flex gap-4">
                    {/* <ExportDataButton tableRef={ref} fileName="Categories" /> */}
                    <Button variant="admin" asChild>
                        <Link href="/seller/products/add">
                            <Plus />
                            Add product
                        </Link>
                    </Button>
                </div>
            </div>
            <ProductTable />
        </>
    );
}

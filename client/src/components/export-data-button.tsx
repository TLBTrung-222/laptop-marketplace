import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";

type Props = {
    tableRef: React.RefObject<HTMLTableElement>;
    fileName: string;
};

export const ExportDataButton = ({ tableRef, fileName }: Props) => {
    return (
        <Button
            variant="admin-secondary"
            onClick={() => {
                if (!tableRef.current) return;
                const workSheet = XLSX.utils.table_to_sheet(tableRef.current);
                const workBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workBook, workSheet, fileName);
                XLSX.writeFile(workBook, `${fileName}.xlsx`);
            }}
        >
            <Upload />
            Export
        </Button>
    );
};

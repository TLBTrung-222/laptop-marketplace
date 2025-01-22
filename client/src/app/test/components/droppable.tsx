import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    id: string;
    children: React.ReactNode;
};

export const Droppable = ({ id, children }: Props) => {
    const { isOver, setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            className={cn(
                "h-20 w-40 flex-shrink-0 border",
                isOver && "bg-green-500",
            )}
        >
            {children}
        </div>
    );
};

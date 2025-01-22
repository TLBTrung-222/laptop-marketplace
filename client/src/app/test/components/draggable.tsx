import { Button } from "@/components/ui/button";

import { useDraggable } from "@dnd-kit/core";

type Props = {
    id: string;
    children: React.ReactNode;
};

export const Draggable = ({ id, children }: Props) => {
    const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
        id,
    });

    return (
        <Button
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={isDragging ? "opacity-50" : ""}
        >
            {children}
        </Button>
    );
};

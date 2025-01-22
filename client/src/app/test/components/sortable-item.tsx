import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
    id: string;
    children: React.ReactNode;
};

export const SortableItem = ({ id, children }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <Button
            variant="outline"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            {children}
        </Button>
    );
};

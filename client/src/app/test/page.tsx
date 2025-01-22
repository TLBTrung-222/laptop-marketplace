"use client";

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./components/sortable-item";

function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const nextArray = [...array];
    const item = nextArray.splice(from, 1)[0];
    nextArray.splice(to, 0, item);
    return nextArray;
}

export default function TestPage() {
    const [items, setItems] = useState(() =>
        Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`),
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) {
            return;
        }

        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id as string);
            const newIndex = items.indexOf(over.id as string);
            const nextItems = arrayMove(items, oldIndex, newIndex);
            setItems(nextItems);
        }
    };
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-2">
                    {items.map((id) => (
                        <SortableItem key={id} id={id}>
                            {id}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

import { forwardRef } from "react";

interface Props {
    id: string;
}

export const Item = forwardRef<HTMLDivElement, Props>(
    ({ id, ...props }: Props, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className="flex h-20 w-40 items-center justify-center border"
            >
                {id}
            </div>
        );
    },
);

Item.displayName = "Item";

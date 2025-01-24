import { Badge } from "@/components/ui/badge";

type Props = {
    status: string;
};

export const ShippingBadge = ({ status }: Props) => {
    const variant =
        status === "waiting"
            ? "pending"
            : status === "delivering"
              ? "delivering"
              : "new";

    return (
        <Badge
            variant={variant}
            className="gap-x-1 rounded-full capitalize [&_svg]:size-4"
        >
            {status}
        </Badge>
    );
};

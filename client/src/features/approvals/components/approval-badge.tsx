import { Badge } from "@/components/ui/badge";
import { Approval } from "@/types";
import { ICONS } from "../constants";

type Props = {
    status: Approval["approvalStatus"];
};

export const ApprovalBadge = ({ status }: Props) => {
    const Icon = ICONS[status];

    return (
        <Badge
            variant={status}
            className="gap-x-1 rounded-full capitalize [&_svg]:size-4"
        >
            <Icon />
            {status}
        </Badge>
    );
};

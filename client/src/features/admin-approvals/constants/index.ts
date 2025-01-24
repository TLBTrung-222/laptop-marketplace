import { Approval } from "@/types";
import { CheckCircle, Clock, LucideIcon, XCircle } from "lucide-react";

export const ICONS: Record<Approval["approvalStatus"], LucideIcon> = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle,
};

import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

type Props = {
    role: "admin" | "seller";
};

export const Unauthorized = ({ role }: Props) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="mx-auto flex w-full max-w-[400px] flex-col items-center space-y-2.5 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Users className="size-10" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Unauthorized Access
                </h2>
                <p className="text-sm text-muted-foreground">
                    Please sign in with{" "}
                    <span className="font-semibold capitalize text-red-500">
                        {role}
                    </span>{" "}
                    account
                </p>
                <Button asChild className="mt-4" variant="admin">
                    <Link href="/sign-in" className="flex items-center gap-2">
                        Go to Sign In
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

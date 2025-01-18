"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type Props = {
    field?: any;
};

export const InputPassword = ({ field }: Props) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <Input
                type={show ? "text" : "password"}
                placeholder="******"
                {...field}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform [&_svg]:size-4 [&_svg]:text-muted-foreground"
            >
                {show ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
};

import { Eye, EyeClosed } from "lucide-react";

type Props = {
    show: boolean;
    onChange: (show: boolean) => void;
};

export const TogglePassword = ({ show, onChange }: Props) => {
    return (
        <>
            {show ? (
                <EyeClosed
                    className="absolute top-2 right-3 size-5 text-muted-foreground"
                    onClick={() => onChange(!show)}
                />
            ) : (
                <Eye
                    className="absolute top-2 right-3 size-5 text-muted-foreground"
                    onClick={() => onChange(!show)}
                />
            )}
        </>
    );
};

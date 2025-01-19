import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormControl } from "./ui/form";

type Props = {
    options: { label: string; value: string | number }[];
    placeholder: string;
    field: any;
};

export const SelectOptions = ({ options, field, placeholder }: Props) => {
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="bg-neutral-50">
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

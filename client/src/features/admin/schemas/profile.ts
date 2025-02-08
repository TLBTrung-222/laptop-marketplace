import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

const validatePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, "VN");
    if (!phoneNumber || !phoneNumber.isValid()) {
        return false;
    }
    return true;
};

export const profileSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(12, "Name must be at most 12 characters").optional(),
    phoneNumber: z.string().refine(validatePhoneNumber, {
        message: "Invalid phone number",
    }).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

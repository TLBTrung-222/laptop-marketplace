import { isValidNumber, parsePhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long",
    }),
    phoneNumber: z.string().refine(
        (value) => {
            try {
                const phoneNumber = parsePhoneNumber(value, "VN");
                return isValidNumber(phoneNumber.number);
            } catch (error) {
                return false;
            }
        },
        {
            message: "Invalid phone number for Vietnam",
        }
    ),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    agreePolicy: z.boolean().refine((value) => value === true, {
        message: "You must agree to the terms and conditions",
    }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

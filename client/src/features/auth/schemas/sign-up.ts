import { z } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    phoneNumber: z.string(),
    name: z.string(),
});

export type SignUpInput = z.infer<typeof signupInput>;

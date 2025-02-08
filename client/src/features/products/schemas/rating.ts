import { z } from "zod";

export const ratingSchema = z.object({
    ratingStar: z.number(),
    comment: z.string().min(2, {
        message: "Name must be at least 2 characters",
    }).optional(),
});

export type RatingInput = z.infer<typeof ratingSchema>;

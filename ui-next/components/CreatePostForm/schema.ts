"use client";

import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(1).max(100),
    post_image: z.instanceof(File),
    content: z.record(z.any(), z.any()),
});
export default formSchema;

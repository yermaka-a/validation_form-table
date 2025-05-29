import type z from "zod";
import type schema from "~/schemas/validationSchemas";

export type FormData = z.infer<typeof schema>;

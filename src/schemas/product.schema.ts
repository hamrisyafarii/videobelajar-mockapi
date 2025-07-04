import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  productsImage: z.string(),
  productName: z.string(),
  description: z.string(),
  price: z.string(),
  avatar: z.string(),
  mentor: z.string(),
  roleMentor: z.string(),
  tabs: z.string().optional(),
});

export const ProductsArraySchema = z.array(productSchema);

export type ProductDataSchema = z.infer<typeof productSchema>;

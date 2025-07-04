import { create } from "zustand";
import { type ProductDataSchema } from "../schemas/product.schema";

interface ProductState {
  products: ProductDataSchema[];
  setProducts: (product: ProductDataSchema[]) => void;

  setAddProduct: (product: ProductDataSchema) => void;
  setUpdateProduct: (product: ProductDataSchema) => void;
  setDeleteProduct: (id: string) => void;
}

export const productStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  setAddProduct: (product: ProductDataSchema) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  setUpdateProduct: (updateProduct: ProductDataSchema) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      ),
    })),

  setDeleteProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));

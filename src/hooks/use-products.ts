import { useCallback, useEffect } from "react";
import axiosInstance from "../libs/axios";
import { productStore } from "../store/productStore";
import {
  ProductsArraySchema,
  type ProductDataSchema,
} from "../schemas/product.schema";

export const useProducts = () => {
  const {
    products,
    setProducts,
    setAddProduct,
    setUpdateProduct,
    setDeleteProduct,
  } = productStore();

  const getAllProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get<ProductDataSchema[]>("/products");
      const validate = ProductsArraySchema.parse(res.data);
      setProducts(validate);
    } catch (error) {
      console.log("Error get all products", error);
    }
  }, [setProducts]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const getProductById = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      const product = res.data;

      return product;
    } catch (error) {
      console.log("Error get products by id", error);
    }
  };

  const createNewProduct = async (dataProduct: ProductDataSchema) => {
    try {
      const res = await axiosInstance.post("/products", dataProduct);
      const newProduct = res.data;

      setAddProduct(newProduct);

      return { success: true, message: "Berhasil menambahkan product" };
    } catch (error) {
      console.log("error create new product", error);
      return { success: false, message: "Gagal menambahkan product baru" };
    }
  };

  const updateProduct = async (id: string, dataProduct: ProductDataSchema) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, dataProduct);
      const newDataUpdated = res.data;
      setUpdateProduct(newDataUpdated);

      return { success: true, message: "Berhasil update Product" };
    } catch (error) {
      console.error("Error Update data product", error);
      return { success: false, message: "Product tidak bisa di update" };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setDeleteProduct(id);

      return { success: true, message: "Berhasil menghapus product" };
    } catch (error) {
      console.log("error delete product", error);
      return { success: false, message: "Gagal menghapus data product" };
    }
  };

  return {
    products,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
  };
};

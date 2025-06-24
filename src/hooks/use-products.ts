import { useEffect, useState } from "react";
import axiosInstance from "../libs/axios";

interface ProductsSchema {
  id?: number;
  productsImage: string;
  productName: string;
  description: string;
  price: string;
  avatar: string;
  mentor: string;
  roleMentor: string;
  tabs?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductsSchema[]>([]);

  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get<ProductsSchema[]>("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error get all products", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProductById = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      const product = res.data;

      return product;
    } catch (error) {
      console.log("Error get products by id", error);
    }
  };

  const createNewProduct = async (dataProduct: ProductsSchema) => {
    try {
      const res = await axiosInstance.post("/products", dataProduct);
      const newProduct = res.data;

      setProducts((prev) => [...prev, newProduct]);

      return { success: true, message: "Berhasil menambahkan product" };
    } catch (error) {
      console.log("error create new product", error);
      return { success: false, message: "Gagal menambahkan product baru" };
    }
  };

  const updateProduct = async (id: number, dataProduct: ProductsSchema) => {
    try {
      const res = await axiosInstance.put(`/products/${id}`, dataProduct);
      const newDataUpdated = res.data;

      setProducts((prev) =>
        prev.map((item) => (item.id === id ? newDataUpdated : item))
      );

      return { success: true, message: "Berhasil update Product" };
    } catch (error) {
      console.error("Error Update data product", error);
      return { success: false, message: "Product tidak bisa di update" };
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((item) => item.id != id));

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

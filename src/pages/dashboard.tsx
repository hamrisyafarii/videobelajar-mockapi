import { useState, type ChangeEvent } from "react";
import { X, Plus, DollarSign } from "lucide-react";
import { useProducts } from "../hooks/use-products";
import CardAdminProd from "../components/Fragments/CardAdminProd";
import ProductDetail from "../components/Fragments/ProductDetail";
import ProductForm from "../components/Fragments/ProductForm";
import Header from "../components/Layouts/Header";
import { useAuth } from "../hooks/use-auth";

interface ProductsSchema {
  id?: string;
  productsImage: string;
  productName: string;
  description: string;
  price: string;
  avatar: string;
  mentor: string;
  roleMentor: string;
  tabs?: string;
}

const AdminProductsPage = () => {
  const { users } = useAuth();
  const { products, createNewProduct, updateProduct, deleteProduct } =
    useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductsSchema | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ProductsSchema>({
    productsImage: "",
    productName: "",
    description: "",
    price: "",
    avatar: "",
    mentor: "",
    roleMentor: "",
    tabs: "",
  });

  if (!users) {
    window.location.href = "/";
  }

  const resetForm = () => {
    setFormData({
      productsImage: "",
      productName: "",
      description: "",
      price: "",
      avatar: "",
      mentor: "",
      roleMentor: "",
      tabs: "",
    });
  };

  const openModal = (
    mode: "create" | "edit" | "view",
    product?: ProductsSchema
  ) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    if (product) {
      setFormData({ ...product });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    resetForm();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let result;
      if (modalMode === "create") {
        result = await createNewProduct(formData || null);
      } else if (modalMode === "edit" && selectedProduct?.id) {
        result = await updateProduct(selectedProduct.id, formData );
      }
      if (result?.success) {
        alert(result.message);
        closeModal();
      } else {
        alert(result?.message || "Gagal menyimpan produk");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setLoading(true);
      try {
        const result = await deleteProduct(id);

        if (result.success) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header type="admin" />
      <div className="min-h-screen p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Products
              </h1>
              <p className="text-gray-600 mt-1">Kelola semua produk Anda</p>
            </div>
            <button
              onClick={() => openModal("create")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Product</span>
            </button>
          </div>
        </div>
        {/* Header End */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <CardAdminProd
              key={product.id ?? index}
              product={product}
              onView={(prod) => openModal("view", prod)}
              onEdit={(prod) => openModal("edit", prod)}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <DollarSign size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada produk
            </h3>
            <p className="text-gray-600">
              Mulai dengan menambahkan produk pertama Anda
            </p>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {modalMode === "create" && "Tambah Product Baru"}
                  {modalMode === "edit" && "Edit Product"}
                  {modalMode === "view" && "Detail Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {modalMode === "view" && selectedProduct ? (
                  <ProductDetail selectedProduct={selectedProduct} />
                ) : (
                  //
                  <ProductForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                    loading={loading}
                    mode={modalMode}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40">
            <div className="bg-white p-4 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;

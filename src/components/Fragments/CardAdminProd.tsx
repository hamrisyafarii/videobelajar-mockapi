import { Edit, Eye, Trash2 } from "lucide-react";

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

interface CardProduct {
  product: ProductsSchema;
  onView: (product: ProductsSchema) => void;
  onDelete: (id: string) => void;
  onEdit: (product: ProductsSchema) => void;
}

const CardAdminProd = ({ product, onView, onEdit, onDelete }: CardProduct) => {
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={product.productsImage}
          alt={product.productName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => onView(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="Lihat Detail"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="Edit"
          >
            <Edit size={16} className="text-blue-600" />
          </button>
          <button
            onClick={() => product.id && onDelete(product.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            title="Hapus"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {product.productName}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-blue-600">
            Rp. {product.price}
          </span>
          {product.tabs && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {product.tabs}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={product.avatar}
            alt={product.mentor}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <span className="font-medium">{product.mentor}</span>
            <span className="text-gray-500"> • {product.roleMentor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardAdminProd;

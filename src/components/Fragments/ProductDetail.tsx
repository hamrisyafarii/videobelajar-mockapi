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

interface ProductDetailViewProps {
  selectedProduct: ProductsSchema;
}

const ProductDetail: React.FC<ProductDetailViewProps> = ({
  selectedProduct,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={selectedProduct.productsImage}
            alt={selectedProduct.productName}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Product
            </label>
            <p className="text-gray-900">{selectedProduct.productName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga
            </label>
            <p className="text-2xl font-bold text-blue-600">
              {selectedProduct.price}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mentor
            </label>
            <div className="flex items-center gap-2">
              <img
                src={selectedProduct.avatar}
                alt={selectedProduct.mentor}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{selectedProduct.mentor}</p>
                <p className="text-sm text-gray-600">
                  {selectedProduct.roleMentor}
                </p>
              </div>
            </div>
          </div>
          {selectedProduct.tabs && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {selectedProduct.tabs}
              </span>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deskripsi
        </label>
        <p className="text-gray-900 leading-relaxed">
          {selectedProduct.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;

interface ProductsSchema {
  id?: string;
  productsImage: string;
  productName: string;
  description: string;
  price: string;
  avatar: string;
  mentor: string;
  roleMentor: string;
}

interface CardProductsProps {
  isMobile: boolean;
  item: ProductsSchema;
}

const CardProducts = (props: CardProductsProps) => {
  if (props.isMobile) {
    return (
      <div className="flex gap-4 p-4 rounded-xl shadow bg-white w-full max-w-md relative">
        <img
          src={props.item.productsImage}
          alt=""
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 pr-8">
              {props.item.productName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={props.item.avatar}
                alt=""
                className="w-6 h-6 rounded-full"
              />
              <div className="text-xs">
                <div className="font-semibold">{props.item.mentor}</div>
                <div className="text-gray-500">{props.item.roleMentor}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <span className="text-gray-500 ml-1 text-xs">⭐⭐⭐☆☆ 3/5</span>
            </div>
            <div className="text-green-600 font-bold text-sm">
              Rp. {props.item.price}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow bg-white p-4 w-full max-w-sm relative">
      <img
        src={props.item.productsImage}
        alt=""
        className="rounded-xl mb-4 w-full h-[180px] object-cover"
      />
      <h3 className="font-semibold text-lg text-gray-900 mb-1">
        {props.item.productName}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{props.item.description}</p>

      <div className="flex items-center gap-2 mb-2">
        <img src={props.item.avatar} alt="" className="w-6 h-6 rounded-md" />
        <div className="text-xs text-gray-800">
          <div className="font-semibold">{props.item.mentor}</div>
          <div className="text-gray-500">{props.item.roleMentor}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-yellow-500 text-sm">
          <span className="ml-1 text-gray-500">⭐⭐⭐☆☆ 3/5</span>
        </div>
        <div className="text-green-600 font-semibold text-sm">
          Rp. {props.item.price}
        </div>
      </div>
    </div>
  );
};

export default CardProducts;

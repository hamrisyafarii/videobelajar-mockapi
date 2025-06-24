import { useEffect, useState } from "react";
import CardProducts from "../components/Fragments/CardProducts";
import Hero from "../components/Fragments/Hero";
import Header from "../components/Layouts/Header";
import { useAuth } from "../hooks/use-auth";
import { useProducts } from "../hooks/use-products";
import { DollarSign } from "lucide-react";
import SecondHero from "../components/Fragments/SecondHero";

const ProductsPage = () => {
  const { users } = useAuth();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState("semua");

  if (!users) {
    window.location.href = "/";
  }

  const categoryTabs = Array.from(new Set(products.map((p) => p.tabs))).filter(
    (tab): tab is string => typeof tab === "string"
  );
  const tabs = ["semua", ...categoryTabs];

  const filteredProducts = products.filter((prod) => {
    return (
      activeTab === "semua" ||
      prod.tabs?.toLowerCase() === activeTab.toLowerCase()
    );
  });

  useEffect(() => {
    setActiveTab("semua");
  }, []);

  return (
    <>
      <Header type="dashboard" />
      <div className="m-4 md:mx-8 md:my-8">
        <Hero />
        <section className="mx-4 md:mx-8 mt-8">
          <div className="flex flex-col mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-balance">
              Koleksi Video Pembelajaran Unggulan
            </h1>
            <p className="mb-6 text-gray-500">
              Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center overflow-x-auto mb-6 pb-2 space-x-4 md:space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium whitespace-nowrap py-2 ${
                  activeTab === tab
                    ? "text-[#F64920] border-b-2 border-[#F64920]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dekstop */}
          {filteredProducts.length > 0 ? (
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden py-4">
              {filteredProducts?.map((item, index) => (
                <CardProducts
                  isMobile={false}
                  item={item}
                  key={item.id ?? index}
                />
              ))}
            </div>
          ) : (
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

          {/* Mobile */}
          <div className="md:hidden space-y-4 overflow-hidden py-2">
            {filteredProducts?.map((item, index) => (
              <CardProducts
                key={item.id ?? index}
                isMobile={true}
                item={item}
              />
            ))}
          </div>
        </section>
        <div className="my-6">
          <SecondHero />
        </div>
      </div>
    </>
  );
};
export default ProductsPage;

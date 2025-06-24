import backgroundImage from "../../assets/images/content-bawah.jpg";

const SecondHero = () => {
  return (
    <>
      <section
        className="relative bg-cover bg-center py-16 rounded-md overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="relative text-white text-center container mx-auto max-w-md">
          <p className="text-[#C1C2C4] text-md">NEWSLETTER</p>
          <h1 className="text-white my-2 text-2xl md:text-3xl lg:text-4xl">
            Mau Belajar Lebih Banyak?
          </h1>
          <p className="text-[#F4F5FA] text-sm md:text-md lg:text-lg mb-8">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
            spesial dari program-program terbaik hariesok.id
          </p>
          <form action="">
            <div className="hidden md:flex gap-1">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="rounded bg-[#f3f3f3] w-full text-black px-4 py-2"
              />
              <button className="bg-[#FFBD3A] rounded-md px-2 ">
                Subscribe
              </button>
            </div>
            <div className="md:hidden mx-4 space-y-4">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="rounded bg-[#f3f3f3] w-full text-black px-4 py-2"
              />
              <button className="bg-[#FFBD3A] w-full px-4 py-2 rounded-md">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SecondHero;

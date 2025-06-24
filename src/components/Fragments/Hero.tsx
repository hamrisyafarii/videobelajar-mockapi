import Content from "../../assets/images/content4.jpg";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center py-16 rounded-xl overflow-hidden mx-4 sm:mx-8"
      style={{ backgroundImage: `url(${Content})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative text-white container mx-auto">
        <h1 className="text-start text-2xl md:text-3xl lg:text-4xl px-4 md:px-6 lg:px-8 mb-2 pr-6 font-bold leading-tight">
          Gapai Karier Impianmu sebagai Seorang <br /> UI/UX Designer & Product
          Manager.
        </h1>
        <p className="text-white mb-8 text-xs sm:text-base lg:text-lg px-4 md:px-6 lg:px-8 leading-relaxed">
          Belajar bersama tutor profesional di Video Course. <br />
          Kapanpun, dimanapun.
        </p>
        <p className="text-[#C1C2C4] text-xs sm:text-base lg:text-lg px-4 md:px-6 lg:px-8 leading-relaxed">
          ⭐⭐⭐☆☆ <span className="ml-1 text-gray-500">3.5/5</span>
        </p>
      </div>
    </section>
  );
};
export default Hero;

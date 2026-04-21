import { useNavigate } from "react-router-dom";
import CircularMarquee from "./CircularMarquee";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .btn-shine {
          background: linear-gradient(90deg, #000 0%, #333 50%, #000 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }

        .btn-shine:hover {
          background: linear-gradient(90deg, #333 0%, #555 50%, #333 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }
      `}</style>

      <div className="relative w-full h-screen overflow-hidden max-w-[100vw] bg-black">
        {/* Try video with poster */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {}}
        >
          <source src="/video/bg4.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 flex items-center justify-center text-white md:justify-start md:px-16">
          <div className="mt-42 text-center sm:mt-0 md:text-left">
            <h1 className="font-orbitron font-black leading-tight mb-5 drop-shadow-[2px_2px_10px_rgba(0,0,0,0.5)] text-2xl tracking-[1px] sm:text-[28px] sm:tracking-[2px] md:text-4xl md:tracking-[3px] md:leading-tight lg:text-[50px] lg:tracking-[4px] xl:text-[60px] xl:tracking-[6px] 2xl:text-[80px] 2xl:tracking-[8px]">
              STYLE
              <br />
              VIBE
              <br />
              REFLECT
            </h1>

            <p className="mb-8 max-w-[720px] text-[16px] font-normal leading-relaxed tracking-normal text-white/90 sm:text-[17px] md:text-[19px]">
              Built for street nights and city lights—drop-ready fits that speak
              loud without trying.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-10 py-3 text-[14px] font-semibold tracking-normal text-white transition-all duration-300 hover:border-white hover:bg-white/10 sm:px-9 sm:py-3 sm:text-[14px]"
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-full bg-black py-20 px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 md:p-16">
          <h2 className="font-orbitron mb-6 text-3xl font-black tracking-wider text-black md:text-4xl">
            OUR STORY
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800 md:text-lg">
            <p>
              SwiftBuy was born from the streets—a vision to fuse cutting-edge
              fashion with the raw energy of urban culture. We believe style
              isn't just what you wear, it's how you move through the world.
            </p>
            <p>
              Every piece in our collection is crafted for those who dare to
              stand out. From bold graphics to premium fabrics, we're redefining
              what streetwear means in the modern era.
            </p>
            <p>
              Join us on this journey. Wear the vibe. Live the reflection. Be
              unapologetically you.
            </p>
          </div>
        </div>
      </div>

      {/* Second Video Section */}
      <div className="relative w-full h-screen overflow-hidden max-w-[100vw] bg-black">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {}}
        >
          <source src="/video/2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <p className="text-2xl font-normal tracking-wider md:text-3xl lg:text-4xl">
            STYLED BY
          </p>
          <p className="font-orbitron text-4xl font-black tracking-widest md:text-5xl lg:text-6xl mt-2">
            SWIFTBUY<sup className="text-lg align-super">©</sup>
          </p>
        </div>
      </div>

      {/* Brand Hero Section with Circular Marquee */}
      <CircularMarquee />
    </>
  );
};

export default HeroSection;

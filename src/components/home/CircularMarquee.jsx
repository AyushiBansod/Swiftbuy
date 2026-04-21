import { useNavigate } from "react-router-dom";
import Marquee from "./Marquee";

const CircularMarquee = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes rotate-text {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .circular-text {
          animation: rotate-text 20s linear infinite;
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shiny-border {
          position: relative;
          overflow: hidden;
        }

        .border-line {
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            #fff,
            rgba(255, 255, 255, 0.8),
            transparent
          );
        }
      `}</style>

      <div className="w-full bg-[#000000] py-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-lg relative flex items-center justify-center">
          {/* Circular rotating text container */}
          <div className="circular-text absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
            <svg viewBox="0 0 180 180" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 90, 90 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                  fill="none"
                />
              </defs>
              <text
                fill="#fff"
                fontSize="12"
                fontWeight="500"
                letterSpacing="2"
              >
                <textPath href="#circlePath" startOffset="0%">
                  SWIFTBUY © RAW YET REFINED • SINCE 2024 • NATIVELY URBAN •
                  UNUSUAL CLOTHING •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center circular image */}
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="/images/c.png"
              alt="SwiftBuy Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Step into SwiftBuy Section */}
      <div className="w-full bg-[#000000] py-6 px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h2 className="font-orbitron text-4xl font-black tracking-wider text-white md:text-5xl lg:text-6xl mb-4">
            Step into SwiftBuy<sup className="text-2xl align-super">©</sup>
          </h2>

          {/* Tagline */}
          <p className="text-lg text-white/80 mb-10 md:text-xl">
            Experience the Future of Streetwear Fashion
          </p>

          {/* Explore Now Button with shine effect */}
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/products");
            }}
            className="inline-flex items-center justify-center rounded-full px-12 py-4 text-[15px] font-semibold tracking-wide text-white transition-all duration-300 border border-white/20 btn-shine mb-10"
          >
            Explore Now
          </button>

          {/* Shiny border line separator - same as Footer */}
          <div className="border-line mb-8"></div>
        </div>
      </div>

      {/* Marquee Section */}
      <Marquee />
    </>
  );
};

export default CircularMarquee;

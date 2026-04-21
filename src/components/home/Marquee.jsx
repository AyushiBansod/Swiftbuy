import React from "react";

const Marquee = () => {
  const text = "IN ORDER TO KEEP THE FASHION";
  const items = Array(10).fill(text);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: scroll 45s linear infinite;
        }

        .marquee-text {
          font-family: 'Anton', sans-serif;
          font-size: clamp(14px, 3.8vw, 48px);
          letter-spacing: 0.04em;
          color: transparent;
          -webkit-text-stroke: 1.4px #000;
          line-height: 1.1;
        }

        .marquee-text.filled {
          color: #000;
          -webkit-text-stroke: 0;
        }

        .marquee-img {
          width: clamp(18px, 4.2vw, 70px);
          height: clamp(18px, 4.2vw, 70px);
          margin: 0 clamp(6px, 1.2vw, 12px);
        }

        @media (max-width: 768px) {
          .marquee-text {
            -webkit-text-stroke: 1.2px #000;
          }
        }

        @media (max-width: 480px) {
          .marquee-text {
            -webkit-text-stroke: 1.05px #000;
          }
        }

        @media (max-width: 360px) {
          .marquee-text {
            letter-spacing: 0.03em;
          }
        }

        @media (max-width: 320px) {
          .marquee-text {
            -webkit-text-stroke: 0.95px #000;
          }
        }
      `}</style>

      <div className="bg-white overflow-hidden whitespace-nowrap py-3 md:py-4 border-y border-gray-200">
        <div className="flex w-max marquee-track">
          {/* First copy */}
          <div className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={`first-${index}`}>
                <span
                  className={`marquee-text uppercase px-3 md:px-5 py-0.5 md:py-1 flex items-center select-none ${index % 2 !== 0 ? "filled" : ""}`}
                >
                  {item}
                </span>

                {/* ✅ public folder image */}
                <img
                  src="/images/d2.png"
                  alt="logo"
                  className="marquee-img object-contain"
                />
              </React.Fragment>
            ))}
          </div>

          {/* Second copy */}
          <div className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={`second-${index}`}>
                <span
                  className={`marquee-text uppercase px-3 md:px-5 py-0.5 md:py-1 flex items-center select-none ${index % 2 !== 0 ? "filled" : ""}`}
                >
                  {item}
                </span>

                <img
                  src="/images/d2.png"
                  alt="logo"
                  className="marquee-img object-contain"
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;

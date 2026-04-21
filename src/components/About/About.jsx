import React from "react";
import { FaStar, FaTshirt, FaTruck, FaHandshake } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaStar size={24} />,
      title: "Premium Quality",
      description: "Perfect fit meets Luxury Comfort in our latest releases.",
    },
    {
      icon: <FaTshirt size={24} />,
      title: "Futuristic Design",
      description: "Explore cutting-edge fashion in our curated selection.",
    },
    {
      icon: <FaTruck size={24} />,
      title: "Fast Shipping",
      description: "Quick and reliable delivery to your doorstep anywhere.",
    },
    {
      icon: <FaHandshake size={24} />,
      title: "Collaborative Partners",
      description: "Elevating fashion through creative partnerships.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
      <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-orbitron text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
            WHAT WE DELIVER
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-black border border-white/40 flex items-center justify-center mb-4 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base max-w-[250px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-1 md:order-1">
              <h3 className="font-orbitron text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                ABOUT US
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-0">
                Swiftis is a fashion-forward brand dedicated to bringing you the
                latest trends in streetwear and urban fashion. We believe in
                quality, style, and sustainability. Our collections are
                carefully curated to reflect the dynamic spirit of modern urban
                culture, blending comfort with cutting-edge design to create
                pieces that stand out. We strive to create a community of
                fashion-forward individuals who value authenticity, creativity,
                and self-expression through their clothing choices. Our mission
                is to empower individuals to express their unique style through
                high-quality, sustainable fashion that doesn't compromise on
                comfort or design.
              </p>
            </div>
            <img
              src="/about/about.jpg"
              alt="About Us"
              className="w-full h-[28rem] md:h-[32rem] object-cover rounded-lg order-2 md:order-2"
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-1 md:order-2">
              <h3 className="font-orbitron text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                OUR MISSION
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-0">
                To empower individuals to express their unique style through
                high-quality, sustainable fashion that doesn't compromise on
                comfort or design. We strive to create a community of
                fashion-forward individuals who value authenticity, creativity,
                and self-expression through their clothing choices. Our goal is
                to make a positive impact on the fashion industry by promoting
                sustainable practices and reducing waste. We believe that
                fashion should be a force for good, and we're committed to
                making a difference.
              </p>
            </div>
            <img
              src="/about/ourmission.jpg"
              alt="About Us"
              className="w-full h-[28rem] md:h-[32rem] object-cover rounded-lg order-2 md:order-1"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-1 md:order-1">
              <h3 className="font-orbitron text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                OUR STORY
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-0">
                Born from a passion for street culture and fashion, Swiftis
                started as a small idea and has grown into a brand that
                represents the voice of the modern urban individual. Our journey
                has been driven by a commitment to innovation and a desire to
                push boundaries in the fashion industry, creating pieces that
                resonate with the bold and the brave. We're proud of our
                heritage and our community, and we're excited to see where the
                future takes us.
              </p>
            </div>
            <img
              src="/about/ourstory.png"
              alt="About Us"
              className="w-full h-[28rem] md:h-[32rem] object-cover rounded-lg order-2 md:order-2"
            />
          </div>
        </div>
      </section>

      {/* Event Presence Section */}
      <section className="bg-black py-8 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-orbitron text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            SWIFT BEYOND THE LIMITS
          </h2>
          <p className="font-orbitron text-gray-400 text-lg mb-8">
            We are not done. Not even close.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
            Swiftis was never meant to be one thing, and honestly, we hope it
            never is. We move, we try stuff, we put out work that sometimes has
            no reference yet. A lot of it does not land the way we pictured it
            in our heads. Some of it does, and when it does, we fully embrace
            that feeling.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
            That restlessness is not a phase. It is just us.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
            Thanks for reading this far. It genuinely means something to us.
          </p>
          <p className="font-orbitron text-gray-400 text-base md:text-lg mb-12">
            From the House of Swiftis.
          </p>
          <img
            src="/about/event.jpg"
            alt="Event Presence"
            className="w-3/4 md:w-1/2 mx-auto h-64 md:h-80 object-cover rounded-lg"
          />
        </div>
      </section>
    </>
  );
};

export default About;

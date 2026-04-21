import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .btn-shine {
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }

        .btn-shine:hover {
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 100%);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }
      `}</style>
      <section className="bg-black min-h-screen py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-orbitron text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-6 py-4 rounded-3xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              required
            />

            <div className="text-center pt-4">
              <button
                type="submit"
                className="btn-shine inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-10 py-3 text-[14px] font-semibold tracking-normal text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Us Section */}
          <div className="mt-20">
            <h3 className="font-orbitron text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Contact Us
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-black text-xl md:text-2xl font-bold mb-3">
                  Phone
                </h4>
                <p className="text-gray-700 text-base">+1 (206) 555-4489</p>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-black text-xl md:text-2xl font-bold mb-3">
                  Email
                </h4>
                <p className="text-gray-700 text-base">contact@swiftbuy.com</p>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-black text-xl md:text-2xl font-bold mb-3">
                  Address
                </h4>
                <p className="text-gray-700 text-base">
                  2100 Pine Street, Floor 5, San Francisco, CA 94114, USA
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-black text-xl md:text-2xl font-bold mb-3">
                  Working Hours
                </h4>
                <p className="text-gray-700 text-base">Mon-Fri: 9am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

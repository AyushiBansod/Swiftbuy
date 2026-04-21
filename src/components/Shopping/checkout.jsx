import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const closeModal = () => navigate("/products");

  const phoneInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState("mobile");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressFields, setAddressFields] = useState({
    zipcode: "",
    city: "",
    state: "",
    firstname: "",
    lastname: "",
    address: "",
  });
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [mobileCompleted, setMobileCompleted] = useState(false);
  const [addressCompleted, setAddressCompleted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  // Update phone input value when phoneNumber changes
  useEffect(() => {
    if (phoneInputRef.current && currentStep === "mobile") {
      phoneInputRef.current.value = "+91 | " + phoneNumber;
      const cursorPosition = 6 + phoneNumber.length;
      phoneInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [currentStep, phoneNumber]);

  // Handle phone input
  const handlePhoneInput = (e) => {
    let inputValue = e.target.value;

    // If user tries to delete everything, reset to "+91 | "
    if (inputValue.length <= 6) {
      e.target.value = "+91 | ";
      setPhoneNumber("");
      return;
    }

    // Extract numbers after "+91 | "
    let numbersOnly = inputValue
      .replace("+91 | ", "")
      .replace(/\D/g, "")
      .slice(0, 10);

    e.target.value = "+91 | " + numbersOnly;
    setPhoneNumber(numbersOnly);

    // Move cursor to the correct position
    const cursorPosition = 6 + numbersOnly.length;
    setTimeout(
      () => e.target.setSelectionRange(cursorPosition, cursorPosition),
      0,
    );
  };

  const nextSection = (nextStep) => {
    if (nextStep === "address") {
      if (phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      setMobileCompleted(true);
    } else if (nextStep === "payment") {
      const isAddressValid = Object.values(addressFields).every(
        (field) => field.trim() !== "",
      );
      if (!isAddressValid) {
        alert("Please fill all address fields.");
        return;
      }
      setAddressCompleted(true);
    }
    setCurrentStep(nextStep);
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setAddressFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleHeadingClick = (step) => {
    if (step === "mobile") {
      setCurrentStep("mobile");
    } else if (step === "address") {
      if (phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      setCurrentStep("address");
    } else if (step === "payment") {
      const isAddressValid = Object.values(addressFields).every(
        (field) => field.trim() !== "",
      );
      if (!isAddressValid) {
        alert("Please fill all address fields.");
        return;
      }
      setCurrentStep("payment");
    }
  };

  const handlePayNow = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    alert("Thank you for your purchase! Your order is confirmed!");
    setIsPaymentCompleted(true);
  };

  const paymentMethods = [
    { name: "PhonePe", img: "/images/phonepe.png" },
    { name: "Google Pay", img: "/images/gpay.png" },
    { name: "Paytm", img: "/images/paytm.png" },
    { name: "UPI", img: "/images/upi.png" },
    { name: "Visa", img: "/images/visa.png" },
    { name: "Mastercard", img: "/images/mastercard.png" },
  ];

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-3">
        <div className="bg-white rounded-2xl w-full max-w-lg mx-auto relative shadow-2xl">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-black text-3xl font-bold hover:text-gray-500 transition-colors z-10"
          >
            &times;
          </button>
          <div className="p-6 md:p-8">
            <h1 className="text-black text-2xl md:text-3xl font-bold mb-4">
              Checkout
            </h1>

            {/* Step Headings - Desktop: text, Mobile: dots/line */}
            <div className="flex items-center justify-between mb-2">
              {/* Mobile: Checkmark progress bar */}
              <div className="flex items-center w-full max-[768px]:justify-center md:hidden">
                <button
                  onClick={() => handleHeadingClick("mobile")}
                  className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                    mobileCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    mobileCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
                <button
                  onClick={() => handleHeadingClick("address")}
                  className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                    addressCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    addressCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
                <button
                  onClick={() => handleHeadingClick("payment")}
                  className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                    isPaymentCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Desktop: Text headings */}
              <button
                onClick={() => handleHeadingClick("mobile")}
                className={`hidden md:flex items-center gap-2 text-sm md:text-base font-semibold transition-colors ${
                  mobileCompleted
                    ? "text-green-600"
                    : currentStep === "mobile"
                      ? "text-black"
                      : "text-gray-400"
                }`}
              >
                {mobileCompleted && <span>&#x2713;</span>}Mobile Number
              </button>
              <button
                onClick={() => handleHeadingClick("address")}
                className={`hidden md:flex items-center gap-2 text-sm md:text-base font-semibold transition-colors ${
                  addressCompleted
                    ? "text-green-600"
                    : currentStep === "address"
                      ? "text-black"
                      : "text-gray-400"
                }`}
              >
                {addressCompleted && <span>&#x2713;</span>}Address
              </button>
              <button
                onClick={() => handleHeadingClick("payment")}
                className={`hidden md:flex items-center gap-2 text-sm md:text-base font-semibold transition-colors ${
                  isPaymentCompleted
                    ? "text-green-600"
                    : currentStep === "payment"
                      ? "text-black"
                      : "text-gray-400"
                }`}
              >
                {isPaymentCompleted && <span>&#x2713;</span>}Payment
              </button>
            </div>

            <hr className="border-gray-300 mb-4" />

            {/* Mobile Number Section */}
            {currentStep === "mobile" && (
              <div className="text-center">
                <h2 className="text-black text-lg md:text-xl font-semibold mb-6">
                  Enter Mobile Number
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-600 text-sm mb-2 text-left"
                  >
                    Enter Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-gray-100 text-black text-lg md:text-xl px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors max-[320px]:text-base"
                    placeholder="+91 | "
                    required
                    ref={phoneInputRef}
                    onInput={handlePhoneInput}
                  />
                </div>
                <label className="flex items-center gap-3 mb-6 cursor-pointer justify-center">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    className="w-4 h-4 accent-yellow-400"
                  />
                  <span className="text-gray-600 text-sm">
                    Notify me for orders, updates & offers
                  </span>
                </label>
                <button
                  onClick={() => nextSection("address")}
                  className="w-3/5 bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors text-base"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Address Section */}
            {currentStep === "address" && (
              <div className="flex flex-col">
                <h2 className="text-black text-lg md:text-xl font-semibold mb-4 text-center">
                  Add New Address
                </h2>
                <div className="overflow-y-auto max-h-[240px] space-y-4 scrollbar-hide">
                  {[
                    {
                      id: "zipcode",
                      label: "Zip Code",
                      type: "text",
                      maxLen: "6",
                    },
                    { id: "city", label: "City", type: "text" },
                    { id: "state", label: "State", type: "text" },
                    { id: "firstname", label: "Full Name", type: "text" },
                    { id: "lastname", label: "Email Address", type: "email" },
                    {
                      id: "address",
                      label: "Full Address (House no., Area, etc)",
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-gray-600 text-sm mb-1"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        maxLength={field.maxLen}
                        className="w-full bg-gray-100 text-black px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:outline-none transition-colors"
                        required
                        value={addressFields[field.id]}
                        onChange={handleAddressChange}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => nextSection("payment")}
                  className="w-3/5 bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors text-base mt-4 mx-auto"
                >
                  Next
                </button>
              </div>
            )}

            {/* Payment Section */}
            {currentStep === "payment" && (
              <div>
                <h3 className="text-black text-lg md:text-xl font-semibold mb-6 text-center">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.name}
                      onClick={() => setSelectedPayment(method.name)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedPayment === method.name
                          ? "border-black bg-gray-100"
                          : "border-gray-300 bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={method.img}
                        alt={method.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-black text-xs font-medium">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handlePayNow}
                  className="w-3/5 bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors text-base mx-auto block"
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

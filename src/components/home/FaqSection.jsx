const FaqSection = () => {
  const faqs = [
    {
      id: 1,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, UPI, and even futuristic digital currencies. Choose the option that suits your style best!",
    },
    {
      id: 2,
      question: "Is international shipping available?",
      answer:
        "Absolutely! SwiftBuy ships globally to bring the urban vibe to fashion enthusiasts worldwide. Get ready to rock your style no matter where you are!",
    },
    {
      id: 3,
      question: "How to place an order?",
      answer:
        "Placing an order at SwiftBuy is as easy as rocking your favorite streetwear. Simply browse our collections, select your must-have items, and proceed to checkout!",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "We offer a hassle-free 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.",
    },
    {
      id: 5,
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 5-7 business days. Express shipping options are available for those who need their style fix sooner!",
    },
    {
      id: 6,
      question: "Do you offer size exchanges?",
      answer:
        "Yes! We understand that finding the perfect fit is important. You can exchange sizes within 14 days of delivery, free of charge.",
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

      <div className="w-full bg-black py-20 px-6">
        <h2 className="font-orbitron mb-12 text-center text-4xl font-black tracking-wider text-white md:text-5xl">
          Got Questions? We Have Answers!
        </h2>

        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-3xl bg-white p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                {faq.question}
              </h3>
              <p className="text-lg leading-relaxed text-gray-800">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqSection;

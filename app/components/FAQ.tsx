import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqItems: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({
  title = "Frequently Asked Questions",
  faqItems,
  className = "",
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      // Remove index if already open (to close it)
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      // Add index to open items
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className={`py-16 bg-base-100 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-200 mb-4"
            >
              <input
                type="checkbox"
                checked={openIndexes.includes(index)}
                onChange={() => toggleFaq(index)}
                className="collapse-checkbox"
              />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

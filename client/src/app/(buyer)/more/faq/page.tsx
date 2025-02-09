"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const faqs = [
  {
    question: "How can I buy a laptop on the Marketplace?",
    answer: "You can browse the product list, add items to your cart, and proceed with payment using supported methods such as VNPay, MoMo, or COD.",
  },
  {
    question: "What is the warranty policy?",
    answer: "Products are covered under the warranty policies of individual stores. Please check the details before making a purchase.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Marketplace supports returns within 7 days if the product has a manufacturer defect.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support payments via VNPay, MoMo, bank transfer, and COD.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery time typically ranges from 2 to 5 business days, depending on your location.",
  },
];


export default function FAQPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Frequently asked questions</h1>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

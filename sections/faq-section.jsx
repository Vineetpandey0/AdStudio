import SectionTitle from '@/components/section-title';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from "framer-motion";

export default function FaqSection() {
    const [isOpen, setIsOpen] = useState(false);
    const data = [
        {
            question: 'What is this AI Short Ad Generator?',
            answer: 'It is a full-stack AI-powered platform that generates short, engaging advertisements from simple inputs like product details, audience, and tone.',
        },
        {
            question: 'Do I need any technical or marketing experience to use it?',
            answer: "No. The platform is designed for non-technical users as well. Just provide basic inputs, and the AI handles script generation, structure, and creativity.",
        },
        {
            question: 'What kind of ads can I generate?',
            answer: 'You can generate short-form ads for social media platforms like Instagram, YouTube Shorts, and TikTok, including product promos, brand awareness ads, and call-to-action content.',
        },
        {
            question: 'Can I customize the generated ads?',
            answer: 'Yes. You can modify tone, target audience, ad length, style, and messaging to align with your brand voice.',
        },
        {
            question: 'How does the AI generate ads?',
            answer: 'The system uses advanced AI models to analyze your input and generate optimized ad scripts based on marketing patterns, audience psychology, and engagement strategies.',
        },
        {
            question: 'Is this suitable for startups and small businesses?',
            answer: 'Yes. It is especially useful for startups, creators, and small businesses looking to produce high-quality ads quickly without hiring professional copywriters.',
        },
    ];

    return (
        <section className='mt-32'>
            <SectionTitle title="FAQ's" description="Looking for answers to your frequently asked questions? Check out our FAQ's section below to find." />
            <div className='mx-auto mt-12 space-y-4 w-full max-w-xl'>
                {data.map((item, index) => (
                    <motion.div key={index} className='flex flex-col glass rounded-md'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <h3 className='flex cursor-pointer hover:bg-white/10 transition items-start justify-between gap-4 p-4 font-medium' onClick={() => setIsOpen(isOpen === index ? null : index)}>
                            {item.question}
                            <ChevronDownIcon className={`size-5 transition-all shrink-0 duration-400 ${isOpen === index ? 'rotate-180' : ''}`} />
                        </h3>
                        <p className={`px-4 text-sm/6 transition-all duration-400 overflow-hidden ${isOpen === index ? 'pt-2 pb-4 max-h-80' : 'max-h-0'}`}>{item.answer}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
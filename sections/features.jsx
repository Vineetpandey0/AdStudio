import SectionTitle from "@/components/section-title";
import { BotIcon, BrainIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Features() {

    const refs = useRef([]);

    const featuresData = [
        {
            icon: BotIcon,
            title: "AI Ad Generation",
            description: "Generate high-converting ad scripts instantly from simple prompts.",
        },
        {
            icon: BrainIcon,
            title: "Smart Personalization",
            description: "Tailor ads based on audience, tone, and platform for better engagement.",
        },
        {
            icon: ZapIcon,
            title: "Instant Output",
            description: "Get ready-to-use ad content in seconds with optimized structure.",
        }
    ];

    return (
        <section className="mt-32">
            <SectionTitle
                title="Ad Generation Features"
                description="Create high-performing short ads with AI — generate scripts, customize tone, and optimize for different platforms in seconds."
            />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        className="hover:-translate-y-0.5 p-6 rounded-xl space-y-4 glass max-w-80 w-full"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 320,
                            damping: 70,
                            mass: 1
                        }}
                        onAnimationComplete={() => {
                            const card = refs.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        <feature.icon className="size-8.5" />
                        <h3 className="text-base font-medium text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-100 line-clamp-2 pb-2">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

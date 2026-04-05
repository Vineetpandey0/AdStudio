'use client';

import { motion } from 'framer-motion';
import { CheckIcon, CrownIcon, RocketIcon, ZapIcon, XIcon, SparklesIcon, ShieldCheckIcon, HeadphonesIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import Link from 'next/link';

const plans = [
    {
        icon: RocketIcon,
        title: 'Free',
        description: 'Perfect for individuals exploring AI ad generation.',
        monthlyPrice: '$0',
        yearlyPrice: '$0',
        buttonText: 'Get Started Free',
        buttonHref: '/sign-up',
        highlight: false,
        badge: null,
        features: [
            { text: 'Up to 5 ad generations/month', included: true },
            { text: 'Basic ad image styles (Minimalist, Bold)', included: true },
            { text: 'Standard output quality', included: true },
            { text: 'Community support', included: true },
            { text: 'Basic editing access', included: true },
            { text: 'Reference image upload', included: false },
            { text: 'Multiple ad variations', included: false },
            { text: 'Analytics & insights', included: false },
            { text: 'Priority support', included: false },
            { text: 'API access', included: false },
        ],
    },
    {
        icon: ZapIcon,
        title: 'Professional',
        description: 'For creators, marketers, and growing startups.',
        monthlyPrice: '$49',
        yearlyPrice: '$39',
        buttonText: 'Upgrade to Pro',
        buttonHref: '/sign-up',
        highlight: true,
        badge: 'Most Popular',
        features: [
            { text: 'Unlimited ad generations', included: true },
            { text: 'All 5 visual styles', included: true },
            { text: 'High-quality optimized output', included: true },
            { text: 'Priority chat & email support', included: true },
            { text: 'Advanced editing tools', included: true },
            { text: 'Reference image upload', included: true },
            { text: 'Multiple ad variations (up to 5)', included: true },
            { text: 'Analytics & performance insights', included: true },
            { text: 'Priority support', included: false },
            { text: 'API access', included: false },
        ],
    },
    {
        icon: CrownIcon,
        title: 'Enterprise',
        description: 'Custom solutions for agencies and large teams.',
        monthlyPrice: '$149',
        yearlyPrice: '$119',
        buttonText: 'Contact Sales',
        buttonHref: '#contact',
        highlight: false,
        badge: null,
        features: [
            { text: 'Unlimited ad generations', included: true },
            { text: 'Custom AI ad models', included: true },
            { text: 'Team collaboration & roles', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: 'Private & secure API access', included: true },
            { text: 'Reference image upload', included: true },
            { text: 'Unlimited ad variations', included: true },
            { text: 'Advanced analytics dashboard', included: true },
            { text: '24/7 premium support', included: true },
            { text: 'Full API access', included: true },
        ],
    },
];

const faqs = [
    {
        q: 'Can I switch plans at any time?',
        a: 'Yes. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
        q: 'What happens when I run out of generations on the Free plan?',
        a: 'Once you\'ve used your 5 free generations for the month, you\'ll be prompted to upgrade. Your existing generated ads remain accessible even after hitting the limit.'
    },
    {
        q: 'Is there a free trial for Professional?',
        a: 'We offer a 7-day free trial on the Professional plan — no credit card required. After the trial, you\'ll be billed monthly or annually based on your preference.'
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as PayPal and bank transfers for Enterprise contracts.'
    },
    {
        q: 'Do you offer refunds?',
        a: 'We offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team and we\'ll process a full refund, no questions asked.'
    },
    {
        q: 'Is the Enterprise plan customizable?',
        a: 'Absolutely. Enterprise pricing is custom-tailored based on your team size, generation volume, and specific feature requirements. Contact our sales team to discuss your needs.'
    },
];

const guarantees = [
    { icon: ShieldCheckIcon, title: '14-Day Money-Back', desc: 'Full refund, no questions asked.' },
    { icon: SparklesIcon, title: 'No Hidden Fees', desc: 'Pay only what\'s on the pricing card.' },
    { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Real humans, not just bots.' },
];

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const refs = useRef([]);

    return (
        <main className="px-4 pb-32">
            {/* Background blobs */}
            <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
                <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#1E3A8A] blur-[110px] opacity-60" />
                <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2563EB] blur-[110px] opacity-60" />
                <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#38BDF8] blur-[110px] opacity-50" />
            </div>

            {/* Hero */}
            <section className="flex flex-col items-center pt-32 text-center">
                <motion.div
                    className="btn glass py-1 px-4 text-xs mb-6 w-max"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                >
                    Simple, Transparent Pricing
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70, mass: 1 }}
                >
                    Plans that grow <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">with your business</span>
                </motion.h1>
                <motion.p
                    className="text-gray-300 text-base max-w-md mt-6"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                >
                    Start for free, upgrade when you need more. No contracts, cancel anytime.
                </motion.p>

                {/* Toggle */}
                <motion.div
                    className="flex items-center gap-4 mt-10"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                >
                    <span className={`text-sm font-medium transition ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isYearly ? 'bg-blue-500' : 'bg-white/20'}`}
                        aria-label="Toggle billing period"
                    >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isYearly ? 'translate-x-6' : ''}`} />
                    </button>
                    <span className={`text-sm font-medium transition ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                        Yearly <span className="text-green-400 text-xs ml-1">Save 20%</span>
                    </span>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="mt-16 flex flex-wrap items-stretch justify-center gap-6 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.title}
                        ref={(el) => (refs.current[index] = el)}
                        className={`relative w-full max-w-sm rounded-2xl p-7 flex flex-col ${plan.highlight ? 'border border-blue-500/60 bg-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(37,99,235,0.25)]' : 'glass'}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                        onAnimationComplete={() => {
                            const card = refs.current[index];
                            if (card) card.classList.add('transition', 'duration-300', 'hover:-translate-y-1');
                        }}
                    >
                        {plan.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                {plan.badge}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 glass rounded-full px-3 py-1 text-xs w-max">
                                <plan.icon className="size-3.5" />
                                <span>{plan.title}</span>
                            </div>
                        </div>

                        <h2 className="text-4xl font-semibold">
                            {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                            <span className="text-sm font-normal text-gray-400 ml-1">/month</span>
                        </h2>
                        {isYearly && plan.monthlyPrice !== '$0' && (
                            <p className="text-xs text-green-400 mt-1">billed annually</p>
                        )}

                        <p className="text-gray-300 text-sm mt-3 mb-6">{plan.description}</p>

                        <Link
                            href={plan.buttonHref}
                            className={`btn text-center rounded-lg w-full py-2.5 mb-6 text-sm ${plan.highlight ? 'bg-white text-gray-900 hover:bg-gray-100' : 'glass'}`}
                        >
                            {plan.buttonText}
                        </Link>

                        <div className="flex flex-col gap-2.5 mt-auto">
                            {plan.features.map((feature, fi) => (
                                <div key={fi} className="flex items-start gap-2.5">
                                    <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${feature.included ? 'bg-blue-500/30 border border-blue-500/50' : 'bg-white/5 border border-white/10'}`}>
                                        {feature.included
                                            ? <CheckIcon className="size-3 text-blue-300" strokeWidth={3} />
                                            : <XIcon className="size-3 text-gray-500" strokeWidth={3} />
                                        }
                                    </div>
                                    <span className={`text-xs leading-5 ${feature.included ? 'text-gray-200' : 'text-gray-500'}`}>
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Guarantees */}
            <section className="mt-24 max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6">
                    {guarantees.map((g, i) => (
                        <motion.div
                            key={i}
                            className="glass rounded-xl p-6 flex items-center gap-4 max-w-64 w-full"
                            initial={{ y: 80, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                        >
                            <div className="rounded-full bg-blue-500/20 border border-blue-500/40 p-2.5">
                                <g.icon className="size-5 text-blue-300" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{g.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="mt-32 max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                >
                    <h2 className="text-3xl font-semibold">Compare all features</h2>
                    <p className="text-gray-400 mt-3 text-sm">Everything you need to know before choosing a plan.</p>
                </motion.div>

                <motion.div
                    className="glass rounded-2xl overflow-hidden"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70, mass: 1 }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                                    {plans.map(p => (
                                        <th key={p.title} className={`px-6 py-4 font-semibold ${p.highlight ? 'text-blue-300' : 'text-white'}`}>
                                            {p.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Ad Generations/month', '5', 'Unlimited', 'Unlimited'],
                                    ['Visual Styles', '2 styles', 'All 5 styles', 'All 5 + Custom'],
                                    ['Reference Image Upload', '✕', '✓', '✓'],
                                    ['Ad Variations', '1', 'Up to 5', 'Unlimited'],
                                    ['Analytics Dashboard', '✕', 'Basic', 'Advanced'],
                                    ['API Access', '✕', '✕', 'Full access'],
                                    ['Team Collaboration', '✕', '✕', 'Up to 20 seats'],
                                    ['Support', 'Community', 'Email + Chat', '24/7 Dedicated'],
                                    ['Custom AI Models', '✕', '✕', '✓'],
                                    ['SLA Guarantee', '✕', '✕', '99.9% uptime'],
                                ].map(([feature, free, pro, enterprise], i) => (
                                    <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                                        <td className="px-6 py-3.5 text-gray-300">{feature}</td>
                                        <td className="px-6 py-3.5 text-center text-gray-400">{free}</td>
                                        <td className="px-6 py-3.5 text-center text-blue-200">{pro}</td>
                                        <td className="px-6 py-3.5 text-center text-gray-200">{enterprise}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </section>

            {/* FAQ */}
            <section className="mt-32 max-w-3xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                >
                    <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
                    <p className="text-gray-400 mt-3 text-sm">Can't find your answer? <a href="mailto:support@adstudio.ai" className="text-blue-400 hover:underline">Contact support</a>.</p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className="glass rounded-xl overflow-hidden"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                        >
                            <button
                                className="w-full flex items-center justify-between px-6 py-4 text-left"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="font-medium text-sm text-white">{faq.q}</span>
                                <span className={`text-gray-400 transition-transform duration-200 text-lg leading-none ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pb-4">
                                    <p className="text-gray-400 text-sm leading-6">{faq.a}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mt-32 max-w-3xl mx-auto text-center">
                <motion.div
                    className="glass rounded-2xl px-8 py-14 relative overflow-hidden"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70, mass: 1 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/10 pointer-events-none" />
                    <h2 className="text-3xl font-semibold relative z-10">Start generating ads today</h2>
                    <p className="text-gray-300 mt-4 text-sm relative z-10 max-w-sm mx-auto">
                        Join thousands of marketers using AdStudio to create stunning ad visuals — powered by AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative z-10">
                        <Link href="/sign-up" className="btn glass py-3 px-8 w-full sm:w-auto text-center bg-white text-gray-900 hover:bg-gray-100 rounded-full">
                            Get Started Free
                        </Link>
                        <Link href="/docs" className="btn glass py-3 px-8 w-full sm:w-auto text-center rounded-full">
                            Read the Docs
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

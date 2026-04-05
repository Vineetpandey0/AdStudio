'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import {
    ShoppingBagIcon, BriefcaseIcon, MusicIcon, UtensilsIcon, HeartIcon, GraduationCapIcon,
    ChevronRightIcon, PlayCircleIcon, SparklesIcon, ZapIcon, TargetIcon, TrendingUpIcon,
    CheckIcon, ArrowRightIcon, StarIcon, UsersIcon, BarChart3Icon, PaletteIcon, GlobeIcon
} from 'lucide-react';

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const useCases = [
    {
        id: 'ecommerce',
        label: 'E-Commerce',
        icon: ShoppingBagIcon,
        tagline: 'Drive sales with scroll-stopping product ads',
        description:
            'E-commerce brands need a constant stream of fresh, visually compelling ad creatives. AdStudio lets you describe your product and get a studio-quality image in seconds — no designer needed.',
        audience: 'Online store owners, DTC brands, Amazon sellers',
        challenge: 'Creating enough unique ad creatives to avoid ad fatigue across Facebook, Instagram, and Google Shopping.',
        solution:
            'With AdStudio, you can generate dozens of ad variations per product. Swap styles, tweak the prompt, and produce entirely different visuals in seconds.',
        results: [
            { metric: '3x', label: 'More ad variations', desc: 'Test more creatives without hiring a designer.' },
            { metric: '72%', label: 'Faster production', desc: 'From product idea to live ad in under a minute.' },
            { metric: '40%', label: 'Lower CPC', desc: 'Fresh creatives reduce ad fatigue and improve CTR.' },
        ],
        workflow: [
            'Describe your product: name, target customer, key benefit, and platform.',
            'Choose "Bold" or "Playful" style for consumer products, or "Minimalist" for premium items.',
            'Upload your product photo as a reference image for brand consistency.',
            'Generate 3–5 variations and A/B test them in your ad manager.',
        ],
        promptExample: `A wireless charging pad with LED ambient lighting.
Target: tech-savvy professionals aged 25–40.
Platform: Instagram Stories.
Key feature: charges 3 devices simultaneously.
Style should feel futuristic and clean.`,
        color: 'blue',
    },
    {
        id: 'saas',
        label: 'SaaS & Tech',
        icon: BriefcaseIcon,
        tagline: 'Generate enterprise-grade ad visuals in seconds',
        description:
            'SaaS companies often struggle with making abstract software features feel tangible and compelling in ads. AdStudio bridges that gap with minimalist, corporate, or bold visuals tailored to your messaging.',
        audience: 'SaaS founders, B2B marketers, growth teams',
        challenge: 'Translating complex software benefits into visually engaging ad creatives that resonate with decision-makers.',
        solution:
            'AdStudio generates concept-driven visuals that convey your product\'s value proposition — productivity, efficiency, savings — without needing screenshots or UI mockups.',
        results: [
            { metric: '5x', label: 'Faster campaign launch', desc: 'Go live with new campaigns in hours, not weeks.' },
            { metric: '60%', label: 'Reduction in creative costs', desc: 'Replace expensive design agency retainers.' },
            { metric: '2.3x', label: 'Higher click-through rate', desc: 'Targeted, on-message visuals outperform stock photos.' },
        ],
        workflow: [
            'Write a benefit-focused prompt: "A CRM tool that helps sales teams close 30% more deals."',
            'Choose "Corporate" or "Minimalist" style for B2B audiences.',
            'Generate, review, and iterate — refine the prompt to get crisper messaging.',
            'Export and use directly in LinkedIn Ads, Google Display, or product hunt banners.',
        ],
        promptExample: `A project management SaaS for remote engineering teams.
Highlight: real-time collaboration, 99.9% uptime, integrates with GitHub.
Target: CTOs and Engineering Managers at Series A startups.
Tone: professional, trustworthy, modern.`,
        color: 'purple',
    },
    {
        id: 'creator',
        label: 'Content Creators',
        icon: MusicIcon,
        tagline: 'Professional ad visuals without a creative team',
        description:
            'Independent creators — YouTubers, podcasters, course creators, and musicians — need to promote their work without a big marketing budget. AdStudio levels the playing field.',
        audience: 'YouTubers, podcasters, musicians, influencers, course creators',
        challenge: 'Competing with large brands for audience attention without the budget for professional design or photography.',
        solution:
            'AdStudio gives creators access to the same AI tools used by major brands — generating polished, attention-grabbing ad images from simple descriptions.',
        results: [
            { metric: '10x', label: 'More content variety', desc: 'Create unique visuals for every post and campaign.' },
            { metric: '$0', label: 'Design costs eliminated', desc: 'No Canva Pro, no Fiverr designers needed.' },
            { metric: '48hrs', label: 'To first campaign', desc: 'From idea to running ads in under two days.' },
        ],
        workflow: [
            'Describe your content: course name, audience, key transformation they\'ll experience.',
            'Choose "Playful" or "Bold" to match your personal brand energy.',
            'Generate a hero banner for your course landing page or YouTube ad.',
            'Use multiple styles to find what resonates best with your audience.',
        ],
        promptExample: `An online photography course for beginners.
Instructor: professional wedding photographer.
Key transformation: go from iPhone snapshots to stunning DSLR portraits.
Target: creative women aged 22–35 who want a new skill.
Feel: warm, inspiring, aspirational.`,
        color: 'orange',
    },
    {
        id: 'food',
        label: 'Food & Beverage',
        icon: UtensilsIcon,
        tagline: 'Make your food brand impossible to scroll past',
        description:
            'In the food and beverage industry, visuals are everything. AdStudio generates mouth-watering, vibrant ad images that make customers crave your product before they even read the text.',
        audience: 'Restaurants, food startups, CPG brands, delivery services',
        challenge: 'Food photography is expensive, time-consuming, and you need fresh content constantly for social media.',
        solution:
            'Generate unlimited styled food ad concepts instantly. Use the Playful style for casual dining, Luxury for fine dining, or Bold for fast food promotions.',
        results: [
            { metric: '4x', label: 'More social posts', desc: 'Always have fresh visuals for Instagram and TikTok.' },
            { metric: '85%', label: 'Faster seasonal campaigns', desc: 'Launch holiday specials in minutes.' },
            { metric: '55%', label: 'Higher engagement', desc: 'AI-optimized food visuals outperform generic stock images.' },
        ],
        workflow: [
            'Describe your dish or product: ingredients, occasion, flavour profile.',
            'Use "Playful" for fun campaigns, "Luxury" for premium positioning.',
            'Upload a photo of your actual dish as a reference image.',
            'Generate Instagram, Facebook, and menu board versions in one session.',
        ],
        promptExample: `A handcrafted artisan pizza restaurant in New York City.
Speciality: wood-fired sourdough crust with locally sourced ingredients.
Campaign: weekend brunch launch with bottomless mimosas.
Target: NYC food lovers aged 25–45 looking for a premium weekend experience.
Mood: warm, rustic, celebratory.`,
        color: 'red',
    },
    {
        id: 'health',
        label: 'Health & Wellness',
        icon: HeartIcon,
        tagline: 'Build trust with premium wellness ad visuals',
        description:
            'Health and wellness brands need to communicate trust, results, and aspiration simultaneously. AdStudio generates clean, professional imagery that passes ad platform policies while standing out in the feed.',
        audience: 'Fitness brands, supplement companies, wellness apps, therapists, gyms',
        challenge: 'Health ads are heavily scrutinized by ad platforms. Creatives need to look professional and compliant while still converting.',
        solution:
            'Use Minimalist or Corporate styles for supplement brands, or Playful and Bold for fitness and gym brands. The AI generates aspirational, compliant-looking imagery from your descriptions.',
        results: [
            { metric: '90%', label: 'Ad approval rate', desc: 'Clean, policy-compliant visuals pass review faster.' },
            { metric: '3.5x', label: 'ROAS improvement', desc: 'Targeted styles outperform generic stock wellness photos.' },
            { metric: '6 min', label: 'Time per creative', desc: 'From prompt to ready-to-launch in minutes.' },
        ],
        workflow: [
            'Focus your prompt on the transformation, not medical claims.',
            'Use "Minimalist" or "Corporate" for supplements, "Bold" for gym/fitness.',
            'Upload brand photography as reference to maintain visual consistency.',
            'Generate separate creatives for each product SKU or service offering.',
        ],
        promptExample: `A daily greens supplement for busy professionals.
Key benefit: more energy, better focus, complete nutrition in 30 seconds.
Target: health-conscious professionals aged 30–50 who don't have time for meal prep.
Tone: clean, science-backed, modern.
No before/after imagery, focus on lifestyle and vitality.`,
        color: 'green',
    },
    {
        id: 'education',
        label: 'Education',
        icon: GraduationCapIcon,
        tagline: 'Attract more students with compelling visuals',
        description:
            'Educational institutions, online course platforms, and tutors need to communicate transformation and credibility. AdStudio helps you build visually compelling campaigns that convert curious learners into enrolled students.',
        audience: 'Universities, bootcamps, course creators, tutors, ed-tech startups',
        challenge: 'Making education feel exciting and worth the investment in a highly competitive market.',
        solution:
            'AdStudio generates motivational, outcome-focused visuals — diplomas, transformation moments, collaborative learning scenes — all from a single prompt.',
        results: [
            { metric: '2x', label: 'Enrollment inquiry rate', desc: 'Outcome-focused visuals generate more interest.' },
            { metric: '70%', label: 'Lower creative cost', desc: 'No need for expensive educational stock photo subscriptions.' },
            { metric: '15+', label: 'Creatives per campaign', desc: 'Cover every channel: social, search, email.' },
        ],
        workflow: [
            'Focus the prompt on the outcome: "Graduate with a job offer in 6 months."',
            'Use "Corporate" style for professional certifications, "Playful" for K-12 or hobbyist courses.',
            'Generate hero images, thumbnail banners, and social ad variations in one session.',
            'Export and use in Facebook Ads, Google Display, and email newsletter headers.',
        ],
        promptExample: `A 12-week UX Design bootcamp that guarantees job placement.
Outcome: students go from zero experience to hired junior UX designer.
Target: career-changers aged 24–35 currently in non-creative roles.
Tone: confident, exciting, credible.
Imagery concept: before/after career transformation, laptop and design tools.`,
        color: 'cyan',
    },
];

const colorMap = {
    blue: { pill: 'bg-blue-500/20 border-blue-500/40 text-blue-300', metric: 'text-blue-300', dot: 'bg-blue-400' },
    purple: { pill: 'bg-purple-500/20 border-purple-500/40 text-purple-300', metric: 'text-purple-300', dot: 'bg-purple-400' },
    orange: { pill: 'bg-orange-500/20 border-orange-500/40 text-orange-300', metric: 'text-orange-300', dot: 'bg-orange-400' },
    red: { pill: 'bg-red-500/20 border-red-500/40 text-red-300', metric: 'text-red-300', dot: 'bg-red-400' },
    green: { pill: 'bg-green-500/20 border-green-500/40 text-green-300', metric: 'text-green-300', dot: 'bg-green-400' },
    cyan: { pill: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300', metric: 'text-cyan-300', dot: 'bg-cyan-400' },
};

function CodePromptBlock({ prompt }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                    <SparklesIcon className="size-3" /> Example Prompt
                </span>
                <button onClick={copy} className="text-xs text-gray-400 hover:text-white transition flex items-center gap-1.5">
                    {copied ? <CheckIcon className="size-3 text-green-400" /> : null}
                    {copied ? 'Copied!' : 'Copy & Try'}
                </button>
            </div>
            <pre className="p-4 text-xs leading-6 text-gray-300 font-mono whitespace-pre-wrap">{prompt}</pre>
        </div>
    );
}

export default function UseCasesPage() {
    const [activeTab, setActiveTab] = useState('ecommerce');
    const active = useCases.find(u => u.id === activeTab);
    const colors = colorMap[active.color];
    const tabsRef = useRef(null);

    return (
        <main className="px-4 pb-32">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
                <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#1E3A8A] blur-[110px] opacity-60" />
                <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2563EB] blur-[110px] opacity-50" />
                <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#38BDF8] blur-[110px] opacity-40" />
            </div>

            {/* Hero */}
            <section className="flex flex-col items-center pt-32 pb-16 text-center max-w-4xl mx-auto">
                <motion.div
                    className="btn glass py-1 px-4 text-xs mb-6 w-max"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    Real-World Use Cases
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-6xl font-semibold tracking-tight"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70 }}
                >
                    Who uses{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AdStudio</span>
                </motion.h1>
                <motion.p
                    className="text-gray-300 text-base max-w-xl mt-6 leading-7"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    From solo creators to enterprise marketing teams — AdStudio adapts to every industry and use case. Explore how different businesses use AI-generated ads to grow faster.
                </motion.p>

                {/* Stats row */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 mt-10"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    {[
                        { icon: UsersIcon, value: '12,000+', label: 'Active users' },
                        { icon: BarChart3Icon, value: '500K+', label: 'Ads generated' },
                        { icon: GlobeIcon, value: '80+', label: 'Countries' },
                        { icon: StarIcon, value: '4.9/5', label: 'Average rating' },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2.5 glass rounded-xl px-4 py-3">
                            <stat.icon className="size-4 text-blue-300" />
                            <div>
                                <p className="text-sm font-semibold text-white">{stat.value}</p>
                                <p className="text-xs text-gray-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Tab Navigation */}
            <div className="max-w-6xl mx-auto" ref={tabsRef}>
                <div className="flex overflow-x-auto pb-1 gap-2 scrollbar-hide">
                    {useCases.map((uc) => (
                        <button
                            key={uc.id}
                            onClick={() => setActiveTab(uc.id)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${activeTab === uc.id
                                ? `${colorMap[uc.color].pill} border`
                                : 'glass text-gray-400 hover:text-white border border-transparent'
                                }`}
                        >
                            <uc.icon className="size-3.5" />
                            {uc.label}
                        </button>
                    ))}
                </div>

                {/* Active Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 70, mass: 1 }}
                        className="mt-8"
                    >
                        {/* Header */}
                        <div className="glass rounded-2xl p-8 mb-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl border ${colors.pill} flex items-center justify-center flex-shrink-0`}>
                                    <active.icon className="size-6" />
                                </div>
                                <div className="flex-1">
                                    <div className={`text-xs font-semibold mb-2 border ${colors.pill} rounded-full px-3 py-1 w-max`}>
                                        {active.label}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{active.tagline}</h2>
                                    <p className="text-gray-300 text-sm leading-6 max-w-2xl">{active.description}</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <UsersIcon className="size-3.5 text-gray-500" />
                                        <p className="text-xs text-gray-500">{active.audience}</p>
                                    </div>
                                </div>
                                <Link href="/sign-up" className="btn glass py-2.5 px-6 text-sm flex items-center gap-2 flex-shrink-0">
                                    Try it Free <ArrowRightIcon className="size-3.5" />
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left column */}
                            <div className="space-y-6">
                                {/* Challenge → Solution */}
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                                        <TargetIcon className="size-4 text-red-400" /> The Challenge
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-6">{active.challenge}</p>
                                    <div className="h-px bg-white/10 my-5" />
                                    <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                                        <ZapIcon className="size-4 text-yellow-400" /> AdStudio's Solution
                                    </h3>
                                    <p className="text-sm text-gray-300 leading-6">{active.solution}</p>
                                </div>

                                {/* Workflow */}
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                                        <PlayCircleIcon className="size-4 text-blue-300" /> Step-by-Step Workflow
                                    </h3>
                                    <div className="space-y-4">
                                        {active.workflow.map((step, i) => (
                                            <div key={i} className="flex gap-3">
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-full border ${colors.pill} flex items-center justify-center text-xs font-semibold mt-0.5`}>
                                                    {i + 1}
                                                </div>
                                                <p className="text-xs text-gray-300 leading-6">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="space-y-6">
                                {/* Results */}
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                                        <TrendingUpIcon className="size-4 text-green-400" /> Typical Results
                                    </h3>
                                    <div className="space-y-4">
                                        {active.results.map((r, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className={`text-3xl font-bold ${colors.metric} flex-shrink-0 w-16 text-center`}>{r.metric}</div>
                                                <div>
                                                    <p className="text-xs font-semibold text-white">{r.label}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Example Prompt */}
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                                        <PaletteIcon className="size-4 text-purple-300" /> Example Prompt
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-3">Copy this prompt and paste it directly into the Ad Studio:</p>
                                    <CodePromptBlock prompt={active.promptExample} />
                                    <Link
                                        href="/studio"
                                        className="mt-4 btn glass py-2.5 w-full text-center text-sm flex items-center justify-center gap-2"
                                    >
                                        <SparklesIcon className="size-3.5" />
                                        Generate this ad now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* All Industries Grid */}
            <section className="mt-32 max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 320, damping: 70 }}
                >
                    <h2 className="text-3xl font-semibold">Every industry, every campaign</h2>
                    <p className="text-gray-400 mt-3 text-sm max-w-lg mx-auto">
                        AdStudio isn't limited to a single style or industry. The platform adapts to your brand voice, target audience, and campaign goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {useCases.map((uc, index) => {
                        const c = colorMap[uc.color];
                        return (
                            <motion.div
                                key={uc.id}
                                className={`glass rounded-2xl p-5 cursor-pointer group ${activeTab === uc.id ? `border ${c.pill.split(' ').find(x => x.startsWith('border-'))}` : ''}`}
                                initial={{ y: 80, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, type: 'spring', stiffness: 320, damping: 70 }}
                                onClick={() => {
                                    setActiveTab(uc.id);
                                    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                <div className={`w-10 h-10 rounded-xl border ${c.pill} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <uc.icon className="size-5" />
                                </div>
                                <h3 className="text-sm font-semibold text-white mb-2">{uc.label}</h3>
                                <p className="text-xs text-gray-400 leading-5 mb-4">{uc.tagline}</p>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 group-hover:text-white transition">
                                    <span>Explore use case</span>
                                    <ChevronRightIcon className="size-3 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials strip */}
            <section className="mt-32 max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 320, damping: 70 }}
                >
                    <h2 className="text-3xl font-semibold">What our users say</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        {
                            name: 'Sarah Chen', role: 'Founder, WearLuna (E-Commerce)', color: 'blue',
                            quote: 'We went from spending $3,000/month on a design agency to $49/month on AdStudio. The quality is honestly better — and we can launch new creatives same-day.',
                        },
                        {
                            name: 'Marcus O.', role: 'Growth Lead, Stackflow SaaS', color: 'purple',
                            quote: 'B2B creative was our bottleneck. AdStudio\'s Corporate style nails the look — clean, credible, professional. Our LinkedIn CTR doubled in the first month.',
                        },
                        {
                            name: 'Priya Sharma', role: 'Fitness Coach & Creator', color: 'green',
                            quote: 'I have zero design skills. With AdStudio I just describe my workout program and get Instagram-ready ads. My course enrollment went up 40% after switching.',
                        },
                    ].map((t, i) => {
                        const c = colorMap[t.color];
                        return (
                            <motion.div
                                key={i}
                                className="glass rounded-2xl p-6"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: 'spring', stiffness: 320, damping: 70 }}
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, si) => (
                                        <StarIcon key={si} className="size-3.5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-300 leading-6 mb-5">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full border ${c.pill} flex items-center justify-center text-xs font-semibold`}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-white">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="mt-32 max-w-3xl mx-auto text-center">
                <motion.div
                    className="glass rounded-2xl px-8 py-14 relative overflow-hidden"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/10 pointer-events-none" />
                    <h2 className="text-3xl font-semibold relative z-10">Ready to generate your first ad?</h2>
                    <p className="text-gray-300 mt-4 text-sm relative z-10 max-w-sm mx-auto">
                        Start for free — no credit card required. Your first 5 ads are on us.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative z-10">
                        <Link href="/sign-up" className="btn py-3 px-8 w-full sm:w-auto text-center bg-white text-gray-900 hover:bg-gray-100 rounded-full">
                            Start for Free
                        </Link>
                        <Link href="/pricing" className="btn glass py-3 px-8 w-full sm:w-auto text-center rounded-full">
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

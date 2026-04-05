'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BookOpenIcon, CodeIcon, ZapIcon, ImageIcon, UploadIcon, LayoutDashboardIcon,
    ChevronRightIcon, MenuIcon, XIcon, CheckIcon, CopyIcon, ExternalLinkIcon,
    SparklesIcon, ShieldCheckIcon, AlertCircleIcon, InfoIcon, KeyIcon, SettingsIcon,
    PlayCircleIcon, GridIcon, RefreshCwIcon
} from 'lucide-react';

// ─── Sidebar sections ─────────────────────────────────────────────────────────
const sidebar = [
    {
        group: 'Getting Started',
        icon: BookOpenIcon,
        items: [
            { id: 'introduction', label: 'Introduction' },
            { id: 'quickstart', label: 'Quick Start' },
            { id: 'authentication', label: 'Authentication' },
        ],
    },
    {
        group: 'Core Features',
        icon: SparklesIcon,
        items: [
            { id: 'studio', label: 'Ad Studio' },
            { id: 'styles', label: 'Visual Styles' },
            { id: 'reference-image', label: 'Reference Images' },
        ],
    },
    {
        group: 'Dashboard',
        icon: LayoutDashboardIcon,
        items: [
            { id: 'dashboard-overview', label: 'Overview' },
            { id: 'managing-ads', label: 'Managing Ads' },
            { id: 'preview', label: 'Ad Preview' },
        ],
    },
    {
        group: 'API Reference',
        icon: CodeIcon,
        items: [
            { id: 'api-generate', label: 'POST /api/generate' },
            { id: 'api-upload', label: 'POST /api/upload' },
            { id: 'api-ads', label: 'GET /api/ads' },
        ],
    },
    {
        group: 'Configuration',
        icon: SettingsIcon,
        items: [
            { id: 'environment-vars', label: 'Environment Variables' },
            { id: 'limits', label: 'Rate Limits & Quotas' },
        ],
    },
];

// ─── Code block component ─────────────────────────────────────────────────────
function CodeBlock({ code, lang = 'bash' }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative glass rounded-xl overflow-hidden my-4 group">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <span className="text-xs text-gray-500 font-mono">{lang}</span>
                <button
                    onClick={copy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
                >
                    {copied ? <CheckIcon className="size-3.5 text-green-400" /> : <CopyIcon className="size-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-xs leading-6 text-gray-200 font-mono">
                <code>{code}</code>
            </pre>
        </div>
    );
}

// ─── Callout component ────────────────────────────────────────────────────────
function Callout({ type = 'info', children }) {
    const styles = {
        info: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', icon: InfoIcon, color: 'text-blue-300' },
        warning: { border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', icon: AlertCircleIcon, color: 'text-yellow-300' },
        success: { border: 'border-green-500/40', bg: 'bg-green-500/10', icon: CheckIcon, color: 'text-green-300' },
    };
    const s = styles[type];
    return (
        <div className={`my-5 flex gap-3 rounded-xl border ${s.border} ${s.bg} px-4 py-3`}>
            <s.icon className={`size-4.5 mt-0.5 flex-shrink-0 ${s.color}`} />
            <p className="text-sm text-gray-300 leading-6">{children}</p>
        </div>
    );
}

// ─── Step component ───────────────────────────────────────────────────────────
function Step({ number, title, children }) {
    return (
        <div className="flex gap-4 my-6">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs font-semibold text-blue-300">
                {number}
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-2">{title}</p>
                <div className="text-sm text-gray-400 leading-6">{children}</div>
            </div>
        </div>
    );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function DocSection({ id, title, badge, children }) {
    return (
        <section id={id} className="scroll-mt-24 mb-20">
            <div className="flex items-center gap-3 mb-5">
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
                {badge && (
                    <span className="text-xs bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-full px-2.5 py-0.5">
                        {badge}
                    </span>
                )}
            </div>
            <div className="text-sm text-gray-300 leading-7 space-y-3">{children}</div>
        </section>
    );
}

// ─── API endpoint table ───────────────────────────────────────────────────────
function ParamTable({ params }) {
    return (
        <div className="glass rounded-xl overflow-hidden my-4">
            <table className="w-full text-xs">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Parameter</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Type</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Required</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {params.map((p, i) => (
                        <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                            <td className="px-4 py-3 font-mono text-blue-300">{p.name}</td>
                            <td className="px-4 py-3 text-purple-300">{p.type}</td>
                            <td className="px-4 py-3">
                                {p.required
                                    ? <span className="text-red-400">required</span>
                                    : <span className="text-gray-500">optional</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-400">{p.desc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-20% 0% -60% 0%' }
        );

        document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileSidebarOpen(false);
    };

    return (
        <div className="min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
                <div className="absolute rounded-full top-40 left-1/4 size-96 bg-[#1E3A8A] blur-[120px] opacity-40" />
                <div className="absolute rounded-full bottom-40 right-1/4 size-96 bg-[#2563EB] blur-[120px] opacity-30" />
            </div>

            {/* Docs Hero */}
            <section className="text-center pt-24 pb-12 px-4">
                <motion.div
                    className="btn glass py-1 px-4 text-xs mb-4 w-max mx-auto"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    AdStudio Documentation v1.0
                </motion.div>
                <motion.h1
                    className="text-4xl md:text-5xl font-semibold tracking-tight"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 70 }}
                >
                    Everything you need to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        build with AdStudio
                    </span>
                </motion.h1>
                <motion.p
                    className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    Comprehensive guides, API references, and examples to help you generate professional ads with AI.
                </motion.p>

                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4 mt-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 320, damping: 70 }}
                >
                    <button onClick={() => scrollTo('quickstart')} className="btn glass py-2.5 px-6 flex items-center gap-2 text-sm">
                        <PlayCircleIcon className="size-4" /> Quick Start
                    </button>
                    <button onClick={() => scrollTo('api-generate')} className="btn glass py-2.5 px-6 flex items-center gap-2 text-sm">
                        <CodeIcon className="size-4" /> API Reference
                    </button>
                </motion.div>
            </section>

            {/* Mobile sidebar toggle */}
            <div className="lg:hidden sticky top-16 z-40 px-4 py-2 bg-black/60 backdrop-blur-lg border-b border-white/10 flex items-center gap-3">
                <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="p-1.5 glass rounded-lg">
                    {mobileSidebarOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
                </button>
                <span className="text-sm text-gray-400">Table of Contents</span>
            </div>

            {/* Mobile sidebar */}
            {mobileSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-30 pt-32 bg-black/80 backdrop-blur-xl overflow-y-auto px-6 pb-10">
                    {sidebar.map((group) => (
                        <div key={group.group} className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <group.icon className="size-3.5" /> {group.group}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === item.id ? 'bg-blue-500/20 text-blue-300' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Content layout */}
            <div className="max-w-7xl mx-auto flex gap-8 px-4 md:px-8 pb-32">
                {/* Sidebar — desktop */}
                <aside className="hidden lg:block sticky top-24 self-start w-60 flex-shrink-0 h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                    {sidebar.map((group) => (
                        <div key={group.group} className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <group.icon className="size-3" /> {group.group}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollTo(item.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition ${activeSection === item.id ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0 pt-4">

                    {/* ── INTRODUCTION ── */}
                    <DocSection id="introduction" title="Introduction">
                        <p>
                            <strong className="text-white">AdStudio</strong> is an AI-powered advertisement generation platform built on Next.js. It allows anyone — from independent creators to large marketing teams — to generate stunning, professional ad images in seconds using a simple text prompt.
                        </p>
                        <p>
                            Under the hood, AdStudio uses <strong className="text-white">Hugging Face Inference API</strong> to generate images and <strong className="text-white">Cloudinary</strong> to store, manage, and deliver them at scale. There is no traditional backend database — everything is stored as metadata inside Cloudinary.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                            {[
                                { icon: ZapIcon, title: 'Instant Generation', desc: 'Ad images in 10–25 seconds via HF Stable Diffusion.' },
                                { icon: ImageIcon, title: '5 Visual Styles', desc: 'Minimalist, Bold, Luxury, Playful, Corporate.' },
                                { icon: LayoutDashboardIcon, title: 'Ad Dashboard', desc: 'View, preview, and manage all your generated ads.' },
                            ].map((f, i) => (
                                <div key={i} className="glass rounded-xl p-4 space-y-2">
                                    <f.icon className="size-5 text-blue-300" />
                                    <p className="text-xs font-semibold text-white">{f.title}</p>
                                    <p className="text-xs text-gray-400">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <Callout type="info">
                            AdStudio is currently in <strong>v1.0</strong>. The API is stable for all features documented here.
                        </Callout>
                    </DocSection>

                    {/* ── QUICK START ── */}
                    <DocSection id="quickstart" title="Quick Start" badge="5 min">
                        <p>Get your first AI-generated ad in under 5 minutes. Follow these steps:</p>
                        <Step number="1" title="Create an account">
                            Go to <Link href="/sign-up" className="text-blue-400 hover:underline">adstudio.ai/sign-up</Link> and create a free account with your email or Google account. No credit card required.
                        </Step>
                        <Step number="2" title="Open the Ad Studio">
                            Navigate to <strong className="text-white">/studio</strong> from the dashboard. This is where all ad generation happens.
                        </Step>
                        <Step number="3" title="Write your prompt">
                            Enter a description of your product or campaign. Be specific for better results:
                            <CodeBlock lang="example prompt" code={`A premium noise-cancelling headphone for professionals. 
Target audience: remote workers aged 25–40. 
Highlight: 40-hour battery life and studio-quality sound.`} />
                        </Step>
                        <Step number="4" title="Choose a visual style">
                            Select one of the five available styles. <strong className="text-white">Bold</strong> works well for consumer products; <strong className="text-white">Minimalist</strong> for SaaS or clean brands.
                        </Step>
                        <Step number="5" title="(Optional) Upload a reference image">
                            Upload a product photo or brand image. Hugging Face will use it for style context while generating the ad.
                        </Step>
                        <Step number="6" title="Click Generate">
                            Hit <strong className="text-white">Generate Ad</strong>. Wait 10–25 seconds. Your ad will appear and automatically save to your dashboard.
                        </Step>
                        <Callout type="success">
                            Your ad is automatically saved to Cloudinary and appears in your <strong>/dashboard</strong>. No manual saving needed.
                        </Callout>
                    </DocSection>

                    {/* ── AUTHENTICATION ── */}
                    <DocSection id="authentication" title="Authentication">
                        <p>
                            AdStudio uses <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">Clerk <ExternalLinkIcon className="size-3" /></a> for authentication. All pages under <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/dashboard</code>, <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/studio</code>, and <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/preview</code> require a signed-in user.
                        </p>
                        <p>Unauthenticated users are automatically redirected to <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/sign-in</code>. After signing in, they are returned to the page they originally requested.</p>
                        <div className="glass rounded-xl p-4 my-4 space-y-2">
                            <p className="text-xs font-semibold text-gray-300">Auth Routes</p>
                            {[
                                ['/sign-in', 'Sign in with email or Google'],
                                ['/sign-up', 'Create a new account'],
                                ['/dashboard', 'Protected — requires auth'],
                                ['/studio', 'Protected — requires auth'],
                            ].map(([route, desc]) => (
                                <div key={route} className="flex items-center gap-3 text-xs">
                                    <code className="text-blue-300 w-28 flex-shrink-0">{route}</code>
                                    <span className="text-gray-400">{desc}</span>
                                </div>
                            ))}
                        </div>
                        <Callout type="warning">
                            API routes (<code>/api/*</code>) do <strong>not</strong> enforce Clerk authentication directly — they rely on server-side environment variable secrets. Never expose your <code>HUGGINGFACE_API_KEY</code> or <code>CLOUDINARY_API_SECRET</code> to the client.
                        </Callout>
                    </DocSection>

                    {/* ── AD STUDIO ── */}
                    <DocSection id="studio" title="Ad Studio">
                        <p>
                            The Ad Studio (<code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/studio</code>) is the core generation interface. It combines a prompt input, style selector, optional reference image upload, and the generated result viewer.
                        </p>
                        <div className="my-6 space-y-4">
                            {[
                                { label: 'Prompt Input', desc: 'A text area for your product/campaign description. Be as detailed as possible — include target audience, platform, and key selling points.' },
                                { label: 'Image Uploader', desc: 'Optional. Upload a PNG/JPEG/WEBP reference image (max 10MB). It is uploaded to Cloudinary (/uploads), then passed to Hugging Face as base64 data.' },
                                { label: 'Generate Button', desc: 'Triggers a POST to /api/generate. Disabled during loading. Shows a spinner while Hugging Face processes.' },
                                { label: 'Result Viewer', desc: 'Displays the generated image inline. Shows the Cloudinary URL, the prompt used, and a "View in Dashboard" link.' },
                            ].map((item, i) => (
                                <div key={i} className="glass rounded-xl p-4">
                                    <p className="text-xs font-semibold text-white mb-1">
                                        <ChevronRightIcon className="size-3 inline text-blue-400 mr-1" />{item.label}
                                    </p>
                                    <p className="text-xs text-gray-400 leading-5">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <Callout type="info">
                            Generation typically takes <strong>10–25 seconds</strong>. The API call is synchronous — the route handler waits for Hugging Face to respond before returning. Always show a loading state in custom integrations.
                        </Callout>
                    </DocSection>

                    {/* ── VISUAL STYLES ── */}
                    <DocSection id="styles" title="Visual Styles">
                        <p>AdStudio supports five visual styles, each with a unique prompt template sent to Hugging Face:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                            {[
                                { name: 'Minimalist', desc: 'Clean white space, simple typography, single focal point, minimal color palette (2–3 colors). Perfect for SaaS, lifestyle, and luxury goods.' },
                                { name: 'Bold', desc: 'High contrast, strong typography, vivid saturated colors, dramatic composition. Ideal for consumer electronics, sports, and events.' },
                                { name: 'Luxury', desc: 'Dark moody backgrounds, gold/silver accents, elegant serif typography, cinematic lighting. Best for premium products, jewelry, watches.' },
                                { name: 'Playful', desc: 'Bright fun colors, rounded shapes, whimsical elements, energetic composition. Great for food, kids products, and entertainment.' },
                                { name: 'Corporate', desc: 'Professional blue/grey palette, clean layout, trustworthy imagery, clear hierarchy. Perfect for B2B, finance, and professional services.' },
                            ].map((style, i) => (
                                <div key={i} className="glass rounded-xl p-4">
                                    <p className="text-xs font-semibold text-blue-300 mb-1.5">{style.name}</p>
                                    <p className="text-xs text-gray-400 leading-5">{style.desc}</p>
                                </div>
                            ))}
                        </div>
                        <CodeBlock lang="javascript" code={`// Style identifier sent to /api/generate
// Valid values:
const styles = ['minimalist', 'bold', 'luxury', 'playful', 'corporate']

await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    prompt: 'Your product description',
    style: 'bold'  // one of the above
  })
})`} />
                    </DocSection>

                    {/* ── REFERENCE IMAGE ── */}
                    <DocSection id="reference-image" title="Reference Images">
                        <p>
                            You can upload a reference image to guide Hugging Face's output. This is useful for maintaining brand consistency, matching a specific visual direction, or using an existing product photo as context.
                        </p>
                        <h3 className="text-base font-semibold text-white mt-6 mb-3">Upload Flow</h3>
                        <Step number="1" title="Upload the image (POST /api/upload)">
                            Send a <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">multipart/form-data</code> request with the file. The server uploads it to Cloudinary and returns the URL.
                            <CodeBlock lang="javascript" code={`const formData = new FormData();
formData.append('file', fileInput.files[0]);

const res = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { data } = await res.json();
// data.url → Cloudinary URL
// data.publicId → Cloudinary public ID`} />
                        </Step>
                        <Step number="2" title="Pass URL to /api/generate">
                            Include the Cloudinary URL as <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">referenceImageUrl</code> in the generate request.
                            <CodeBlock lang="javascript" code={`await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Premium headphones for remote workers',
    style: 'minimalist',
    referenceImageUrl: data.url  // from step 1
  })
})`} />
                        </Step>
                        <Callout type="warning">
                            Supported formats: <strong>JPEG, PNG, WEBP</strong>. Maximum file size: <strong>10MB</strong>. Images are stored in Cloudinary's <code>adstudio/uploads/</code> folder.
                        </Callout>
                    </DocSection>

                    {/* ── DASHBOARD OVERVIEW ── */}
                    <DocSection id="dashboard-overview" title="Dashboard Overview">
                        <p>
                            The Dashboard (<code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/dashboard</code>) is your central gallery for all generated ads. It fetches up to 20 most recent ads from Cloudinary via <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">GET /api/ads</code>.
                        </p>
                        <div className="my-5 space-y-3">
                            {[
                                { icon: GridIcon, label: 'Gallery View', desc: 'Responsive grid showing all generated ads with thumbnail, prompt summary, and creation date.' },
                                { icon: RefreshCwIcon, label: 'Auto-refresh', desc: 'Dashboard fetches fresh data on every page load. Ads appear within seconds of generation.' },
                                { icon: ImageIcon, label: 'Ad Cards', desc: 'Each card shows the image, style used, and date. Click to open the full preview page.' },
                            ].map((f, i) => (
                                <div key={i} className="glass rounded-xl p-4 flex items-start gap-3">
                                    <f.icon className="size-4.5 text-blue-300 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-semibold text-white mb-1">{f.label}</p>
                                        <p className="text-xs text-gray-400">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DocSection>

                    {/* ── MANAGING ADS ── */}
                    <DocSection id="managing-ads" title="Managing Ads">
                        <p>All ads generated through AdStudio are stored in Cloudinary with rich metadata. Each ad includes:</p>
                        <CodeBlock lang="json" code={`{
  "url": "https://res.cloudinary.com/.../adstudio/generated/abc123",
  "publicId": "adstudio/generated/abc123",
  "context": {
    "prompt": "Premium headphones for remote workers",
    "style": "minimalist",
    "created_at": "2026-04-05T12:00:00Z",
    "source": "huggingface"
  }
}`} />
                        <p>You can use the Cloudinary URL directly in your campaigns, landing pages, or social media posts. All images are served through Cloudinary's CDN with automatic optimization (<code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">f_auto,q_auto</code>).</p>
                    </DocSection>

                    {/* ── PREVIEW ── */}
                    <DocSection id="preview" title="Ad Preview">
                        <p>
                            Each ad has a dedicated preview page at <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/preview/[id]</code> where <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">[id]</code> is the URL-encoded Cloudinary public ID.
                        </p>
                        <p>The preview page is a <strong className="text-white">Server Component</strong> — it fetches the ad data server-side for fast first load and proper SEO metadata.</p>
                        <CodeBlock lang="text" code={`# Example preview URL:
/preview/adstudio%2Fgenerated%2FxyzABC123

# Decoded public ID:
adstudio/generated/xyzABC123`} />
                        <Callout type="info">
                            The preview page uses <code>GET /api/ads/[id]</code> internally. It returns the full ad metadata including the original prompt, style, and generation timestamp.
                        </Callout>
                    </DocSection>

                    {/* ── API: GENERATE ── */}
                    <DocSection id="api-generate" title="POST /api/generate" badge="Core">
                        <p>The primary generation endpoint. Calls Hugging Face AI and saves the result to Cloudinary.</p>
                        <h3 className="text-base font-semibold text-white mt-6 mb-3">Request</h3>
                        <ParamTable params={[
                            { name: 'prompt', type: 'string', required: true, desc: 'Product/campaign description. Be as specific as possible.' },
                            { name: 'style', type: 'string', required: true, desc: 'Visual style: minimalist | bold | luxury | playful | corporate' },
                            { name: 'referenceImageUrl', type: 'string', required: false, desc: 'Cloudinary URL of a reference image uploaded via /api/upload' },
                        ]} />
                        <CodeBlock lang="javascript" code={`// Request
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A premium skincare serum targeting women 30–50. Highlight: anti-aging, dermatologist tested.',
    style: 'luxury',
    referenceImageUrl: 'https://res.cloudinary.com/...' // optional
  })
});

// Response (success)
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/.../adstudio/generated/abc123",
    "publicId": "adstudio/generated/abc123",
    "metadata": { "prompt": "...", "style": "luxury", "created_at": "..." }
  }
}

// Response (error)
{
  "error": "The prompt was flagged by safety filters. Please revise your description."
}`} />
                        <h3 className="text-base font-semibold text-white mt-6 mb-3">Latency</h3>
                        <div className="flex flex-wrap gap-3 my-3">
                            <div className="glass rounded-lg px-4 py-2.5 text-xs">Text-only: <span className="text-blue-300">5–10 seconds</span></div>
                            <div className="glass rounded-lg px-4 py-2.5 text-xs">With reference image: <span className="text-blue-300">8–15 seconds</span></div>
                        </div>
                    </DocSection>

                    {/* ── API: UPLOAD ── */}
                    <DocSection id="api-upload" title="POST /api/upload">
                        <p>Upload a user reference image to Cloudinary. Must be called before <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">/api/generate</code> if you want to use a reference image.</p>
                        <ParamTable params={[
                            { name: 'file', type: 'File (FormData)', required: true, desc: 'Image file. Supported: JPEG, PNG, WEBP. Max size: 10MB.' },
                        ]} />
                        <CodeBlock lang="javascript" code={`const formData = new FormData();
formData.append('file', file); // File object from <input type="file">

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData  // do NOT set Content-Type header manually
});

// Response (success)
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/.../adstudio/uploads/xyz",
    "publicId": "adstudio/uploads/xyz",
    "width": 1024,
    "height": 1024
  }
}`} />
                    </DocSection>

                    {/* ── API: ADS ── */}
                    <DocSection id="api-ads" title="GET /api/ads">
                        <p>Returns the 20 most recently generated ads from Cloudinary, tagged <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">adstudio-generated</code>. Used by the Dashboard page.</p>
                        <CodeBlock lang="javascript" code={`const response = await fetch('/api/ads');
const { data } = await response.json();

// data is an array of ad objects:
[
  {
    "url": "https://res.cloudinary.com/.../abc",
    "publicId": "adstudio/generated/abc",
    "context": {
      "prompt": "...",
      "style": "bold",
      "created_at": "2026-04-05T10:00:00Z"
    },
    "created_at": "2026-04-05T10:00:00.000Z"
  },
  ...
]`} />
                        <Callout type="info">
                            The endpoint returns a maximum of <strong>20 ads</strong>. Pagination support is planned for v1.1.
                        </Callout>
                    </DocSection>

                    {/* ── ENVIRONMENT VARIABLES ── */}
                    <DocSection id="environment-vars" title="Environment Variables">
                        <p>All environment variables must be defined in your <code className="bg-white/10 text-blue-200 px-1 py-0.5 rounded text-xs">.env.local</code> file. <strong className="text-red-400">Never commit this file to version control.</strong></p>
                        <CodeBlock lang=".env.local" code={`# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Cloudinary (Image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret

# Hugging Face (AI generation)
HUGGINGFACE_API_KEY=hf_...`} />
                        <div className="glass rounded-xl overflow-hidden my-4">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Variable</th>
                                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Exposure</th>
                                        <th className="text-left px-4 py-3 text-gray-400 font-medium">Where to get it</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'Client + Server', 'clerk.com → API Keys'],
                                        ['CLERK_SECRET_KEY', 'Server only', 'clerk.com → API Keys'],
                                        ['CLOUDINARY_CLOUD_NAME', 'Server only', 'cloudinary.com → Dashboard'],
                                        ['CLOUDINARY_API_KEY', 'Server only', 'cloudinary.com → Dashboard'],
                                        ['CLOUDINARY_API_SECRET', 'Server only', 'cloudinary.com → Dashboard'],
                                        ['HUGGINGFACE_API_KEY', 'Server only', 'huggingface.co/settings/tokens'],
                                    ].map(([name, exposure, source], i) => (
                                        <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                                            <td className="px-4 py-3 font-mono text-blue-200">{name}</td>
                                            <td className="px-4 py-3 text-gray-400">{exposure}</td>
                                            <td className="px-4 py-3 text-gray-400">{source}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Callout type="warning">
                            <code>HUGGINGFACE_API_KEY</code> and <code>CLOUDINARY_API_SECRET</code> are server-only. Never prefix them with <code>NEXT_PUBLIC_</code> or use them in client components.
                        </Callout>
                    </DocSection>

                    {/* ── RATE LIMITS ── */}
                    <DocSection id="limits" title="Rate Limits & Quotas">
                        <p>Rate limits are enforced at two levels:</p>
                        <div className="my-5 space-y-3">
                            {[
                                { title: 'Free Plan', desc: '5 ad generations per calendar month. Resets on the 1st of each month.' },
                                { title: 'Professional Plan', desc: 'Unlimited generations. Subject to Hugging Face API fair-use policy.' },
                                { title: 'Hugging Face API Quotas', desc: 'Hugging Face enforces rate limits on the free tier. On HTTP 429 errors, AdStudio returns a user-friendly "try again" message.' },
                                { title: 'Cloudinary Upload Size', desc: 'Reference images: 10MB max. Generated images: typically 1–4MB (losslessly stored).' },
                            ].map((item, i) => (
                                <div key={i} className="glass rounded-xl p-4">
                                    <p className="text-xs font-semibold text-white mb-1">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <Callout type="info">
                            If you hit the Hugging Face quota limit, wait a few minutes and try again. Enterprise plans include priority queue access.
                        </Callout>
                    </DocSection>

                </main>
            </div>
        </div>
    );
}

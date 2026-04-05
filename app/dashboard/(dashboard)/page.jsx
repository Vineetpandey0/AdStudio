'use client';

import { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, Upload, Loader2, Download, Share2, 
  Trash2, Layers, CheckCircle2, AlertCircle, 
  ChevronRight, RefreshCw, Eye, Wand2, XCircle,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';


// ─── Styles Config ────────────────────────────────────────────────────────────
const STYLES = [
  { id: 'minimalist', name: 'Minimalist', desc: 'Clean, simple, airy', icon: Layers, color: 'blue' },
  { id: 'bold', name: 'Bold', desc: 'High contrast, dramatic', icon: Wand2, color: 'purple' },
  { id: 'luxury', name: 'Luxury', desc: 'Moody, premium lighting', icon: Sparkles, color: 'emerald' },
  { id: 'playful', name: 'Playful', desc: 'Color, energy, shapes', icon: Layers, color: 'amber' },
  { id: 'corporate', name: 'Corporate', desc: 'Trustworthy, hierarchy', icon: Layers, color: 'slate' },
];

const PROMPT_SUGGESTIONS = [
  "A minimalist ad for premium smartwatches showing sleek aluminum finish against a soft grey backdrop.",
  "High-energy bold graphic for a revolutionary new energy drink for high-performers.",
  "Luxury cinematic ad for organic perfumes with moody lighting, gold accents and premium product bottle.",
  "Whimsical playful ad for organic kids snacks with bright colors and energetic shapes.",
  "A professional corporate layout for a FinTech app focusing on trust, security and clean data charts."
];

// ─── Components ───────────────────────────────────────────────────────────────

function AdCard({ ad }) {
  return (
    <motion.div 
      className="glass rounded-xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={ad.url} 
          alt={ad.context?.prompt || 'Generated Ad'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <a href={ad.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition">
            <Eye className="w-5 h-5" />
          </a>
          <a href={`${ad.url}?dl=true`} download className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition">
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-gray-400 line-clamp-2 italic mb-2">"{ad.context?.prompt || 'No prompt info'}"</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{ad.context?.style || 'minimal'}</span>
          <span className="text-[10px] text-gray-600">{new Date(ad.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudioPage() {
  const [productImage, setProductImage] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  const [loading, setLoading] = useState(false);
  const [genStep, setGenStep] = useState(0); // 0: Idle, 1: Prompt Analysis, 2: AI Painting, 3: Saving to Cloud
  const [generatedAd, setGeneratedAd] = useState(null);
  const [recentAds, setRecentAds] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const inputRef = useRef(null);

  const fetchRecentAds = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch('/api/ads');
      const data = await res.json();
      if (res.ok) {
        setRecentAds(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchRecentAds();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target?.files?.[0] || null;
    if (file) {
      if (file.size > 10 * 1024 * 1024) return toast.error('File too large (max 10MB)');
      setProductImage(file);
      setProductPreview(URL.createObjectURL(file));
      toast.success('Reference image loaded');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error('Describe your ad first!');
    
    setLoading(true);
    setGeneratedAd(null);
    setGenStep(1);

    try {
      let referenceImageUrl = null;

      // Step 1: Uploading if exists
      if (productImage) {
        setGenStep(1);
        const formData = new FormData();
        formData.append('file', productImage);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);
        referenceImageUrl = uploadData.data.url;
      }

      // Step 2: Generation
      setGenStep(2);
      const generateRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          referenceImageUrl,
        }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error);

      // Step 3: Success
      setGenStep(3);
      setGeneratedAd(generateData.data);
      toast.success('Ad generated successfully!');
      
      // Update gallery
      setTimeout(() => {
        fetchRecentAds();
        setGenStep(0);
      }, 1000);

    } catch (err) {
      toast.error(err.message || 'Generation failed');
      setGenStep(0);
    } finally {
      setLoading(false);
    }
  };

  const useSuggestion = (suggestion) => {
    setPrompt(suggestion);
    toast.success('Prompt suggestion applied');
  };

  const steps = [
    { label: 'Analysing Insight', active: genStep === 1 },
    { label: 'AI Painting...', active: genStep === 2 },
    { label: 'Cloud Optimization', active: genStep === 3 }
  ];

  return (
    <div className="min-h-screen bg-[#070318] text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1435', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 glass rounded-lg border-blue-500/30">
                <Sparkles className="w-5 h-5 text-blue-300" />
              </div>
              <h1 className="text-4xl font-bold font-headline tracking-tight">Ad Studio</h1>
            </div>
            <p className="text-gray-400 max-w-lg">
              Craft professional, scroll-stopping ad creatives in seconds. 
              Powered by <span className="text-blue-400 font-semibold">Gemini 2.0</span>.
            </p>
          </motion.div>
          
          <Link href="/docs" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition group">
            <span className="hidden md:inline">Docs & Guides</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - INPUTS (Lg: 7) */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            
            {/* Step 1: Styles */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[10px] text-white">1</span>
                Visual Style
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all relative ${
                      selectedStyle === style.id 
                      ? `bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]` 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <style.icon className={`w-5 h-5 mb-2 ${selectedStyle === style.id ? 'text-blue-400' : 'text-gray-500'}`} />
                    <span className={`text-[11px] font-semibold tracking-wide uppercase ${selectedStyle === style.id ? 'text-blue-200' : 'text-gray-400'}`}>
                      {style.name}
                    </span>
                    {selectedStyle === style.id && (
                      <motion.div layoutId="style-dot" className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Prompt */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[10px] text-white">2</span>
                  Ad Concept & Direction
                </div>
                <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{prompt.length} / 500</span>
              </div>
              
              <div className="relative group">
                <textarea
                  className="w-full h-44 bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-sm leading-relaxed text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-inner"
                  placeholder="Example: A professional minimalist ad for a premium coffee maker, focusing on steam and luxury texture..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={500}
                />
                <div className="absolute top-4 right-4 pointer-events-none opacity-20 group-focus-within:opacity-40 transition-opacity">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.slice(0, 3).map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => useSuggestion(s)}
                    className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-3 py-1.5 text-gray-400 transition"
                  >
                    + {s.substring(0, 25)}...
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Reference & Action */}
            <section className="flex flex-col sm:flex-row gap-4">
              
              {/* Image Uploader Card */}
              <div 
                className="flex-1 p-4 rounded-2xl bg-white/[0.03] border border-white/10 border-dashed hover:border-blue-500/30 transition cursor-pointer flex items-center gap-4"
                onClick={() => inputRef.current.click()}
              >
                <div className="w-16 h-16 rounded-lg bg-white/5 flex flex-shrink-0 items-center justify-center border border-white/10 overflow-hidden">
                  {productPreview ? (
                    <img src={productPreview} alt="Ref" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-300">Reference Image</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Maintain brand/style consistency (Optional)</p>
                </div>
                <input type="file" ref={inputRef} hidden accept="image/*" onChange={handleImageChange} />
              </div>

              <button
                disabled={loading}
                className={`sm:w-64 h-24 rounded-2xl font-bold flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden group border ${
                  loading 
                  ? 'bg-white/5 border-white/5 cursor-not-allowed' 
                  : 'bg-blue-600 border-blue-400 hover:bg-blue-500 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-95'
                }`}
                onClick={handleGenerate}
              >
                {loading ? (
                  <div className="flex flex-col items-center gap-1">
                    <Loader2 className="w-6 h-6 animate-spin text-white/50" />
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Architecting...</span>
                  </div>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="uppercase tracking-[0.2em] text-xs">Deploy AI Ad</span>
                  </>
                )}
                {/* Loader bar if loading */}
                {loading && (
                   <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-1000" style={{ width: `${(genStep/3)*100}%` }} />
                )}
              </button>
            </section>

          </div>

          {/* Right Column - PREVIEW (Lg: 5) */}
          <div className="lg:col-span-12 xl:col-span-5 h-full">
            <div className="sticky top-28 space-y-6">
              
              <div className="glass rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] shadow-2xl flex flex-col min-h-[500px]">
                
                {/* Results Header */}
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.03] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Live Result</span>
                  </div>
                  {generatedAd && (
                    <div className="flex items-center gap-1">
                       <button className="p-1.5 hover:bg-white/10 rounded transition text-gray-400 hover:text-white" title="Download">
                         <Download className="w-4 h-4" />
                       </button>
                       <button className="p-1.5 hover:bg-white/10 rounded transition text-gray-400 hover:text-white" title="Share">
                         <Share2 className="w-4 h-4" />
                       </button>
                    </div>
                  )}
                </div>

                {/* Result Body */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-grid-white/[0.02]">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="text-center space-y-8 w-full max-w-xs"
                      >
                         <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500/10" />
                            <motion.div 
                              className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                               <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
                            </div>
                         </div>
                         
                         <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white tracking-tight">Generating Magic</h3>
                            <div className="flex flex-col gap-2">
                               {steps.map((s, i) => (
                                 <div key={i} className={`flex items-center gap-2 text-xs transition-opacity duration-300 ${s.active ? 'opacity-100' : 'opacity-40'}`}>
                                    {genStep > i + 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <div className={`w-3.5 h-3.5 rounded-full border ${s.active ? 'border-blue-500 animate-pulse' : 'border-white/20'}`} />}
                                    <span className={s.active ? 'text-blue-200' : 'text-gray-500'}>{s.label}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </motion.div>
                    ) : generatedAd ? (
                      <motion.div 
                        key="result"
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="w-full space-y-6"
                      >
                         <div className="aspect-square rounded-xl overflow-hidden glass border border-white/20 shadow-2xl shadow-blue-500/20 group relative">
                            <img src={generatedAd.url} alt="Result" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-lg translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 text-xs">
                               <span className="text-gray-400 block mb-1">Generated Prompt</span>
                               <p className="line-clamp-2 italic">"{generatedAd.prompt}"</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            <a href={generatedAd.url} target="_blank" className="btn glass py-2.5 text-xs flex items-center justify-center gap-2">
                               <Eye className="w-3.5 h-3.5" /> High Res
                            </a>
                            <a href={`${generatedAd.url}?dl=true`} className="btn bg-white text-gray-900 font-bold py-2.5 text-xs flex items-center justify-center gap-2">
                               <Download className="w-3.5 h-3.5" /> Download
                            </a>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-center opacity-30 space-y-4"
                      >
                        <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center">
                          <Wand2 className="w-8 h-8" />
                        </div>
                        <p className="text-xs uppercase tracking-widest font-bold">Design Studio Waiting</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer status */}
                <div className="px-6 py-4 border-t border-white/5 text-[10px] text-gray-600 flex justify-between uppercase tracking-widest font-black">
                   <span>AdStudio Engine v1.0</span>
                   {generatedAd && <span>{selectedStyle} / 2.0-Flash</span>}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── Recent History section ── */}
        <section className="mt-28 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-headline tracking-tight text-white mb-2">Recent Generations</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Your design history synced from the cloud</p>
            </div>
            <button 
              onClick={fetchRecentAds}
              disabled={isSyncing}
              className={`p-2 glass rounded-lg hover:bg-white/10 transition-colors ${isSyncing ? 'animate-spin opacity-50' : ''}`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentAds.length > 0 ? (
              recentAds.map((ad, i) => (
                <AdCard key={ad.publicId || i} ad={ad} />
              ))
            ) : (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] glass border border-white/5 rounded-xl opacity-20 animate-pulse flex items-center justify-center">
                   <LayoutDashboard className="w-10 h-10" />
                </div>
              ))
            )}
            
            {/* Empty state if sync finished and no ads */}
            {!isSyncing && recentAds.length === 0 && (
               <div className="col-span-full py-20 glass rounded-2xl border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <XCircle className="w-12 h-12 opacity-20" />
                  <p className="text-sm">No generations found yet. Start by creating one!</p>
               </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
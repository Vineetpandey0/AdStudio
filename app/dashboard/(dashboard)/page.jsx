'use client';

import { useRef, useState } from 'react';
import { Sparkles, Upload, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [productImage, setProductImage] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target?.files?.[0] || null;
    setProductImage(file);
    if (file) {
      setProductPreview(URL.createObjectURL(file));
    } else {
      setProductPreview(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt describing your ad.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setGeneratedUrl(null);

      let referenceImageUrl = null;

      // Upload reference image first if provided
      if (productImage) {
        const formData = new FormData();
        formData.append('file', productImage);

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Image upload failed');
        }
        referenceImageUrl = uploadData.data.url;
      }

      // Generate ad
      const generateRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: 'minimalist',
          referenceImageUrl,
        }),
      });

      const generateData = await generateRes.json();

      if (!generateRes.ok) {
        throw new Error(generateData.error || 'Generation failed');
      }

      setGeneratedUrl(generateData.data.url);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Generator Hub
          </h1>
          <p className="text-gray-400 max-w-xl">
            Transform your product concepts into professional ad visuals with AI.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left — Controls */}
          <div className="space-y-6">

            {/* Image Upload */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Reference Image (Optional)
              </h3>
              <label className="flex flex-col items-center justify-center gap-3 aspect-video bg-white/5 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-white/30 transition">
                {productPreview ? (
                  <img src={productPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">+</div>
                    <span className="text-sm text-gray-400">Click to upload</span>
                  </>
                )}
                <input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Prompt */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between mb-3">
                <label className="font-semibold text-white">Creative Direction</label>
                <span className="text-xs text-gray-500">{prompt.length} / 500</span>
              </div>
              <textarea
                className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 resize-none text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                placeholder="Describe your ad concept..."
                maxLength={500}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              disabled={loading}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                loading
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 cursor-pointer'
              }`}
              onClick={handleGenerate}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Ad
                </>
              )}
            </button>
          </div>

          {/* Right — Preview */}
          <div className="flex items-center justify-center p-5 rounded-xl bg-white/5 border border-white/10 min-h-[400px]">
            {generatedUrl ? (
              <div className="space-y-4 w-full">
                <img src={generatedUrl} alt="Generated Ad" className="w-full rounded-xl" />
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-lg bg-white/10 text-white hover:bg-white/15 transition text-sm font-medium"
                >
                  Download Full Size
                </a>
              </div>
            ) : (
              <div className="text-center text-gray-500 space-y-3">
                <Sparkles className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-sm">Your generated ad will appear here</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
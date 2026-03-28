'use client';

import { useState } from "react";

export default function ProductVisualizer() {
  const [productImage, setProductImage] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [prompt, setPrompt] = useState('');

  const uploadFiles = () => {
    // Handle file uploads and prompt submission logic here
    console.log('Product Image:', productImage);
    console.log('Model Image:', modelImage);
    console.log('Prompt:', prompt);
  }
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">

      <div className="flex flex-1 overflow-hidden">


        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-surface p-8">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Header */}
            <header className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline">
                Generator Hub
              </h1>
              <p className="text-on-surface-variant max-w-2xl">
                Transform your product concepts into professional visuals.
              </p>
            </header>

            {/* Upload Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low p-6 rounded-lg border-2 border-dashed border-outline-variant/20 hover:border-primary/50">
                <h3 className="font-bold mb-6">Product Image</h3>

                <label className="aspect-video bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center">
                    +
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="bg-surface-container-low p-6 rounded-lg border-2 border-dashed border-outline-variant/20 hover:border-primary/50">
                <h3 className="font-bold mb-6">Model Image</h3>

                <label className="aspect-video bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center">
                    +
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setModelImage(e.target.files[0])}
                  />
                </label>
              </div>

            </section>

            {/* Prompt */}
            <section className="space-y-6">
              <div className="flex justify-between">
                <label className="font-bold text-lg">
                  Creative Direction
                </label>
                <span className="text-xs text-gray-400">0 / 500</span>
              </div>

              <textarea
                className="w-full h-40 bg-surface-container-high rounded-lg p-6 resize-none"
                placeholder="Describe how the product should appear..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              
            </section>

            {/* CTA */}
            <footer className="flex flex-col items-center gap-4 py-8">
              <button
                disabled={!productImage || !modelImage || !prompt}
                className="w-full max-w-md py-5 rounded-lg font-bold bg-gray-700 text-gray-400 cursor-not-allowed"
                onClick={uploadFiles}
              >
                Generate Image
              </button>
              <p className="text-xs text-gray-400">
                Upload images and provide a prompt to unlock generation
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
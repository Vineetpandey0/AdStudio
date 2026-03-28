'use client';

import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProductVisualizer() {
  const [productImage, setProductImage] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const inputRef = useRef(null);

  const uploadFiles = async () => {

    if (!productImage || !modelImage) {
      toast.error("No file selected")
      return
    }

    try {
      setLoading(true)
      setProgress(0)

      const formData = new FormData()
      formData.append("productImageFile", productImage)
      formData.append("modelImageFile", modelImage)
      formData.append("caption", prompt)

      const response = await axios.post('/api/fileUpload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total)
            setProgress(percent)
          }
        }
      })

      console.log(response.data)

      toast.success("File uploaded successfully")
      setIsUploaded(true)
      if (inputRef.current) inputRef.current.value = ""
      setProductImage(null)
      setModelImage(null)
      setPrompt("")
    } catch (error) {
      console.error("Upload error:", error.message)
      toast.error("Error uploading file")
    } finally {
      setTimeout(() => setProgress(0), 1000) // Let user see 100% before reset
      setLoading(false)
    }
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
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setProductImage(e.target?.files?.[0] || null)}
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
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setModelImage(e.target?.files?.[0] || null)}
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
                disabled={loading}
                className={`w-full max-w-md py-5 rounded-lg font-bold transition-colors ${
                  loading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-primary text-on-primary cursor-pointer hover:bg-primary-dark"
                }`}
                onClick={uploadFiles}
              >
                {loading ? "Generating..." : "Generate Image"}
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
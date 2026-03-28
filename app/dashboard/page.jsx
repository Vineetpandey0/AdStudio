"use client";

export default function ProductVisualizer() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">
      
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col h-full p-4 space-y-4 bg-[#140b36] w-64">
          <div className="px-2 py-4">
            <h2 className="text-lg font-bold text-[#e9e1ff] font-headline">Recent</h2>
            <p className="text-xs uppercase tracking-widest text-[#4a426b]">
              Generations
            </p>
          </div>

          <button className="w-full py-3 px-4 bg-primary text-on-primary-container font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dim transition-all">
            + New Project
          </button>

          <nav className="flex-1 space-y-2 py-4">
            <div className="bg-[#2e225d] text-[#e9e1ff] rounded-xl p-3">
              Dashboard
            </div>
            <div className="text-[#4a426b] hover:text-[#a3a6ff] hover:bg-[#211749] rounded-xl p-3 transition-all">
              Assets
            </div>
            <div className="text-[#4a426b] hover:text-[#a3a6ff] hover:bg-[#211749] rounded-xl p-3 transition-all">
              Templates
            </div>
            <div className="text-[#4a426b] hover:text-[#a3a6ff] hover:bg-[#211749] rounded-xl p-3 transition-all">
              Settings
            </div>
          </nav>
        </aside>

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
              
              {/* Product Upload */}
              <div className="bg-surface-container-low p-6 rounded-lg border-2 border-dashed border-outline-variant/20 hover:border-primary/50">
                <h3 className="font-bold mb-6">Product Image</h3>
                <div className="aspect-video bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center">
                    +
                  </div>
                  <p className="text-sm">Upload Your Product Image</p>
                </div>
              </div>

              {/* Model Upload */}
              <div className="bg-surface-container-low p-6 rounded-lg border-2 border-dashed border-outline-variant/20 hover:border-primary/50">
                <h3 className="font-bold mb-6">Model Image</h3>
                <div className="aspect-video bg-surface-container-high rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center">
                    +
                  </div>
                  <p className="text-sm">Upload Model Image</p>
                </div>
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
              />

              {/* Example prompts */}
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-xs rounded-full bg-secondary-container/30">
                  Studio lighting
                </button>
                <button className="px-3 py-1 text-xs rounded-full bg-secondary-container/30">
                  Urban street style
                </button>
                <button className="px-3 py-1 text-xs rounded-full bg-secondary-container/30">
                  Cyberpunk aesthetic
                </button>
              </div>
            </section>

            {/* CTA */}
            <footer className="flex flex-col items-center gap-4 py-8">
              <button
                disabled
                className="w-full max-w-md py-5 rounded-lg font-bold bg-gray-700 text-gray-400 cursor-not-allowed"
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
# AdStudio

<div align="center">

**Transform your ideas into professional ad images and videos in minutes, powered by AI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org)

[Features](#features) • [Core Formula](#core-formula) • [Use Cases](#use-cases) • [Quick Start](#quick-start) • [Architecture](#project-structure) • [Contributing](#contributing)

</div>

---

## Table of Contents

- [What is AdStudio?](#what-is-adstudio)
- [Core Formula](#core-formula)
  - [Input 1 — Text Prompt](#input-1--text-prompt)
  - [Input 2 — Model Image](#input-2--model-image)
  - [Input 3 — Product Image](#input-3--product-image)
  - [Output — Ad Image or Short Ad Video](#output--ad-image-or-short-ad-video)
- [Generation Pipeline](#generation-pipeline)
  - [Stage 1 — Intent Parsing](#stage-1--intent-parsing)
  - [Stage 2 — Asset Preparation](#stage-2--asset-preparation)
  - [Stage 3 — Scene Composition](#stage-3--scene-composition)
  - [Stage 4 — Copy & Voiceover (Video mode)](#stage-4--copy--voiceover-video-mode)
  - [Stage 5 — Export & Delivery](#stage-5--export--delivery)
- [Features](#features)
  - [Prompt Intelligence Engine](#prompt-intelligence-engine)
  - [Model Image Engine](#model-image-engine)
  - [Product Placement Engine](#product-placement-engine)
  - [Scene Generation](#scene-generation)
  - [Ad Copy Generator](#ad-copy-generator)
  - [Voiceover & Audio](#voiceover--audio)
  - [Video Assembly Engine](#video-assembly-engine)
  - [Brand Kit Integration](#brand-kit-integration)
  - [Iteration & Refinement](#iteration--refinement)
  - [Platform Format Export](#platform-format-export)
  - [Ad Performance Hints](#ad-performance-hints)
  - [Team & Collaboration](#team--collaboration)
- [Output Format Matrix](#output-format-matrix)
- [Use Cases](#use-cases)
- [AI Engine](#ai-engine)
- [Competitive Position](#competitive-position)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Key Libraries & Their Usage](#key-libraries--their-usage)
- [REST API](#rest-api)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Support & Resources](#support--resources)
- [License](#license)
- [Maintainer](#maintainer)
- [Acknowledgments](#acknowledgments)

---

## What is AdStudio?

**AdStudio** is an AI-powered ad creation platform that turns three simple inputs — a **text prompt**, a **model image**, and a **product image** — into a polished ad image or short video in minutes(currently under build).

```
Prompt  +  Model Image  +  Product Image  →  AI Ad Image / Short Ad Video
```

No design skills. No photoshoot. No video editor. Just describe your idea and AdStudio handles:

- 📝 **Script** — AI-written copy and voiceover narration tailored to your concept
- 🎭 **Visual Composition** — Model + product placed into a fully generated scene
- 🔊 **Voiceover** — Natural-sounding narration with music
- 🎬 **Final Edit** — Ready-to-publish image or video in every platform format

---

## Core Formula

AdStudio is built around three core inputs that drive everything:

### Input 1 — Text Prompt
Describe your ad in plain language. AdStudio's LLM parses the prompt to extract:
- Product category and key benefit
- Tone of voice (luxury, playful, urgent, minimal, etc.)
- Target audience and demographic
- Desired call-to-action (CTA)
- Scene mood, setting, and visual style
- Brand colour or aesthetic hints

**Example prompt:**
> *"Premium skincare serum for women aged 25–40, dewy glowing skin, soft morning light, pastel tones, CTA: Shop Now"*

---

### Input 2 — Model Image
Upload any photo of a person, character, or avatar. AdStudio:
- Segments and extracts the subject from the background
- Adapts pose and lighting to match the generated scene
- Optionally applies clothing/style transfer to match the ad aesthetic
- Falls back to a curated stock model library if no image is provided

---

### Input 3 — Product Image
Upload your product photo (raw, packaged, or on white). AdStudio:
- Removes the background automatically
- Infers 3D surface geometry for realistic shadow/reflection synthesis
- Preserves labels, logos, and textures exactly as uploaded
- Places the product naturally into the composed scene with correct perspective

---

### Output — Ad Image or Short Ad Video

| Output Type | Format | Resolution | Duration |
|---|---|---|---|
| Static Ad Image | PNG / JPEG / WebP | Up to 4K | — |
| Layered Source File | PSD | Up to 4K | — |
| Short Ad Video | MP4 / MOV | Up to 1080p | 5–30 seconds |

Every run generates 3–5 visual variants for you to choose from.

---

## Generation Pipeline

AdStudio processes your three inputs through a 5-stage AI pipeline:

### Stage 1 — Intent Parsing
The text prompt is processed by a large language model to produce a structured **creative brief** — a JSON object defining tone, audience, scene description, copy angle, and CTA. This brief drives all downstream generation.

### Stage 2 — Asset Preparation
- **Model image**: subject segmentation, pose normalisation, lighting estimation
- **Product image**: background removal, surface normal extraction, label/logo preservation
- Both assets are encoded and passed as conditioning inputs to the visual model

### Stage 3 — Scene Composition
A conditioned image diffusion model (Hugging Face Stable Diffusion) generates the full ad scene — background environment, lighting, depth of field, shadows, and reflections — with the model and product composited in naturally. Multiple variants are generated in parallel.

### Stage 4 — Copy & Voiceover (Video mode)
For video output, an LLM generates a short ad script (hook → body → CTA). Text-to-speech produces a natural voiceover. Captions are auto-timed and styled. Background music is selected or generated to match the mood.

### Stage 5 — Export & Delivery
Final assets are transcoded into all requested aspect ratios and resolutions. Exports include source files, platform-spec video files, and a copy bundle (headline + caption + hashtags) for each platform.

---

## Features

### Prompt Intelligence Engine
Converts natural language into a structured creative brief — no forms or dropdowns required.
- Multi-language prompt support (20+ languages)
- Brand tone detection and scene mood inference
- Target audience and demographic parsing
- Auto-CTA generation with platform-appropriate copy length

### Model Image Engine
Accepts any uploaded photo and adapts it to the ad scene.
- Automatic background removal (SAM 2 / REMBG)
- Pose and lighting adaptation to match scene
- Clothing and styling transfer to match aesthetic
- Stock model library as fallback (50+ diverse models)

### Product Placement Engine
Extracts and places products with physical realism.
- Auto background removal with edge refinement
- Shadow and reflection synthesis using inferred surface geometry
- Perspective correction to match scene camera angle
- Full label and logo fidelity — no distortion

### Scene Generation
Generates complete ad backgrounds and environments.
- Indoor, outdoor, lifestyle, studio, and abstract scene types
- Scene mood presets (golden hour, minimal studio, urban, nature, luxury)
- Seasonal and time-of-day control
- Brand-theme and colour-matched environments
- 3–5 visual variants per generation run

### Ad Copy Generator
Produces all the text you need for every platform.
- Hook, body copy, headline, subheadline, and CTA
- Platform-specific character length compliance
- A/B headline variants (up to 3 per run)
- Hashtag sets for Instagram, TikTok, and LinkedIn
- Manual edit before export with live preview

### Voiceover & Audio
Professional AI narration with music for video ads.
- 10+ voice profiles with gender, accent, and emotion controls
- Pace and pause control for sync with visual cuts
- Beat-matched royalty-free background music library
- Volume ducking (voice auto-lowers music during speech)

### Video Assembly Engine
Stitches all generated assets into a complete short-form ad video.
- Ken Burns / parallax motion on static images
- Animated product reveal sequence
- Auto-timed caption overlays with brand font support
- Transition library (cut, fade, slide, zoom)
- 5–30 second output duration control

### Brand Kit Integration
Define your brand once and apply it everywhere.
- Logo upload with placement and sizing rules
- Hex colour palette enforcement across all outputs
- Custom font upload (TTF / OTF)
- Multi-brand workspace support for agencies

### Iteration & Refinement
Edit any element without restarting.
- Element-level regeneration (swap background, change model, re-caption)
- Version history with up to 20 saved states
- Side-by-side variant comparison view
- One-click upscale to 4K

### Platform Format Export
Export in every spec your campaign needs — in one click.
- Batch export: all formats downloaded as a ZIP in one action
- Direct publish to Meta Ads Manager, Google Ads, TikTok Ads Manager
- Canva import via direct link
- Platform spec validator built into export flow

### Ad Performance Hints
Pre-export checklist to catch common creative mistakes.
- Contrast and text readability checker
- Platform spec violation alerts (text area %, file size limits)
- CTA prominence and placement scorer
- One-click auto-fix suggestions

### Team & Collaboration
Built for agencies and marketing teams.
- Shared workspaces with role-based access
- Guest review links (no login required for client review)
- Inline comments on generated assets
- Approval status tracking (Draft → In Review → Approved)
- Shared brand kit and asset libraries

---

## Output Format Matrix

| Aspect Ratio | Name | Primary Use |
|---|---|---|
| 1:1 | Square | Instagram Feed, Facebook Feed |
| 4:5 | Portrait | Instagram Portrait, Pinterest |
| 9:16 | Vertical | Reels, TikTok, Stories, Shorts |
| 16:9 | Landscape | YouTube, Twitter, LinkedIn |
| 1.91:1 | Wide | Google Display, Meta Link Ads |
| 2:3 | Story Portrait | Pinterest, Print |
| A4 | Print | Flyers, Posters, Magazine |
| Custom | User-defined | Any pixel dimensions |

---

## Use Cases

### D2C / E-Commerce Brand — Product Launch & Sales
A skincare brand launches a new serum. They upload the bottle, a lifestyle model photo, and type:
> *"Luxury skincare, dewy skin, morning routine feel, women 25–40, CTA: Shop Now"*

AdStudio generates 5 image ad variants and a 15-second Reel — all ready to push to Meta Ads within minutes. No agency. No photoshoot. No designer.

**Key benefits:** Launch-day speed, multi-SKU at scale, zero creative team dependency.

---

### Digital Marketing Agency — Client Deliverables at Scale
An agency managing 30 brand clients uses AdStudio to generate first-draft creatives instantly. Each client has a saved brand kit. A brief becomes 20 ad variants (image + video) in under an hour — reducing creative production time by over 80%. Designers focus only on edge-case refinements.

**Key benefits:** Brand kit per client, bulk generation, approval workflow, shareable review links.

---

### Performance Marketer — A/B Testing & Creative Refresh
A performance marketer running paid social needs 10 fresh creative variants weekly to combat ad fatigue. AdStudio lets them swap hooks, change model expressions, and test different CTAs without waiting on design resources — keeping CPMs low and CTR healthy.

**Key benefits:** Weekly creative refresh, zero design dependency, hook A/B testing at speed.

---

### Fashion & Beauty Creator — Brand Collaborations
A beauty influencer creates sponsored content for a cosmetics brand. They upload a selfie as the model image, add the product, write a casual brief, and get a UGC-style ad that looks authentic — without a full production shoot.

**Key benefits:** Self-image as model, UGC aesthetic output, brand collab deliverables in hours.

---

### Startup / Solo Founder — Zero Budget Launch
A solo founder building a food product has no marketing budget for a photoshoot or agency. They photograph their product with a phone, pick a stock model, write a quick brief, and launch a polished Instagram campaign the same day.

**Key benefits:** Zero photoshoot cost, same-day launch capability, stock model fallback library.

---

### Marketplace Seller — Listing Images at Scale
A Meesho or Amazon seller with 100+ products needs lifestyle images for every SKU. AdStudio auto-generates a lifestyle scene for each product upload in bulk — dramatically improving listing conversion rates without a single studio booking.

**Key benefits:** Bulk product processing, listing-ready images, regional scene presets.

---

### App & SaaS Marketing — User Acquisition Ads
A mobile app team needs short demo videos for user acquisition campaigns. They use AdStudio to create screen-based ads with a model interacting with the app, a value-prop voiceover, and platform-spec video exports for Google UAC, Apple Search Ads, and Meta.

**Key benefits:** App screenshot integration, UAC / ASA format export, demo-style video ads.

---

### Multilingual & Regional Campaigns — Localisation at Scale
A FMCG brand running campaigns across India, UAE, and UK needs the same ad localised with different model faces, backgrounds, languages, and cultural cues. AdStudio generates locale-specific variants from a single master prompt by swapping the model image and adjusting the scene brief per region.

**Key benefits:** Locale-specific scene presets, copy in 20+ languages, model swap per region.

---

## AI Engine

| Capability | Model / Service |
|---|---|
| Image generation and scene composition | Hugging Face (Stable Diffusion XL) |
| Prompt parsing, copy generation (fallback) | LLM |
| Background removal and subject segmentation | Cloudinary / SAM 2 |
| Voiceover synthesis | ElevenLabs / TTS |
| Media hosting and CDN delivery | Cloudinary |

---

## Competitive Position

| Capability | AdStudio | Canva AI | Adobe Firefly | Manual Agency |
|---|---|---|---|---|
| Prompt → full ad in < 5 min | ✅ | Partial | Partial | Days |
| Model image + product image fusion | ✅ | ❌ | ❌ | ✅ |
| AI video generation included | ✅ | Limited | ❌ | ✅ |
| Voiceover + script auto-generated | ✅ | ❌ | ❌ | ✅ |
| Platform-spec multi-format export | ✅ | ✅ | Partial | Manual |
| Zero design skills required | ✅ | Partial | ❌ | ✅ |
| Brand kit persistence | ✅ | ✅ | ✅ | ✅ |
| Affordable for solo founders | ✅ | ✅ | ❌ | ❌ |

---

## Quick Start

### Prerequisites

- **Node.js** 18+ (Next.js 16 requirement)
- **npm** 9+ or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- API keys for:
  - Hugging Face (Image Generation)
  - Cloudinary (media hosting)
  - Clerk (authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vineetpandey0/AdStudio.git
   cd AdStudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following in `.env.local`:
   ```env
   # Next.js
   NEXT_PUBLIC_API_URL=http://localhost:3000

   # Hugging Face
   HUGGINGFACE_API_KEY=your_hf_access_token

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_SIGN_IN_URL=/sign-in
   CLERK_SIGN_UP_URL=/sign-up
   CLERK_AFTER_SIGN_IN_URL=/dashboard
   CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000` and start creating ads!

### Basic Usage

1. **Sign Up / Login**
   - Create an account or log in with existing credentials
   - Access your personalized dashboard

2. **Create a New Project**
   - Click "New Project" on the dashboard
   - Upload your **model image** and **product image**
   - Write a detailed prompt describing your ad idea
   - Example: *"Create a 30-second ad for a fitness app showing people working out, upbeat music, modern visuals"*

3. **Generate Content**
   - Submit your inputs
   - AdStudio generates script, visuals, and voiceover
   - Review and choose from 3–5 generated variants

4. **Download & Share**
   - Export your final video or image in all required formats
   - Share directly or download for later use

---

## Project Structure

```
📦 AdStudio
├── 📂 app/                          # Next.js app directory
│   ├── 📂 (auth)/                   # Authentication routes
│   ├── 📂 (public-pages)/           # Public-facing pages
│   │   ├── layout.js
│   │   └── page.jsx
│   ├── 📂 agents/                   # AI agent implementations
│   ├── 📂 api/                      # API routes
│   │   ├── 📂 generate/             # Video generation endpoint
│   │   │   └── route.js
│   │   └── 📂 upload/               # Asset upload endpoint
│   │       └── route.js
│   ├── 📂 dashboard/                # Dashboard pages
│   │   ├── 📂 (dashboard)/          # Main dashboard view
│   │   │   └── page.jsx
│   │   ├── 📂 assets/               # Asset management page
│   │   │   └── page.jsx
│   │   ├── 📂 settings/             # User settings page
│   │   │   └── page.jsx
│   │   ├── 📂 templates/            # Template selection page
│   │   │   └── page.jsx
│   │   └── layout.js
│   ├── 📂 sign-in/                  # Sign-in page
│   │   └── 📂 [[...sign-in]]/
│   │       ├── layout.js
│   │       └── page.jsx
│   ├── 📂 sign-up/                  # Sign-up page
│   │   └── 📂 [[...sign-up]]/
│   │       ├── layout.js
│   │       └── page.jsx
│   ├── globals.css                  # Global styles
│   ├── layout.js                    # Root layout
│   └── manifest.json                # Web app manifest
├── 📂 components/                   # Reusable React components
│   ├── dashNavbar.jsx               # Dashboard navigation
│   ├── dashSidebar.jsx              # Dashboard sidebar
│   ├── footer.jsx                   # Footer component
│   ├── lenis-scroll.jsx             # Smooth scroll library
│   ├── navbar.jsx                   # Main navigation
│   └── section-title.jsx            # Section title component
├── 📂 lib/                          # Utility libraries
│   ├── cloudinary.js                # Image/video hosting integration
│   └── imageService.js              # Hugging Face Inference API service
├── 📂 sections/                     # Page section components
│   ├── call-to-action.jsx           # CTA section
│   ├── features.jsx                 # Features showcase
│   ├── hero-section.jsx             # Landing page hero
│   ├── pricing-plans.jsx            # Pricing tiers
│   ├── testimonials.jsx             # User testimonials
│   └── workflow-steps.jsx           # Workflow demonstration
├── 📂 public/                       # Static assets
│   └── 📂 assets/                   # Images, icons, etc.
├── .env.local                       # Environment variables (not in repo)
├── .gitignore                       # Git ignore rules
├── eslint.config.mjs                # ESLint configuration
├── jsconfig.json                    # JavaScript path aliases
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Dependency lock file
├── postcss.config.mjs               # PostCSS configuration
├── proxy.js                         # CORS proxy configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

### Key Directories

- **`app/`** — Next.js 13+ app router pages and API routes
- **`components/`** — Reusable UI components
- **`sections/`** — Self-contained page sections (hero, features, pricing, etc.)
- **`lib/`** — External API integrations and utilities
- **`public/`** — Static assets served directly

---

## Technology Stack

### Frontend
- **Next.js 16** — React framework with App Router and Turbopack
- **React 19** — Modern UI library with latest features
- **Tailwind CSS 4** — Utility-first styling framework
- **Framer Motion 12** — Advanced animation library
- **Lenis 1.3** — Smooth scrolling library
- **Lucide React** — Beautiful icon library

### Backend & APIs
- **Next.js API Routes** — Serverless functions for image generation and uploads
- **Hugging Face Inference API** — Stable Diffusion XL for high-quality ad visuals
- **Cloudinary 2.9** — Media hosting, optimisation, and transformations
- **Axios** — HTTP client for API requests

### Authentication & State Management
- **Clerk (v7)** — Modern authentication and user management
- **Zustand 5** — Lightweight state management library
- **React Hot Toast 2.6** — Toast notifications

### Development Tools
- **ESLint 9** — Code quality and linting
- **Prettier 3.6** — Code formatting with Tailwind CSS plugin
- **PostCSS 4 (Tailwind)** — CSS transformation
- **TypeScript** — Type safety and better DX
- **Node.js 16+** — Runtime environment

---

## Key Libraries & Their Usage

**Zustand** manages global application state for user preferences, project data, and UI state with minimal boilerplate.

**Hugging Face Stable Diffusion** powers the core visual ad generation — producing scenes, compositing model and product images, and generating multiple creative variants from structured prompts via the Hugging Face Inference API.

**Cloudinary** handles image and video uploads, optimisation, and CDN distribution for fast media delivery.

**Framer Motion** creates smooth animations and transitions throughout the dashboard. **Lenis** provides smooth scrolling on the landing page. **React Hot Toast** delivers real-time notifications. **Lucide React** provides consistent, scalable icons across the interface.

**Clerk** handles secure user authentication, sign-up flows, and session management with industry-standard security.

---

## REST API

### Generate Ad
**`POST /api/generate`**

Generate an ad image or video from a text prompt and uploaded assets.

```javascript
// Request
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Create a 30-second fitness app ad',
    templateId: 'modern-dynamic',
    duration: 30
  })
});

// Response
{
  "videoId": "v_abc123",
  "script": "...",
  "status": "generating",
  "estimatedTime": "2-3 minutes"
}
```

### Upload Assets
**`POST /api/upload`**

Upload custom model images or product images for use in projects.

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Response
{
  "assetId": "asset_xyz789",
  "url": "https://cdn.example.com/asset_xyz789",
  "type": "image"
}
```

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# Hugging Face (Inference API)
HUGGINGFACE_API_KEY=your_hf_access_token_here

# Cloudinary (Media Hosting)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Getting API Keys

**Hugging Face:**
1. Visit [Hugging Face](https://huggingface.co)
2. Sign up or log in to your account
3. Go to Settings → Access Tokens
4. Create a new token with `read` (or `write`) permissions
5. Add to `.env.local` — use models like `stabilityai/stable-diffusion-xl-base-1.0` or `runwayml/stable-diffusion-v1-5` via the Inference API

**Cloudinary:**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get credentials from Account Settings
3. Add to `.env.local`

**Clerk:**
1. Create account at [Clerk](https://clerk.com)
2. Create a new application
3. Copy publishable and secret keys
4. Add to `.env.local`

### Next.js Configuration

Edit `next.config.mjs` to customise:
- Image optimisation via Cloudinary
- API rewrites and middleware
- Environment-specific settings
- Webpack plugins and build optimisation

---

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server with Turbopack (faster builds)
npm run dev

# Build for production with Turbopack optimisation
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

> This project uses **Turbopack**, Next.js's Rust-based bundler, for significantly faster builds and development experience.

### File Organisation

- Create new components in `/components`
- Add new page sections in `/sections`
- Store utilities in `/lib`
- API routes go in `/app/api`

### Code Style

This project uses ESLint for code quality. Run `npm run lint` to check for issues.

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Set environment variables
4. Deploy with one click

```bash
vercel deploy
```

### Deploy to Other Platforms

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Manual Deployment:**
```bash
npm run build
npm start
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### API Key Issues
- Verify all API keys in `.env.local` are correct
- Check Hugging Face token permissions and rate limits
- Ensure your Hugging Face account has access to the selected models (some require accepting model terms)
- Check Cloudinary and Clerk quotas and billing status

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

For more help, see [Next.js Documentation](https://nextjs.org/docs)

---

## Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
5. **Push** to your branch (`git push origin feature/amazing-feature`)
6. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style (ESLint)
- Write meaningful commit messages
- Update documentation for new features
- Test changes locally before submitting PR

For detailed guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Roadmap

- [ ] Multi-language support
- [ ] Advanced editing tools
- [ ] Collaboration features
- [ ] Mobile app
- [ ] AI model fine-tuning
- [ ] Batch video generation
- [ ] Model image + product image → ad image (core formula v1)
- [ ] Regional scene presets for India, MENA, SEA
- [ ] Direct publish to Meta Ads, Google Ads, TikTok Ads Manager

---

## Support & Resources

- 📖 **Documentation** — See `/docs` for detailed guides
- 🐛 **Report Issues** — [GitHub Issues](https://github.com/Vineetpandey0/AdStudio/issues)
- 💬 **Discussions** — [GitHub Discussions](https://github.com/Vineetpandey0/AdStudio/discussions)
- 📧 **Contact** — Reach out to the maintainer

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) file for details.

---

## Maintainer

**Vineet Pandey**  
GitHub: [@Vineetpandey0](https://github.com/Vineetpandey0)

---

## Acknowledgments

- Built with [Next.js 16](https://nextjs.org) and [Turbopack](https://turbo.build/pack)
- AI powered by [Hugging Face (Stable Diffusion XL)](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
- Authentication by [Clerk](https://clerk.com)
- Media hosting by [Cloudinary](https://cloudinary.com)
- Styling with [Tailwind CSS 4](https://tailwindcss.com)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
- Icons by [Lucide React](https://lucide.dev)

---

<div align="center">

⭐ If you find this project helpful, please consider giving it a star!

[Back to Top](#adstudio)

</div>

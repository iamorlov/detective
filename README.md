# 🕵️ NOIRE - AI Detective Game

<div align="center">

![Detective Game Banner](https://img.shields.io/badge/NOIRE-Detective%20Game-blue?style=for-the-badge&logo=detective)

**An immersive AI-powered murder mystery investigation game**

*Where truth ends, our work begins. In the darkness of the city — we are your light*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)

[🎮 Play Demo](https://noire.iamorlov.com/) • [📖 Documentation](#-features) • [🌍 Languages](#-internationalization) • [🚀 Deploy](#-deployment)

</div>

---

## 🎯 Overview

**NOIRE** is an interactive murder mystery game where players take on the role of a detective investigating complex criminal cases. Using advanced AI technology, each case is dynamically generated with unique suspects, motives, and storylines, ensuring no two investigations are ever the same.

### 🌟 Key Highlights

- 🤖 **AI-Powered Mysteries** - Each case is uniquely generated using Grok AI
- 🎭 **Dynamic Characters** - Realistic suspects with complex backstories and relationships
- 🔍 **Interactive Investigation** - Question suspects, analyze evidence, and solve cases
- 🌍 **Multi-Language Support** - Available in 6 languages
- 🎵 **Immersive Experience** - Atmospheric music and noir-style visuals
- 📱 **Responsive Design** - Play seamlessly on any device

---

## ✨ Features

### 🕵️ Investigation Mechanics
- **Dynamic Questioning System** - Ask specific questions to uncover lies and inconsistencies
- **Character Relationship Web** - Explore connections between suspects and victims
- **Evidence Analysis** - Examine clues and belongings found at crime scenes
- **Strategic Deduction** - Limited questions per suspect force careful investigation planning

### 🎮 Game Modes
- **Easy Mode** - 3 suspects, perfect for beginners
- **Medium Mode** - 5 suspects, balanced challenge
- **Hard Mode** - 7 suspects, for experienced detectives

### 🎨 User Experience
- **Material Design 3** - Modern, accessible interface
- **Atmospheric Audio** - Immersive background music and sound effects
- **Smooth Animations** - Polished transitions and interactions
- **Mobile-First Design** - Optimized for all screen sizes

### 🔐 Authentication & Persistence
- **Google OAuth** - Secure authentication system
- **Game Save System** - Continue investigations across sessions
- **Progress Tracking** - Monitor your detective performance

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[SCSS](https://sass-lang.com/)** - Enhanced styling capabilities

### Backend & Services
- **[Firebase Auth](https://firebase.google.com/products/auth)** - User authentication
- **[Grok AI API](https://x.ai/)** - Dynamic content generation
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Server-side logic

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase project (for authentication)
- Grok AI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/detective-game.git
cd detective-game
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Add your configuration to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
GROK_API_KEY=your_grok_api_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

---

## 🎮 How to Play

### 🔍 Investigation Process

1. **Study the Case** - Review victim details, murder weapon, location, and circumstances
2. **Select Suspects** - Choose from the list of people present at the crime scene  
3. **Conduct Interrogations** - Ask strategic questions to uncover motives and alibis
4. **Analyze Responses** - Look for contradictions and highlighted clues
5. **Make Your Accusation** - Arrest the suspect you believe is the killer

### 💡 Detective Tips

- **Question Alibis** - Ask where suspects were during the time of murder
- **Explore Relationships** - Understand connections between suspects and victims
- **Look for Motives** - Money, revenge, jealousy, and secrets drive murder
- **Cross-Reference** - Compare testimonies for inconsistencies
- **Think Strategically** - You have limited questions per suspect

### ⚖️ Victory Conditions

- **Justice Served** - Correctly identify and arrest the real killer
- **Case Closed** - Failed to identify the killer or arrested an innocent person

---

## 🌍 Internationalization

NOIRE supports multiple languages with full localization:

| Language | Code | Status |
|----------|------|--------|
| 🇺🇸 English | `en` | ✅ Complete |
| 🇪🇸 Spanish | `es` | ✅ Complete |
| 🇩🇪 German | `de` | ✅ Complete |
| 🇵🇱 Polish | `pl` | ✅ Complete |
| 🇺🇦 Ukrainian | `uk` | ✅ Complete |
| 🇷🇺 Russian | `ru` | ✅ Complete |

All game content, including AI-generated mysteries, adapts to the selected language.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.scss       # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main game page
├── components/            # React components
│   ├── DifficultySelector.tsx
│   ├── GameIntro.tsx
│   ├── GameResult.tsx
│   ├── InfoModal.tsx
│   ├── Investigation.tsx
│   ├── LanguageSelector.tsx
│   ├── SessionProvider.tsx
│   └── SignOutButton.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   └── useTranslations.ts
├── lib/                   # Core game logic
│   ├── avatar-service.ts  # Character avatar generation
│   ├── game-engine.ts     # Main game mechanics
│   ├── grok-client.ts     # AI API integration
│   ├── i18n.ts           # Internationalization
│   ├── types.ts          # TypeScript definitions
│   └── translations/      # Language files
└── types/                 # Game type definitions
```

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy NOIRE is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. **Connect Repository** - Link your GitHub repository to Vercel
2. **Configure Environment Variables** - Add your API keys in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your application

### Other Platforms

NOIRE can be deployed on any platform that supports Next.js:
- **[Netlify](https://www.netlify.com/)**
- **[Railway](https://railway.app/)**
- **[DigitalOcean](https://www.digitalocean.com/)**

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions to make NOIRE even better! Here's how you can help:

### 🐛 Bug Reports
- Use the [issue tracker](https://github.com/yourusername/detective-game/issues)
- Include detailed reproduction steps
- Provide browser and device information

### 🌟 Feature Requests
- Suggest new game mechanics
- Propose UI/UX improvements
- Request additional language support

### 🔧 Development
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎵 Credits

### Music
- **Background Music** by [Joel Fazhari](https://pixabay.com/users/joelfazhari-16466931/) from [Pixabay](https://pixabay.com/)
- **End Game Music** by [Universfield](https://pixabay.com/users/universfield-28281460/) from [Pixabay](https://pixabay.com/)

### Technology
- **AI Content Generation** powered by [Grok AI](https://x.ai/)
- **Character Avatars** generated using [DiceBear API](https://dicebear.com/)

---

<div align="center">

**Built with ❤️ for mystery enthusiasts and detective fiction fans**

*Start your investigation today and uncover the truth in the shadows of NOIRE*

</div>

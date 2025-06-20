
# 🚀 Space Explorer - Interactive 3D Space Visualization

A stunning interactive 3D space visualization application built with React, Three.js, and NASA APIs. Explore near-Earth objects, view real space data, and navigate through an immersive 3D space environment.

## ✨ Features

### 🌍 3D Space Environment
- **Interactive Earth Model** - Rotating Earth with realistic textures
- **Asteroid Visualization** - Real NASA near-Earth object (NEO) data
- **Celestial Bodies** - Moon, Jupiter, Saturn with orbital mechanics
- **Space Station** - Detailed 3D space station model
- **Dynamic Lighting** - Multiple light sources for realistic space ambiance
- **Particle Effects** - Star fields, space debris, and comet trails

### 🛰️ Real Space Data Integration
- **NASA NEO API** - Live near-Earth asteroid data
- **NASA APOD** - Astronomy Picture of the Day integration
- **Real-time Updates** - Fresh data from NASA APIs
- **Data Analysis Panel** - Statistics and filtering capabilities

### 🤖 AI-Powered Features
- **AI Space Identifier** - Identify objects in space images
- **Smart Data Analysis** - Automated insights from space data
- **Interactive Tooltips** - Detailed information about space objects

### 🎮 Interactive Controls
- **Mouse Controls** - Orbit, zoom, and pan around the 3D scene
- **Keyboard Navigation** - WASD movement, spacebar for boost
- **Touch Support** - Mobile-friendly touch controls
- **Mini-map** - Navigate large space environments easily

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics and WebGL rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications

### Data & State Management
- **TanStack Query** - Server state management
- **Axios** - HTTP client for API requests
- **NASA APIs** - Real space data sources

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd space-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🌐 Environment Variables

The app uses NASA's public APIs. The demo API key is included, but for production use:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

Get your free NASA API key at: https://api.nasa.gov/

## 📱 Usage

### Navigation
- **Mouse**: Click and drag to orbit around Earth
- **Scroll**: Zoom in and out
- **Keyboard**: 
  - `WASD` - Move camera
  - `Spacebar` - Speed boost
  - `H` - Show keyboard controls help

### Features
- **Click asteroids** for detailed information
- **Use control panel** (top-right) to:
  - Refresh space data
  - Open AI Space Identifier
  - View data analysis
  - Show control help

### Data Analysis
- View real-time NEO statistics
- Filter asteroids by various parameters
- Export data for further analysis
- View raw NASA API responses

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── space/           # 3D space-related components
│   ├── data-analysis/   # Data visualization components
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
└── pages/               # Application pages
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
```

## 🚀 Deployment

### Vercel
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
Compatible with any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔑 API Keys & Security

### NASA API
- Demo key included for development
- Rate limited to 1000 requests/hour
- Get production key at: https://api.nasa.gov/

### Best Practices
- Use environment variables for production
- Consider Supabase integration for secure key management
- Implement request caching to respect rate limits

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📋 Roadmap

- [ ] Mars exploration mode
- [ ] Real-time satellite tracking
- [ ] VR/AR support
- [ ] Multiplayer space exploration
- [ ] Educational quiz mode
- [ ] Space mission timelines

## 🐛 Known Issues

- Large asteroid datasets may impact performance on low-end devices
- WebGL not supported on very old browsers
- Some mobile browsers may have limited 3D performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **NASA** - For providing free access to space data APIs
- **Three.js** - For making 3D web graphics accessible
- **React Three Fiber** - For bridging React and Three.js


*Explore the universe from your browser* 🌌

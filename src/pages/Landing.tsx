
import React from 'react';
import { Button } from '../components/ui/button';
import { Rocket, Globe, Satellite, Star, Sparkles, Orbit, Telescope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated starfield background */}
      <div className="absolute inset-0 z-0">
        {/* Multiple layers of stars for depth */}
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
        
        {/* Floating cosmic elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl animate-pulse" />
        <div className="absolute top-60 right-20 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-xl animate-pulse delay-2000" />
        
        {/* Shooting stars */}
        <div className="absolute top-1/3 left-0 w-1 h-1 bg-white rounded-full">
          <div className="w-20 h-px bg-gradient-to-r from-white to-transparent transform -rotate-45 animate-pulse" />
        </div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full delay-1000">
          <div className="w-16 h-px bg-gradient-to-r from-white to-transparent transform -rotate-12 animate-pulse" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Floating title with cosmic glow */}
          <div className="relative mb-12">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-extralight tracking-widest mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                NASA
              </span>
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin tracking-[0.3em] text-white/90 mb-4">
              SPACE EXPLORER
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl font-light text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
            Journey through the cosmos with real NASA data in stunning 3D visualization. 
            Discover asteroids, explore planets, and witness the beauty of space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link to="/space">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 text-xl font-light rounded-full border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Rocket className="mr-3 h-6 w-6" />
                Launch Explorer
              </Button>
            </Link>
{/*             <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-12 py-6 text-xl font-light rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <Telescope className="mr-3 h-6 w-6" />
              Learn More
            </Button> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-thin tracking-wider text-white mb-6">
              Explore the
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Universe</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-16 w-16 text-cyan-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">3D Earth Visualization</h3>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                Watch our beautiful planet rotate in real-time with stunning textures, atmospheric effects, and dynamic lighting
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Orbit className="h-16 w-16 text-purple-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Near-Earth Objects</h3>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                Track real asteroids and their orbital paths using live NASA data feeds with interactive 3D models
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-16 w-16 text-yellow-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/10 to-transparent blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Daily Space Images</h3>
              <p className="text-white/70 text-lg leading-relaxed font-light">
                Discover NASA's Astronomy Picture of the Day with detailed descriptions and cosmic insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-20 tracking-wider">
            Real NASA Data
          </h2>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="group">
              <div className="text-6xl md:text-8xl font-thin bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-white/80 text-xl font-light tracking-wide">Active Asteroids Tracked</div>
            </div>
            <div className="group">
              <div className="text-6xl md:text-8xl font-thin bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-white/80 text-xl font-light tracking-wide">Real-time Data Updates</div>
            </div>
            <div className="group">
              <div className="text-6xl md:text-8xl font-thin bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                ∞
              </div>
              <div className="text-white/80 text-xl font-light tracking-wide">Cosmic Exploration</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-thin text-white mb-8 tracking-wider">
            Ready to 
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Explore</span>?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Join the journey through space and discover the wonders of our solar system with real NASA data
          </p>
          <Link to="/space">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-8 text-2xl font-light rounded-full border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Rocket className="mr-4 h-8 w-8" />
              Start Your Space Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5" />
    </div>
  );
};

export default Landing;

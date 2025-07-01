import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 100 
          ? 'glass-strong shadow-glow' 
          : 'glass'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gradient">
              NWS
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-4 py-2 rounded-lg transition-all duration-200 hover:glass-strong hover:text-white hover:-translate-y-1 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary rounded transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2"></span>
                </a>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg glass hover:glass-strong transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="glass-strong rounded-xl p-6 space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 px-4 rounded-lg transition-all duration-200 hover:glass-strong animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-32 h-32 rounded-full blur-sm animate-float opacity-30`}
              style={{
                background: [
                  'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)'
                ][i],
                top: ['15%', '60%', '25%', '8%'][i],
                left: ['10%', 'auto', '65%', 'auto'][i],
                right: ['auto', '15%', 'auto', '8%'][i],
                animationDelay: `${i * 1.5}s`,
                transform: `translateY(${scrollY * (0.3 + i * 0.1)}px)`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block text-lg font-medium text-gray-300 uppercase tracking-widest mb-2 animate-fade-in-up">
                    Hi, I'm
                  </span>
                  <span className="block text-gradient animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Natnael Wondwoesn
                  </span>
                  <span className="block text-3xl lg:text-5xl text-gray-400 font-normal animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Software Developer
                  </span>
                </h1>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Passionate full-stack developer creating innovative solutions 
                with modern technologies and clean code practices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <button className="group relative px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 transform-gpu">
                  <span className="relative z-10 uppercase tracking-wide">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button className="px-8 py-4 glass-strong text-white font-semibold rounded-xl transition-all duration-300 hover:glass hover:shadow-glow hover:-translate-y-1 uppercase tracking-wide">
                  Get In Touch
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative perspective-1000">
                <div className="w-64 h-64 relative transform-gpu animate-float">
                  <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-20 blur-xl animate-pulse-slow"></div>
                  <div className="relative w-full h-full glass-strong rounded-3xl flex items-center justify-center text-4xl font-bold text-gradient border-2 border-white/20 shadow-glass">
                    <div className="animate-spin-slow">⚡</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 glass">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-black text-center mb-16 text-gradient">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate software developer with a strong foundation in computer science 
                and engineering. Currently studying at Addis Ababa Science and Technology University, 
                I've been actively involved with A2SV (African to Silicon Valley) and various 
                tech communities.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in technology is driven by curiosity and the desire to create 
                meaningful solutions. I enjoy working with modern web technologies and 
                building applications that make a real impact.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '50+', label: 'Projects Completed' },
                  { number: '3+', label: 'Years Experience' },
                  { number: '100+', label: 'Problems Solved' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-6 glass-strong rounded-xl hover:shadow-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="text-3xl font-black text-gradient mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 glass-strong rounded-3xl overflow-hidden border border-white/10 shadow-glass">
                  <div className="h-1/2 bg-gradient-primary opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center text-3xl font-bold shadow-glow">
                    NW
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">Natnael Wondwoesn</h3>
                    <p className="text-gray-400">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-black text-center mb-16 text-gradient">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend',
                skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                title: 'Backend',
                skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL'],
                gradient: 'from-green-500 to-cyan-500'
              },
              {
                title: 'Tools & Others',
                skills: ['Git', 'Docker', 'AWS', 'Figma'],
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((category, index) => (
              <div key={index} className="glass-strong rounded-3xl p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="glass rounded-xl p-4 text-center transition-all duration-200 hover:glass-strong hover:-translate-y-1">
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 glass">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl lg:text-6xl font-black text-center mb-16 text-gradient">
            Get In Touch
          </h2>
          
          <div className="glass-strong rounded-3xl p-8 lg:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500 focus:glass-strong transition-all duration-200 outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500 focus:glass-strong transition-all duration-200 outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500 focus:glass-strong transition-all duration-200 outline-none"
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 focus:border-primary-500 focus:glass-strong transition-all duration-200 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full group relative px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 transform-gpu"
              >
                <span className="relative z-10 uppercase tracking-wide">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Natnael Wondwoesn Solomon. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

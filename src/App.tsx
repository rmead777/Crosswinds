import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Brain, 
  BarChart3, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  Linkedin, 
  Mail, 
  CheckCircle2,
  ChevronRight,
  Target,
  Activity
} from 'lucide-react';

console.log("Crosswinds Advisory App Initializing...");

const NAV_LINKS = [
  { name: 'Capabilities', href: '#capabilities' },
  { name: 'Approach', href: '#approach' },
  { name: 'Principal', href: '#principal' },
];

const COMPANIES = [
  'RTX', 'Prudential Financial', 'XL Catlin', 'The Hartford', 'Capital One'
];

const HeroParticles = () => {
  // Generate random particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2px to 6px
    x: Math.random() * 100, // 0% to 100%
    y: Math.random() * 100, // 0% to 100%
    duration: Math.random() * 15 + 15, // 15s to 30s
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-gold/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [`${p.y}%`, `${p.y - 15}%`, `${p.y}%`],
            x: [`${p.x}%`, `${p.x + 10}%`, `${p.x}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const CAPABILITIES = [
  {
    title: 'Enterprise Risk Management (ERM)',
    description: 'Practical frameworks designed for real-world adoption, moving beyond theoretical compliance to strategic value.',
    icon: Shield,
  },
  {
    title: 'Operational Resilience',
    description: 'Business continuity and disaster recovery programs that ensure your organization can absorb shocks and maintain critical functions.',
    icon: Activity,
  },
  {
    title: 'AI Risk Governance',
    description: 'Enabling innovation through disciplined AI risk assessment, ethical frameworks, and governance models.',
    icon: Brain,
  },
  {
    title: 'Cyber & Data Security',
    description: 'Strategic oversight of cybersecurity posture and data protection strategies aligned with enterprise objectives.',
    icon: Zap,
  }
];

const METHODOLOGY = [
  {
    step: '01',
    title: 'Map Uncertainty',
    description: 'Identify the critical decisions and the variables that impact your strategic objectives.'
  },
  {
    step: '02',
    title: 'Quantify & Assess',
    description: 'Use AI-driven tools to streamline identification and deliver clear, actionable insights.'
  },
  {
    step: '03',
    title: 'Enable Action',
    description: 'Deliver lightweight, low-resource-impact solutions that executives and boards can act on with confidence.'
  }
];

const INSIGHTS = [
  {
    title: 'The AI Risk Paradox',
    category: 'AI Governance',
    description: 'How to enable innovation while maintaining strict model governance.',
    readTime: '4 min'
  },
  {
    title: 'Resilience vs. Redundancy',
    category: 'Operational Resilience',
    description: 'Why more infrastructure doesn’t always mean more stability.',
    readTime: '6 min'
  },
  {
    title: 'The Cost of Compliance Drag',
    category: 'ERM',
    description: 'Measuring the impact of bloated risk frameworks on organizational speed.',
    readTime: '5 min'
  }
];

function RiskMaturityAssessment() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      q: "How often does your risk data influence a major strategic decision?",
      options: [
        { label: "Rarely / Post-decision", val: 1 },
        { label: "Sometimes / Ad-hoc", val: 2 },
        { label: "Consistently / Integrated", val: 3 }
      ]
    },
    {
      q: "How long does it take to generate a board-level risk report?",
      options: [
        { label: "Weeks (Manual effort)", val: 1 },
        { label: "Days (Semi-automated)", val: 2 },
        { label: "Hours (AI-enabled)", val: 3 }
      ]
    },
    {
      q: "Is your AI governance framework enabling or blocking innovation?",
      options: [
        { label: "Blocking / Non-existent", val: 1 },
        { label: "Neutral / Compliance-only", val: 2 },
        { label: "Enabling / Strategic", val: 3 }
      ]
    }
  ];

  const handleAnswer = (val: number) => {
    const newScore = score + val;
    if (step < questions.length - 1) {
      setScore(newScore);
      setStep(step + 1);
    } else {
      setScore(newScore);
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-brand-charcoal p-8 md:p-12 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Target size={120} className="text-brand-gold" />
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-brand-gold font-bold text-xs tracking-widest uppercase">Maturity Diagnostic</span>
              <span className="text-brand-cream/60 text-xs font-mono uppercase tracking-widest">STEP {step + 1} OF {questions.length}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-brand-cream mb-8 leading-tight">
              {questions[step].q}
            </h3>
            <div className="grid gap-4">
              {questions[step].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(opt.val)}
                  className="w-full text-left p-6 rounded-2xl bg-white/10 border border-white/10 hover:bg-brand-gold hover:text-brand-charcoal transition-all font-medium group flex justify-between items-center text-brand-cream"
                >
                  {opt.label}
                  <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center py-8"
          >
            <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-brand-charcoal mx-auto mb-6">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-3xl font-serif text-brand-cream mb-4">Assessment Complete</h3>
            <p className="text-brand-cream/60 mb-8 max-w-md mx-auto">
              Your organization shows a maturity score of <span className="text-brand-gold font-bold">{Math.round((score / (questions.length * 3)) * 100)}%</span>. There are significant opportunities to streamline your GRC drag.
            </p>
            <a href="#contact" className="inline-block bg-brand-gold text-brand-charcoal px-8 py-4 rounded-full font-bold hover:bg-brand-cream transition-all">
              Discuss Your Results
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen font-sans"
    >
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-charcoal flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
              <span className="text-brand-cream font-serif font-bold text-lg">C</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-brand-charcoal">
              Crosswinds <span className="text-brand-gold">Advisory</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-brand-charcoal/70 hover:text-brand-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-brand-charcoal text-brand-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-brand-charcoal" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-brand-cream p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="text-brand-charcoal">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif text-brand-charcoal"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-serif text-brand-gold"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        <HeroParticles />

        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <div className="w-[800px] h-[800px] bg-brand-gold rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest uppercase mb-6"
            >
              Principal-Led Advisory
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-serif text-brand-charcoal leading-[1.1] mb-8 text-balance"
            >
              Decision Clarity Under <span className="italic text-brand-gold">Uncertainty.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl text-brand-charcoal/70 leading-relaxed mb-10 max-w-2xl"
            >
              Practical enterprise risk management, operational resilience, and AI-enabled GRC solutions designed to strengthen organizations and enable strategic confidence.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contact" className="bg-brand-charcoal text-brand-cream px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-gold transition-all group">
                Connect with a Principal <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#capabilities" className="border border-brand-charcoal/20 text-brand-charcoal px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-brand-charcoal/5 transition-all">
                Explore Capabilities
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-brand-charcoal/5 bg-white/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6"
        >
          <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-brand-charcoal/40 mb-8">
            Experience at Global Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale">
            {COMPANIES.map((co, i) => (
              <motion.span 
                key={co} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="font-serif text-xl md:text-2xl text-brand-charcoal font-medium italic"
              >
                {co}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 md:py-40 relative">
        <div className="absolute inset-0 bg-grid-pattern -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-end mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6">
                Strategic Impact, <br />
                <span className="text-brand-gold italic">Efficiently Delivered.</span>
              </h2>
              <p className="text-lg text-brand-charcoal/70 leading-relaxed">
                We specialize in creating lightweight, low-resource-impact proprietary methodologies that streamline risk identification and reporting.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4 border-l-2 border-brand-gold/20 pl-8"
            >
              <p className="text-brand-charcoal/60 italic font-serif text-lg">
                "By combining disciplined process efficiency with AI-driven tools, we deliver clear, actionable insights while minimizing organizational overhead."
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <motion.div 
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-brand-charcoal/5 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-cream transition-colors">
                  <cap.icon size={24} />
                </div>
                <h3 className="text-xl font-serif text-brand-charcoal mb-4">{cap.title}</h3>
                <p className="text-sm text-brand-charcoal/60 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-24 md:py-40 bg-brand-charcoal text-brand-cream overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-gold/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Methodology</h2>
            <p className="text-brand-cream/60 text-lg">
              A process-management mindset designed to perform under pressure and deliver sustainable results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-brand-cream/10 -translate-y-1/2 z-0" />
            
            {METHODOLOGY.map((item, i) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative z-10 group"
              >
                <div className="mb-8 flex items-center justify-center md:justify-start">
                  <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-brand-charcoal font-serif text-2xl font-bold border-4 border-brand-charcoal group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-4 text-center md:text-left">{item.title}</h3>
                <p className="text-brand-cream/60 leading-relaxed text-center md:text-left">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-32 p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-serif mb-6">Why Crosswinds?</h3>
                <ul className="space-y-4">
                  {[
                    'Lightweight, low-resource-impact methodologies',
                    'AI-driven tools for efficiency and scale',
                    'Disciplined process management mindset',
                    'Extensive network of senior risk professionals'
                  ].map((text, i) => (
                    <motion.li 
                      key={text} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="text-brand-gold mt-1 shrink-0" size={20} />
                      <span className="text-brand-cream/80">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-gold/10 p-8 rounded-2xl border border-brand-gold/20">
                <p className="text-xl font-serif italic text-brand-gold leading-relaxed">
                  "We deliver dedicated principal expertise with the flexible reach of an extensive network for more complex or larger-scale engagements."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6">The Crosswinds Edge</h2>
            <p className="text-brand-charcoal/60 max-w-2xl mx-auto">Why we outperform traditional big-box advisory firms.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-px bg-brand-charcoal/5 rounded-3xl overflow-hidden border border-brand-charcoal/5"
          >
            <div className="bg-white p-12">
              <h3 className="text-xs font-bold tracking-widest uppercase text-brand-charcoal/60 mb-10">Traditional Advisory</h3>
              <ul className="space-y-6">
                {[
                  'Bloated frameworks that prioritize compliance over speed',
                  'Junior staff executing generic playbooks',
                  'Manual, labor-intensive reporting cycles',
                  'High implementation drag and organizational fatigue'
                ].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-brand-charcoal/60 line-through decoration-brand-charcoal/30"
                  >
                    <X size={18} className="mt-1 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-charcoal p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={100} className="text-brand-gold" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-10">Crosswinds Approach</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  'Lightweight, proprietary methodologies built for speed',
                  'Dedicated principal expertise on every engagement',
                  'AI-driven tools for real-time risk intelligence',
                  'Low-resource-impact solutions that enable action'
                ].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-3 text-brand-cream"
                  >
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-gold" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diagnostic Section */}
      <section className="py-24 md:py-40 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-4 block">Interactive Diagnostic</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-8">Measure Your Risk Maturity</h2>
              <p className="text-lg text-brand-charcoal/70 leading-relaxed mb-8">
                Take our 60-second diagnostic to understand where your organization stands and identify immediate opportunities for efficiency.
              </p>
              <div className="flex items-center gap-6 text-brand-charcoal/40">
                <div className="flex items-center gap-2">
                  <Zap size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Private & Secure</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RiskMaturityAssessment />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6">Executive Insights</h2>
              <p className="text-lg text-brand-charcoal/70">Thought leadership on the intersection of risk, resilience, and AI.</p>
            </div>
            <a href="#" className="text-brand-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Articles <ArrowRight size={18} />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {INSIGHTS.map((insight, i) => (
              <motion.div 
                key={insight.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-brand-charcoal/5 rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-charcoal">
                      {insight.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-brand-charcoal mb-3 group-hover:text-brand-gold transition-colors">{insight.title}</h3>
                <p className="text-brand-charcoal/60 text-sm mb-4 leading-relaxed">{insight.description}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/50">{insight.readTime} Read</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section id="principal" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="aspect-[4/5] bg-brand-charcoal/5 rounded-3xl overflow-hidden border border-brand-charcoal/10">
                  <img 
                    src="https://picsum.photos/seed/executive/800/1000" 
                    alt="Bill Savage" 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-brand-gold p-8 rounded-2xl shadow-2xl hidden md:block">
                  <p className="text-brand-cream font-serif text-2xl font-bold leading-tight">
                    25+ Years <br />
                    <span className="text-brand-charcoal/60 text-lg font-sans font-medium">Leadership</span>
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-4 block">The Founder</span>
              <h2 className="text-5xl font-serif text-brand-charcoal mb-8">Bill Savage</h2>
              <div className="space-y-6 text-lg text-brand-charcoal/70 leading-relaxed">
                <p>
                  Bill has developed and implemented risk programs across banking, insurance, aerospace, telecom, manufacturing, and technology services.
                </p>
                <p>
                  His leadership experience at major global companies including <span className="text-brand-charcoal font-bold">RTX, Prudential Financial, XL Catlin, The Hartford, and Capital One</span> provides a unique perspective on managing complexity with discipline.
                </p>
                <p>
                  He is recognized for his exceptional facilitation skills and the ability to perform under pressure, delivering clear, actionable insights to executives and boards.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Banking', 'Insurance', 'Aerospace', 'Telecom', 'Manufacturing'].map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                    className="px-4 py-2 bg-brand-charcoal/5 rounded-full text-sm font-medium text-brand-charcoal/60"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-brand-charcoal/5"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 bg-brand-charcoal text-brand-cream">
                <h2 className="text-4xl md:text-5xl font-serif mb-8">Ready to strengthen your risk posture?</h2>
                <p className="text-brand-cream/60 text-lg mb-12">
                  Let’s connect to discuss how we can streamline your risk identification, assessment, and reporting.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-cream/60 mb-1">Email Us</p>
                      <a href="mailto:bill@crosswindsadvisory.com" className="text-xl hover:text-brand-gold transition-colors">bill@crosswindsadvisory.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-cream/60 mb-1">LinkedIn</p>
                      <a href="#" className="text-xl hover:text-brand-gold transition-colors">Bill Savage</a>
                    </div>
                  </div>
                </div>

                <div className="mt-20 pt-12 border-t border-white/10">
                  <p className="text-brand-gold font-serif italic text-xl">
                    Practical. Sustainable. Strategic impact.
                  </p>
                </div>
              </div>

              <div className="p-12 md:p-20">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">Full Name</label>
                      <input type="text" className="w-full bg-brand-charcoal/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">Work Email</label>
                      <input type="email" className="w-full bg-brand-charcoal/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">Organization</label>
                    <input type="text" className="w-full bg-brand-charcoal/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="Company Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">How can we help?</label>
                    <textarea className="w-full bg-brand-charcoal/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-gold outline-none transition-all min-h-[150px]" placeholder="Tell us about your risk management goals..."></textarea>
                  </div>
                  <button className="w-full bg-brand-gold text-brand-charcoal font-bold py-5 rounded-xl hover:bg-brand-charcoal hover:text-brand-cream transition-all shadow-lg hover:shadow-brand-gold/20">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-brand-charcoal/5">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-charcoal flex items-center justify-center rounded-sm">
              <span className="text-brand-cream font-serif font-bold text-xs">C</span>
            </div>
            <span className="font-serif text-lg font-semibold text-brand-charcoal">
              Crosswinds <span className="text-brand-gold">Advisory</span>
            </span>
          </div>
          
          <p className="text-sm text-brand-charcoal/60 font-medium">
            &copy; {new Date().getFullYear()} Crosswinds Advisory LLC. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-brand-charcoal/40 hover:text-brand-gold transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-brand-charcoal/40 hover:text-brand-gold transition-colors"><Mail size={20} /></a>
          </div>
        </motion.div>
      </footer>
    </motion.div>
  );
}

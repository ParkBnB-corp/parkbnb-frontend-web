import React, { useState } from 'react';
import {
  Car,
  Shield,
  QrCode,
  MapPin,
  Download,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Star,
  Lock,
  Building,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  Coins,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { DownloadModal } from './components/DownloadModal';

export const App: React.FC = () => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'spots' | 'garage' | 'host'>('spots');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does ParkBnB India work for drivers?',
      a: 'ParkBnB India lets you search, reserve, and pay for verified private parking bays (driveways, stilt parking, apartment bays) in advance. Upon booking, you receive an instant Gate Pass QR code that security guards scan for seamless, contactless entry.',
    },
    {
      q: 'How do I earn money as a ParkBnB Host?',
      a: 'If you have an unused parking slot, stilt bay, or driveway in your building or bungalow, you can list it on ParkBnB in 2 minutes. Upload 4-angle photos, set your hourly rate (e.g. ₹50/hr), and earn up to ₹15,000/month with automated wallet payouts.',
    },
    {
      q: 'Is my vehicle safe in ParkBnB spots?',
      a: 'Yes! All ParkBnB listed bays are pre-screened with physical clearance checks, CCTV surveillance, and gated security access. Drivers and hosts are verified on the platform for mutual security.',
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'You can cancel any booking before the session start time for a 100% instant refund directly to your ParkBnB wallet or original UPI payment method.',
    },
    {
      q: 'How does the digital Gate Pass QR code work?',
      a: 'Upon booking a bay, ParkBnB generates a dynamic, encrypted Gate Pass QR code. Simply show this to security guards or scan at society checkpoints for instant, contactless parking clearance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
              <Car className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">ParkBnB</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>🇮🇳</span> India
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Smart Parking & Mobility</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#host-hub" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>Host Hub</span>
              <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded-md">Earn ₹15k</span>
            </a>
            <a href="#faqs" className="hover:text-emerald-400 transition-colors">FAQs</a>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-emerald-400 transition-colors">Privacy</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-emerald-400 transition-colors">Terms</button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Get App</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 border-b border-slate-900">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              Official Platform of ParkBnB India • Sole Proprietorship
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Never Circle The Block Again.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Smart Parking For India.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover, reserve, and enter verified private parking bays in seconds. Pre-book driveway and stilt bays with instant QR gate passes. Manage your vehicle garage with streamlined digital access.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 active:scale-98"
            >
              <Smartphone className="w-5 h-5" />
              <span>Download Android App (v1.0.3)</span>
            </button>

            <a
              href="#host-hub"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              <Coins className="w-5 h-5 text-amber-400" />
              <span>List Your Empty Bay (Earn ₹15k/mo)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Store Availability Pill */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Target SDK 36 • Android 16 Ready • Google Play In Review</span>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-3xl font-extrabold text-white">10,000+</p>
              <p className="text-xs text-slate-400 mt-1">Verified Parking Bays</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-3xl font-extrabold text-emerald-400">15+</p>
              <p className="text-xs text-slate-400 mt-1">Indian Metro Cities</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-3xl font-extrabold text-amber-400">4.8 ★</p>
              <p className="text-xs text-slate-400 mt-1">Driver Trust Score</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <p className="text-3xl font-extrabold text-teal-400">99.9%</p>
              <p className="text-xs text-slate-400 mt-1">Booking Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive App Feature Showcase */}
      <section id="features" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Experience ParkBnB Mobile
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Engineered For Indian Drivers & Hosts
            </h2>
            <p className="text-slate-400 mt-4 text-base">
              Explore how ParkBnB transforms city parking with instant reservations, digital garage verification, and host earnings.
            </p>
          </div>

          {/* Feature Showcase Tabs */}
          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveShowcaseTab('spots')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeShowcaseTab === 'spots'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bay Reservation & QR Gate Pass</span>
            </button>
            <button
              onClick={() => setActiveShowcaseTab('garage')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeShowcaseTab === 'garage'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Virtual Garage</span>
            </button>
            <button
              onClick={() => setActiveShowcaseTab('host')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeShowcaseTab === 'host'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Host Hub (Earn ₹15k)</span>
            </button>
          </div>

          {/* Interactive Card Presentation */}
          <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {activeShowcaseTab === 'spots' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <QrCode className="w-4 h-4" /> Contactless Society Gate Entry
                  </div>
                  <h3 className="text-2xl font-bold text-white">Instant Gate Pass QR Code</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    No manual security register signing. Reserve a stilt bay, covered parking slot, or private driveway. Arrive at the premises, present your dynamic gate QR code, and park in your dedicated bay.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Clearance heights verified (e.g. 8ft clearance for SUVs & EVs)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>24x7 CCTV guarded & security gated locations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Affordable rates starting at ₹40/hour and ₹250/day</span>
                    </li>
                  </ul>
                </div>
                {/* Visual Mock Card */}
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-xs font-bold text-emerald-400">ACTIVE GATE PASS</p>
                      <p className="text-base font-bold text-white">Prestige Bay #B-104</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                      CONFIRMED
                    </span>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg">
                      <QrCode className="w-28 h-28 text-slate-950" />
                    </div>
                    <p className="text-xs font-mono text-emerald-400 mt-3 font-bold">PASS-8942-BENGALURU</p>
                    <p className="text-[11px] text-slate-400 mt-1">Show this code to security guard</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                    <div>Location: Electronic City Phase 1</div>
                    <div>Rate: ₹50/hour (Paid via PhonePe)</div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'garage' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20">
                    <ShieldCheck className="w-4 h-4" /> Smart Vehicle Garage
                  </div>
                  <h3 className="text-2xl font-bold text-white">Smart Virtual Garage</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Store and organize your vehicles in one secure dashboard. Keep your vehicle registration numbers, models, and parking preferences ready for rapid one-tap parking booking.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>One-tap vehicle selection during spot booking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Vehicle height and size matching for perfect bay fit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Seamless association with reserved parking bays and security gate passes</span>
                    </li>
                  </ul>
                </div>
                {/* Visual Mock Card */}
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-xs font-bold text-teal-400">REGISTERED VEHICLE</p>
                      <p className="text-base font-bold text-white">KA51JP2542 • Honda Activa</p>
                    </div>
                    <span className="px-2.5 py-1 bg-teal-500/10 text-teal-300 text-[10px] font-bold rounded-full border border-teal-500/30">
                      SAVED
                    </span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Location:</span>
                      <span className="font-semibold text-white">Electronic City, Bengaluru</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Vehicle Type:</span>
                      <span className="font-semibold text-emerald-400">Two Wheeler (EV / Scooter)</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Pass Clearance:</span>
                      <span className="font-semibold text-emerald-400">Standard Bay Access</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-500">Fuel:</span>
                      <span className="font-semibold text-white">Petrol • Two Wheeler</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'host' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                    <Coins className="w-4 h-4" /> Guaranteed Passive Income
                  </div>
                  <h3 className="text-2xl font-bold text-white">Monetize Empty Driveways</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Away at the office from 9 AM to 6 PM? Let verified drivers book your empty parking space. Earn up to ₹15,000 every month without lifting a finger.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Set your own hourly & daily prices (e.g. ₹50/hr, ₹500/day)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Only verified drivers with valid government RC allowed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Instant automated wallet payouts directly to UPI</span>
                    </li>
                  </ul>
                </div>
                {/* Visual Mock Card */}
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-xs font-bold text-amber-400">HOST HUB REVENUE</p>
                      <p className="text-base font-bold text-white">Bengaluru Stilt Bay #1</p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/30">
                      ACTIVE HOST
                    </span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs text-slate-400">Earnings This Month</p>
                    <p className="text-3xl font-extrabold text-emerald-400 mt-1">₹14,850</p>
                    <p className="text-[11px] text-slate-500 mt-1">32 completed bookings • 100% verified</p>
                  </div>
                  <div className="text-[11px] text-slate-400 text-center">
                    Automated payouts processed every Monday to your bank account.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Why ParkBnB India (4 Core Pillars) */}
      <section className="py-20 md:py-28 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Enterprise Grade Mobility
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Why India Chooses ParkBnB
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Contactless Gate Passes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic QR codes verified at community gates. No paper logbooks, no security delays.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Guaranteed Reserved Slot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When you book, your spot is locked exclusively for you. Never arrive to a full lot again.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Bank-Grade 256-Bit Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated PhonePe UPI and card payments. Encrypted in transit, zero card data stored.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Verified Clearance Height</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Know spot dimensions in advance. Perfect for hatchbacks, luxury sedans, SUVs, and EVs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Frictionless In 3 Steps
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-16">
            How To Park With ParkBnB
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-3xl relative text-left">
              <span className="text-4xl font-extrabold text-emerald-500/30">01</span>
              <h3 className="text-xl font-bold text-white mt-4">Search & Choose</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Open the app to find parking spots within 0.5 km of your destination. View photos, clearance heights, and hourly rates.
              </p>
            </div>
            <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-3xl relative text-left">
              <span className="text-4xl font-extrabold text-emerald-500/30">02</span>
              <h3 className="text-xl font-bold text-white mt-4">Book with UPI</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Confirm your slot instantly using PhonePe, Google Pay, Paytm, or your ParkBnB wallet with bank-grade 256-bit encryption.
              </p>
            </div>
            <div className="p-8 bg-slate-900/70 border border-slate-800 rounded-3xl relative text-left">
              <span className="text-4xl font-extrabold text-emerald-500/30">03</span>
              <h3 className="text-xl font-bold text-white mt-4">Scan QR & Park</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Drive to your bay, show the digital gate pass QR to the security guard, and park with total peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Host Hub Banner */}
      <section id="host-hub" className="py-20 md:py-28 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                <Coins className="w-4 h-4" /> Host Hub Program
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Own an unused parking slot? Earn up to ₹15,000 every month.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you live in a gated society with a spare stilt bay, or have an open driveway in a commercial hub, ParkBnB connects you with verified drivers.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Drivers & Hosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Weekly Direct Bank Payouts</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <span>Download App to Register Spot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section id="faqs" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm sm:text-base hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-14 bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold">
                <Car className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-base font-bold text-white">ParkBnB India</span>
                <p className="text-[11px] text-slate-500">Sole Proprietorship • Mohali, Punjab, India</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">
                Terms & Conditions
              </button>
              <a href="mailto:support@parkbnb.in" className="hover:text-white transition-colors">
                Support: support@parkbnb.in
              </a>
              <button onClick={() => setIsDownloadOpen(true)} className="text-emerald-400 hover:text-emerald-300 font-semibold">
                Download App (v1.0.3)
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>
              © 2026 ParkBnB India. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              <span>Built for Indian Urban Mobility</span>
              <span>•</span>
              <span>Secure & Encrypted Platform</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Legal & Download Modals */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <DownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
};

export default App;

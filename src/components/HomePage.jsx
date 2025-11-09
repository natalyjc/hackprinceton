import React, { useState } from 'react';
import { Zap, Camera, BarChart3, Lightbulb, TrendingUp, CheckCircle2, ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function HomePage({ setActivePage }) {
  const [email, setEmail] = useState('');
  const [demoEmail, setDemoEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    alert('Thank you for your interest! We\'ll be in touch soon.');
    setEmail('');
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    // Handle demo request
    console.log('Demo requested:', demoEmail);
    alert('Demo request received! We\'ll contact you to schedule a time.');
    setDemoEmail('');
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Lighting Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Illuminate Your Properties with
          <span className="text-blue-600"> Smart Lighting AI</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Transform real estate listings with instant AI-powered lighting analysis. 
          Get professional recommendations, energy efficiency insights, and enhance 
          property appeal with the power of artificial intelligence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActivePage('analyze')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            Try It Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => document.getElementById('schedule-demo').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
          >
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how LumoSpace revolutionizes real estate lighting analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Photo Analysis</h3>
            <p className="text-gray-600">
              Upload any room photo or 360° panoramic image and get instant AI-powered 
              lighting analysis in seconds. No technical expertise required.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">
              Receive detailed fixture recommendations with specific lumens, color temperatures, 
              and placement suggestions tailored to your space.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Energy Efficiency Insights</h3>
            <p className="text-gray-600">
              Get energy efficiency ratings and cost estimates to help make informed 
              decisions about lighting improvements and property value enhancement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">360° Panoramic Support</h3>
            <p className="text-gray-600">
              Advanced support for panoramic images to extract maximum spatial information 
              and provide comprehensive room analysis.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Property Value Enhancement</h3>
            <p className="text-gray-600">
              Identify lighting improvements that can increase property appeal and value, 
              perfect for real estate agents and property owners.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Analysis History</h3>
            <p className="text-gray-600">
              Save and review all your analyses. Compare different properties, track improvements, 
              and access detailed reports anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies & Examples</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how LumoSpace is transforming real estate lighting analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Luxury Home Listing</h3>
                <p className="text-sm text-gray-600">Real Estate Agent</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "LumoSpace helped me identify optimal lighting conditions for my luxury home listing. 
              The AI recommendations increased buyer interest by 40% and helped close the sale 2 weeks faster."
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">40% Increase</span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">Faster Sale</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                B
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Commercial Property</h3>
                <p className="text-sm text-gray-600">Property Developer</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "Using LumoSpace for our commercial properties, we've reduced energy costs by 25% 
              while improving lighting quality. The energy efficiency insights are invaluable."
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">25% Savings</span>
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">Better Quality</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Staging Professional</h3>
                <p className="text-sm text-gray-600">Home Staging Company</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "LumoSpace revolutionized our staging process. We can now provide data-driven lighting 
              recommendations that enhance property appeal and help our clients sell faster."
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Data-Driven</span>
              <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm">Faster Sales</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                D
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Property Portfolio</h3>
                <p className="text-sm text-gray-600">Real Estate Investor</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "Managing multiple properties, LumoSpace helps me quickly assess lighting conditions 
              and prioritize improvements. The analysis history feature is perfect for tracking progress."
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Quick Assessment</span>
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">Portfolio Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Demo Section */}
      <section id="schedule-demo" className="py-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Schedule a Demo</h2>
            <p className="text-xl text-blue-100 mb-8">
              See LumoSpace in action. Book a personalized demo and discover how 
              AI-powered lighting analysis can transform your real estate business.
            </p>
            <form onSubmit={handleDemoSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all whitespace-nowrap"
              >
                Schedule Demo
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


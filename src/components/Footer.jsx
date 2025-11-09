import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import logo from './Text Right Black.png';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log('Footer email submitted:', email);
    alert('Thank you for subscribing! We\'ll send you updates and news.');
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <img 
              src={logo}
              alt="LumoSpace Logo" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-600 text-sm">
              AI-powered lighting analysis for real estate professionals. 
              Transform properties with smart lighting intelligence.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest updates, features, and tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#schedule-demo" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Schedule Demo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} LumoSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


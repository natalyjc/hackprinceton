import React, { useState, useEffect } from 'react';
import { Camera, Upload, Sun, AlertCircle, CheckCircle2, Trash2, Clock, Zap } from 'lucide-react';
import { analyzeImageWithAI } from '../services/aiService';
import { saveToHistory, loadHistory, deleteFromHistory } from '../utils/storage';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import AnalysisTab from './AnalysisTab';
import HistoryTab from './HistoryTab';

export default function LightDesignAI() {
  const [activePage, setActivePage] = useState('home');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    try {
      const result = await analyzeImageWithAI(selectedImage, imagePreview);
      setAnalysis(result);
      const newHistory = saveToHistory(history, result, imagePreview);
      setHistory(newHistory);
      setAnalyzing(false);
    } catch (error) {
      console.error("Analysis error:", error);
      let errorMsg = "Failed to analyze image. Please check your connection and try again.";
      if (error && error.message) {
        errorMsg += `\nDetails: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMsg += `\nDetails: ${error}`;
      }
      alert(errorMsg);
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
  };

  const loadHistoryItem = (index) => {
    const item = history[index];
    if (item) {
      setAnalysis(item.analysis);
      setImagePreview(item.image);
      setActivePage('analyze');
    }
  };

  const deleteHistoryItem = (index) => {
    const newHistory = deleteFromHistory(history, index);
    setHistory(newHistory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {activePage === 'home' && (
            <HomePage setActivePage={setActivePage} />
          )}
          
          {activePage === 'analyze' && (
            <AnalysisTab
              analysis={analysis}
              analyzing={analyzing}
              imagePreview={imagePreview}
              handleImageUpload={handleImageUpload}
              analyzeImage={analyzeImage}
              resetAnalysis={resetAnalysis}
            />
          )}
          
          {activePage === 'history' && (
            <HistoryTab
              history={history}
              loadHistoryItem={loadHistoryItem}
              deleteHistoryItem={deleteHistoryItem}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Zap, Droplets, Cpu, Globe, TrendingUp, AlertTriangle, Lightbulb, Leaf, Play, Menu, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './App.css';

// Import des images générées
import aiImage1 from './assets/ai_image_1.png';
import aiImage2 from './assets/ai_image_2.png';
import aiImage3 from './assets/ai_image_3.png';
import aiImage4 from './assets/ai_image_4.png';

// Hook pour l'animation de comptage depuis la valeur précédente
const useCountUp = (targetValue, duration = 2000, delay = 0) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const previousValue = useRef(targetValue);
  const animationRef = useRef(null);

  useEffect(() => {
    // Si c'est la première fois, on affiche directement la valeur
    if (previousValue.current === targetValue) {
      setDisplayValue(targetValue);
      return;
    }

    const startValue = previousValue.current;
    const endValue = targetValue;
    
    // Annuler l'animation précédente si elle existe
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const timer = setTimeout(() => {
      let startTime;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Interpolation entre l'ancienne et la nouvelle valeur
        const currentValue = startValue + (endValue - startValue) * progress;
        
        if (typeof targetValue === 'number') {
          setDisplayValue(Math.round(currentValue));
        } else {
          setDisplayValue(currentValue);
        }
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          previousValue.current = endValue;
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, delay]);

  // Mettre à jour la valeur précédente quand le composant se démonte ou que la valeur change
  useEffect(() => {
    return () => {
      previousValue.current = displayValue;
    };
  }, [displayValue]);

  return displayValue;
};

// Composant pour les chiffres animés
const AnimatedCounter = ({ value, suffix = '', prefix = '', decimals = 0, duration = 1500, delay = 0 }) => {
  const animatedValue = useCountUp(value, duration, delay);
  
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString('fr-FR');
    }
    return parseFloat(val).toFixed(decimals);
  };
  
  return (
    <span className="tabular-nums">
      {prefix}{formatValue(animatedValue)}{suffix}
    </span>
  );
};

const App = () => {
  const [currentStats, setCurrentStats] = useState({
    energyConsumption: 156.7,
    co2Emissions: 62.3,
    aiRequests: 347892,
    waterConsumption: 2.8
  });

  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for the calculator
  const [numPeople, setNumPeople] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [calculatedConsumption, setCalculatedConsumption] = useState({
    water: 0,
    co2: 0,
    energy: 0
  });

  const aiImages = [
    { 
      id: 1, 
      src: aiImage1, 
      consumption: '50',
      water: '25',
      co2: '10',
      description: 'Paysage futuriste' 
    },
    { 
      id: 2, 
      src: aiImage2, 
      consumption: '35',
      water: '18',
      co2: '7',
      description: 'Visage abstrait de circuits' 
    },
    { 
      id: 3, 
      src: aiImage3, 
      consumption: '60',
      water: '30',
      co2: '12',
      description: 'Forêt mystique' 
    },
    { 
      id: 4, 
      src: aiImage4, 
      consumption: '40',
      water: '20',
      co2: '8',
      description: 'Robot et plante' 
    },
  ];

  const videos = [
    {
      id: 1,
      title: "L'impact environnemental de l'IA",
      url: "https://youtu.be/QkYMPyavfjs?si=d2qttQon9qWi8R8W",
      embedId: "QkYMPyavfjs"
    },
    {
      id: 2,
      title: "Consommation énergétique des centres de données",
      url: "https://youtu.be/LNoklk0NRmQ?si=3IgCF-_0go2Xo-jD",
      embedId: "LNoklk0NRmQ"
    },
    {
      id: 3,
      title: "Solutions pour une IA plus verte",
      url: "https://youtu.be/uqSMDSy0DVU?si=v96HSiPLR6mqOjXu",
      embedId: "uqSMDSy0DVU"
    }
  ];

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const quizQuestions = [
    {
      question: "Quelle est la consommation d'énergie pour générer une image IA haute définition ?",
      options: [
        "Équivalent à 5 minutes de charge d'un téléphone",
        "Équivalent à une recharge complète d'un téléphone",
        "Équivalent à 1 heure de télévision",
        "Équivalent à 10 minutes d'ampoule LED"
      ],
      correct: 1
    },
    {
      question: "Combien de fois plus d'énergie consomme ChatGPT qu'une recherche Google ?",
      options: ["2 fois plus", "5 fois plus", "10 fois plus", "20 fois plus"],
      correct: 2
    },
    {
      question: "Quel pourcentage représente le numérique dans l'empreinte carbone française ?",
      options: ["1%", "2.5%", "5%", "10%"],
      correct: 1
    },
    {
      question: "Quel composant est le plus énergivore dans l'IA ?",
      options: ["CPU", "GPU", "RAM", "Stockage"],
      correct: 1
    },
    {
      question: "Quelle solution peut réduire l'impact environnemental de l'IA ?",
      options: [
        "Utiliser uniquement des CPU",
        "Augmenter la fréquence d'entraînement",
        "Optimiser les algorithmes",
        "Multiplier les centres de données"
      ],
      correct: 2
    }
  ];

  const energyData = [
    { name: 'Jan', consumption: 120 },
    { name: 'Fév', consumption: 135 },
    { name: 'Mar', consumption: 142 },
    { name: 'Avr', consumption: 148 },
    { name: 'Mai', consumption: 156 },
    { name: 'Juin', consumption: 157 }
  ];

  const impactData = [
    { name: 'Entraînement', value: 65, color: '#ff6b35' },
    { name: 'Inférence', value: 25, color: '#1a365d' },
    { name: 'Refroidissement', value: 10, color: '#48bb78' }
  ];

  const comparisonData = [
    { name: 'Recherche Google', energy: 0.2 },
    { name: 'Email', energy: 4 },
    { name: 'Streaming 1h', energy: 36 },
    { name: 'Image IA', energy: 50 },
    { name: 'ChatGPT requête', energy: 2.9 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        energyConsumption: prev.energyConsumption + (Math.random() - 0.5) * 2,
        co2Emissions: prev.co2Emissions + (Math.random() - 0.5) * 1,
        aiRequests: prev.aiRequests + Math.floor(Math.random() * 1000),
        waterConsumption: prev.waterConsumption + (Math.random() - 0.5) * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculator logic (simplifié sans heures par jour)
  useEffect(() => {
    const calculateConsumption = () => {
      const promptsPerPersonPerDay = 10;
      const waterPerPrompt = 5;
      const co2PerPrompt = 2;
      const energyPerPrompt = 2;

      const totalPrompts = numPeople * promptsPerPersonPerDay * daysPerWeek;

      const totalWater = totalPrompts * waterPerPrompt;
      const totalCo2 = totalPrompts * co2PerPrompt;
      const totalEnergy = totalPrompts * energyPerPrompt;

      setCalculatedConsumption({
        water: totalWater,
        co2: totalCo2,
        energy: totalEnergy
      });
    };
    calculateConsumption();
  }, [numPeople, daysPerWeek]);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowQuizResults(false);
    setSelectedAnswers([]);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-green-700 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Impact IA</h1>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-4 xl:space-x-6">
            <li><button onClick={() => scrollToSection('calculator')} className="text-white hover:text-green-200 transition-colors duration-300">Calculateur</button></li>
            <li><button onClick={() => scrollToSection('stats')} className="text-white hover:text-green-200 transition-colors duration-300">Statistiques</button></li>
            <li><button onClick={() => scrollToSection('images')} className="text-white hover:text-green-200 transition-colors duration-300">Images IA</button></li>
            <li><button onClick={() => scrollToSection('videos')} className="text-white hover:text-green-200 transition-colors duration-300">Vidéos</button></li>
            <li><button onClick={() => scrollToSection('quiz')} className="text-white hover:text-green-200 transition-colors duration-300">Quiz</button></li>
            <li><button onClick={() => scrollToSection('solutions')} className="text-white hover:text-green-200 transition-colors duration-300">Solutions</button></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-2">
              <li><button onClick={() => scrollToSection('calculator')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Calculateur</button></li>
              <li><button onClick={() => scrollToSection('stats')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Statistiques</button></li>
              <li><button onClick={() => scrollToSection('images')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Images IA</button></li>
              <li><button onClick={() => scrollToSection('videos')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Vidéos</button></li>
              <li><button onClick={() => scrollToSection('quiz')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Quiz</button></li>
              <li><button onClick={() => scrollToSection('solutions')} className="block w-full text-left text-white hover:text-green-200 transition-colors duration-300 py-2">Solutions</button></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-green-800 leading-tight animate-fade-in-down">
            L'Impact Environnemental de l'IA
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 text-gray-700 max-w-4xl mx-auto animate-fade-in-up px-4">
            Découvrez en temps réel la consommation énergétique de l'intelligence artificielle 
            et son impact sur notre planète. Agissons ensemble pour un avenir numérique durable.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Calculez votre Consommation IA
          </h2>
          <Card className="bg-white border-gray-200 p-4 sm:p-6 shadow-lg rounded-lg max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-gray-800 text-xl sm:text-2xl text-center lg:text-left">Estimez l'impact de l'IA sur votre consommation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
                <div>
                  <Label htmlFor="numPeople" className="text-base sm:text-lg font-medium text-gray-700">Nombre de personnes</Label>
                  <Input 
                    id="numPeople" 
                    type="number" 
                    value={numPeople} 
                    onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="mt-2 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="daysPerWeek" className="text-base sm:text-lg font-medium text-gray-700">Jours d'utilisation</Label>
                  <Input 
                    id="daysPerWeek" 
                    type="number" 
                    value={daysPerWeek} 
                    onChange={(e) => setDaysPerWeek(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="mt-2 p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
                <Card className="bg-green-100 border-green-200 p-3 sm:p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-lg sm:text-xl">Eau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
                      <AnimatedCounter value={calculatedConsumption.water} suffix=" L" duration={800} />
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 border-green-200 p-3 sm:p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-lg sm:text-xl">CO2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
                      <AnimatedCounter value={calculatedConsumption.co2} suffix=" g" duration={800} />
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 border-green-200 p-3 sm:p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-lg sm:text-xl">Énergie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800">
                      <AnimatedCounter value={calculatedConsumption.energy} suffix=" Wh" duration={800} />
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6 text-center px-2">
                Basé sur une moyenne de 10 prompts par personne, 5 litres d'eau, 2g de CO2 et 2 Wh par prompt.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats en temps réel */}
      <section id="stats" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Statistiques en Temps Réel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-green-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  Consommation Énergétique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter 
                    value={currentStats.energyConsumption} 
                    suffix=" TWh" 
                    decimals={1}
                    duration={1000}
                  />
                </div>
                <Progress value={75} className="h-2 bg-white/20" />
                <p className="text-xs sm:text-sm mt-2 opacity-90">Consommation mondiale annuelle</p>
              </CardContent>
            </Card>

            <Card className="bg-red-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Émissions CO2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter 
                    value={currentStats.co2Emissions} 
                    suffix=" Mt" 
                    decimals={1}
                    duration={1000}
                  />
                </div>
                <Progress value={60} className="h-2 bg-white/20" />
                <p className="text-xs sm:text-sm mt-2 opacity-90">Émissions annuelles</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  Requêtes IA/sec
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter 
                    value={currentStats.aiRequests} 
                    duration={1000}
                  />
                </div>
                <Progress value={85} className="h-2 bg-white/20" />
                <p className="text-xs sm:text-sm mt-2 opacity-90">Requêtes mondiales</p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
                  Consommation d'Eau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter 
                    value={currentStats.waterConsumption} 
                    suffix=" Md L" 
                    decimals={1}
                    duration={1000}
                  />
                </div>
                <Progress value={70} className="h-2 bg-white/20" />
                <p className="text-xs sm:text-sm mt-2 opacity-90">Litres par jour</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Graphiques */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Analyse des Données
          </h2>
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-gray-100 border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-lg sm:text-xl">Évolution de la Consommation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#616161" fontSize={12} />
                    <YAxis stroke="#616161" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        color: 'black',
                        fontSize: '14px'
                      }} 
                    />
                    <Line type="monotone" dataKey="consumption" stroke="#4CAF50" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-lg sm:text-xl">Répartition de l'Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelStyle={{ fontSize: '12px' }}
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        color: 'black',
                        fontSize: '14px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 sm:mt-8 bg-gray-100 border-gray-200 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg sm:text-xl">Comparaison Énergétique (Wh)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#616161" fontSize={12} />
                  <YAxis stroke="#616161" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '8px',
                      color: 'black',
                      fontSize: '14px'
                    }} 
                  />
                  <Bar dataKey="energy" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section Galerie d'Images IA */}
      <section id="images" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Images Générées par IA et leur Consommation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {aiImages.map(image => (
              <div 
                key={image.id} 
                className={`flip-card w-full h-48 sm:h-56 lg:h-64 rounded-lg shadow-lg cursor-pointer ${flippedCards[image.id] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(image.id)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={image.src} alt={image.description} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                      <p className="text-xs sm:text-sm text-center">{image.description}</p>
                    </div>
                  </div>
                  <div className="flip-card-back bg-green-600 text-white flex items-center justify-center rounded-lg p-3 sm:p-4">
                    <div className="text-center">
                      <p className="text-base sm:text-lg mb-3 font-medium">Consommation pour la génération :</p>
                      <p className="text-lg sm:text-xl font-medium mb-2">{image.consumption} Wh d'électricité</p>
                      <p className="text-lg sm:text-xl font-medium mb-2">{image.water} L d'eau</p>
                      <p className="text-lg sm:text-xl font-medium">{image.co2} g de CO2</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Vidéos */}
      <section id="videos" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Vidéos Éducatives sur l'Impact de l'IA
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {videos.map(video => (
              <Card key={video.id} className="bg-gray-100 border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-base sm:text-lg flex items-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                    <span className="line-clamp-2">{video.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-b-lg"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Quiz : Testez vos connaissances
          </h2>
          
          {!showQuizResults ? (
            <Card className="bg-white border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-xl sm:text-2xl">
                  Question {currentQuestion + 1} sur {quizQuestions.length}
                </CardTitle>
                <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-800">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="grid gap-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start p-3 sm:p-4 h-auto text-sm sm:text-base text-gray-800 border-gray-300 hover:bg-gray-200 transition-all duration-200"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-center text-xl sm:text-2xl">Résultats du Quiz</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-green-700 animate-fade-in-up">
                  <AnimatedCounter value={quizScore} suffix={`/${quizQuestions.length}`} duration={1500} />
                </div>
                <p className="text-lg sm:text-xl mb-6 text-gray-800 px-4">
                  {quizScore >= 4 ? "Excellent ! Vous maîtrisez bien le sujet." :
                   quizScore >= 3 ? "Bien ! Vous avez de bonnes connaissances." :
                   "Vous pouvez encore apprendre sur ce sujet important."}
                </p>
                <Button onClick={resetQuiz} className="bg-green-700 hover:bg-green-800 text-white transition-colors duration-300 px-6 py-3">
                  Recommencer le Quiz
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Solutions et Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-green-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
                  Énergies Renouvelables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Alimenter les centres de données avec des sources d'énergie propres et durables.</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  Optimisation Algorithmique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Développer des algorithmes plus efficaces et moins gourmands en ressources.</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                  Innovation Technologique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Rechercher de nouvelles technologies de calcul plus économes en énergie.</p>
              </CardContent>
            </Card>
          </div>
          <p className='text-center text-gray-800 mt-8 sm:mt-10 text-sm sm:text-base px-4'>
            Sources : <a href="https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" className="text-green-600 hover:text-green-800 underline">Energy demand from AI</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="mb-4 text-sm sm:text-base">
            © 2025 Impact Environnemental de l'IA - Sensibilisation aux enjeux énergétiques
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-white border-white/20 text-xs sm:text-sm">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Données mondiales
            </Badge>
            <Badge variant="outline" className="text-white border-white/20 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Mise à jour continue
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
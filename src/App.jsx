import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Zap, Droplets, Cpu, Globe, TrendingUp, AlertTriangle, Lightbulb, Leaf, Play } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './App.css';

// Import des images générées
import aiImage1 from './assets/ai_image_1.png';
import aiImage2 from './assets/ai_image_2.png';
import aiImage3 from './assets/ai_image_3.png';
import aiImage4 from './assets/ai_image_4.png';

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

  // State for the calculator
  const [numPeople, setNumPeople] = useState(1);
  const [hoursPerDay, setHoursPerDay] = useState(1);
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
      consumption: '50 Wh', 
      water: '25 L',
      co2: '10 g',
      description: 'Paysage futuriste' 
    },
    { 
      id: 2, 
      src: aiImage2, 
      consumption: '35 Wh', 
      water: '18 L',
      co2: '7 g',
      description: 'Visage abstrait de circuits' 
    },
    { 
      id: 3, 
      src: aiImage3, 
      consumption: '60 Wh', 
      water: '30 L',
      co2: '12 g',
      description: 'Forêt mystique' 
    },
    { 
      id: 4, 
      src: aiImage4, 
      consumption: '40 Wh', 
      water: '20 L',
      co2: '8 g',
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

  // Calculator logic
  useEffect(() => {
    const calculateConsumption = () => {
      const promptsPerPersonPerDay = 10; // Given average
      const waterPerPrompt = 5; // Liters
      const co2PerPrompt = 2; // Grams
      const energyPerPrompt = 2; // Wh

      const totalPrompts = numPeople * promptsPerPersonPerDay * hoursPerDay * daysPerWeek; // Simplified, assuming 10 prompts/person/hour

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
  }, [numPeople, hoursPerDay, daysPerWeek]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-green-700 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Impact IA</h1>
          <ul className="flex space-x-4">
            <li><a href="#calculator" className="text-white hover:text-green-200 transition-colors duration-300">Calculateur</a></li>
            <li><a href="#stats" className="text-white hover:text-green-200 transition-colors duration-300">Statistiques</a></li>
            <li><a href="#images" className="text-white hover:text-green-200 transition-colors duration-300">Images IA</a></li>
            <li><a href="#videos" className="text-white hover:text-green-200 transition-colors duration-300">Vidéos</a></li>
            <li><a href="#quiz" className="text-white hover:text-green-200 transition-colors duration-300">Quiz</a></li>
            <li><a href="#solutions" className="text-white hover:text-green-200 transition-colors duration-300">Solutions</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-extrabold mb-6 text-green-800 leading-tight animate-fade-in-down">
            L'Impact Environnemental de l'IA
          </h1>
          <p className="text-2xl mb-10 text-gray-700 max-w-3xl mx-auto animate-fade-in-up">
            Découvrez en temps réel la consommation énergétique de l'intelligence artificielle 
            et son impact sur notre planète. Agissons ensemble pour un avenir numérique durable.
          </p>
          <div className="flex justify-center gap-6 flex-wrap animate-fade-in-up delay-200">
            <Badge variant="secondary" className="text-xl px-6 py-3 bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Zap className="w-5 h-5 mr-3" />
              Données en temps réel
            </Badge>
            <Badge variant="outline" className="text-xl px-6 py-3 text-green-700 border-green-700 shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <TrendingUp className="w-5 h-5 mr-3" />
              Statistiques interactives
            </Badge>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Calculez votre Consommation IA
          </h2>
          <Card className="bg-white border-gray-200 p-6 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 text-2xl">Estimez l'impact de l'IA sur votre consommation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <Label htmlFor="numPeople" className="text-lg font-medium text-gray-700">Nombre de personnes</Label>
                  <Input 
                    id="numPeople" 
                    type="number" 
                    value={numPeople} 
                    onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="hoursPerDay" className="text-lg font-medium text-gray-700">Heures d'utilisation par jour</Label>
                  <Input 
                    id="hoursPerDay" 
                    type="number" 
                    value={hoursPerDay} 
                    onChange={(e) => setHoursPerDay(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="daysPerWeek" className="text-lg font-medium text-gray-700">Jours d'utilisation par semaine</Label>
                  <Input 
                    id="daysPerWeek" 
                    type="number" 
                    value={daysPerWeek} 
                    onChange={(e) => setDaysPerWeek(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <Card className="bg-green-100 border-green-200 p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-xl">Eau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-green-800">{Math.round(calculatedConsumption.water)} L</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 border-green-200 p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-xl">CO2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-green-800">{Math.round(calculatedConsumption.co2)} g</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-100 border-green-200 p-4 rounded-lg shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-700 text-xl">Énergie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-bold text-green-800">{Math.round(calculatedConsumption.energy)} Wh</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-gray-600 mt-6 text-center">
                Basé sur une moyenne de 10 prompts par personne, 5 litres d'eau, 2g de CO2 et 2 Wh par prompt.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats en temps réel */}
      <section id="stats" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Statistiques en Temps Réel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-green-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5" />
                  Consommation Énergétique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {currentStats.energyConsumption.toFixed(1)} TWh
                </div>
                <Progress value={75} className="h-2 bg-white/20" />
                <p className="text-sm mt-2 opacity-90">Consommation mondiale annuelle</p>
              </CardContent>
            </Card>

            <Card className="bg-red-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5" />
                  Émissions CO2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {currentStats.co2Emissions.toFixed(1)} Mt
                </div>
                <Progress value={60} className="h-2 bg-white/20" />
                <p className="text-sm mt-2 opacity-90">Émissions annuelles</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Cpu className="w-5 h-5" />
                  Requêtes IA/sec
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {currentStats.aiRequests.toLocaleString()}
                </div>
                <Progress value={85} className="h-2 bg-white/20" />
                <p className="text-sm mt-2 opacity-90">Requêtes mondiales</p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-500 text-white border-none shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Droplets className="w-5 h-5" />
                  Consommation d'Eau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">
                  {currentStats.waterConsumption.toFixed(1)} Md L
                </div>
                <Progress value={70} className="h-2 bg-white/20" />
                <p className="text-sm mt-2 opacity-90">Litres par jour</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Graphiques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Analyse des Données
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gray-100 border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-xl">Évolution de la Consommation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#616161" />
                    <YAxis stroke="#616161" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px',
                        color: 'black'
                      }} 
                    />
                    <Line type="monotone" dataKey="consumption" stroke="#4CAF50" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-xl">Répartition de l'Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
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
                        color: 'black'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-gray-100 border-gray-200 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 text-xl">Comparaison Énergétique (Wh)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#616161" />
                  <YAxis stroke="#616161" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: '8px',
                      color: 'black'
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
      <section id="images" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Images Générées par IA et leur Consommation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiImages.map(image => (
              <div 
                key={image.id} 
                className={`flip-card w-full h-64 rounded-lg shadow-lg cursor-pointer ${flippedCards[image.id] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(image.id)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={image.src} alt={image.description} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                      <p className="text-sm text-center">{image.description}</p>
                    </div>
                  </div>
                  <div className="flip-card-back bg-green-600 text-white flex items-center justify-center rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-lg mb-2">Consommation pour la génération :</p>
                      <p className="text-3xl font-bold mb-1">{image.consumption}</p>
                      <p className="text-xl mb-1">{image.water}</p>
                      <p className="text-xl">{image.co2}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Vidéos */}
      <section id="videos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Vidéos Éducatives sur l'Impact de l'IA
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {videos.map(video => (
              <Card key={video.id} className="bg-gray-100 border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-600" />
                    {video.title}
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
      <section id="quiz" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Quiz : Testez vos connaissances
          </h2>
          
          {!showQuizResults ? (
            <Card className="bg-white border-gray-200 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 text-2xl">
                  Question {currentQuestion + 1} sur {quizQuestions.length}
                </CardTitle>
                <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl mb-6 text-gray-800">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="grid gap-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start p-4 h-auto text-gray-800 border-gray-300 hover:bg-gray-200 transition-all duration-200"
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
                <CardTitle className="text-gray-800 text-center text-2xl">Résultats du Quiz</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold mb-4 text-green-700 animate-fade-in-up">
                  {quizScore}/{quizQuestions.length}
                </div>
                <p className="text-xl mb-6 text-gray-800">
                  {quizScore >= 4 ? "Excellent ! Vous maîtrisez bien le sujet." :
                   quizScore >= 3 ? "Bien ! Vous avez de bonnes connaissances." :
                   "Vous pouvez encore apprendre sur ce sujet important."}
                </p>
                <Button onClick={resetQuiz} className="bg-green-700 hover:bg-green-800 text-white transition-colors duration-300">
                  Recommencer le Quiz
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Solutions et Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-green-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Leaf className="w-5 h-5" />
                  Énergies Renouvelables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Alimenter les centres de données avec des sources d'énergie propres et durables.</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Cpu className="w-5 h-5" />
                  Optimisation Algorithmique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Développer des algorithmes plus efficaces et moins gourmands en ressources.</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white border-none shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="w-5 h-5" />
                  Innovation Technologique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rechercher de nouvelles technologies de calcul plus économes en énergie.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="mb-4">
            © 2025 Impact Environnemental de l'IA - Sensibilisation aux enjeux énergétiques
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-white border-white/20">
              <Globe className="w-4 h-4 mr-2" />
              Données mondiales
            </Badge>
            <Badge variant="outline" className="text-white border-white/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Mise à jour continue
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


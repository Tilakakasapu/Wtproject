import React, { useEffect, useRef } from 'react';
import { Heart, PawPrint, Users, Home, Trophy, ArrowRight } from 'lucide-react';

function App() {
  const timelineRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    if (timelineRef.current) observer.observe(timelineRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (storyRef.current) observer.observe(storyRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=2000"
          alt="Happy dog and cat"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-down">
              Finding Forever Homes
            </h1>
            <p className="text-xl md:text-2xl animate-fade-up">
              Every tail has a story. Every heart has a home.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe every pet deserves a loving home. Since 2015, we've been connecting
            wonderful animals with caring families, creating countless happy endings and
            new beginnings.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-white opacity-0 transition-opacity duration-1000">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: '2015',
                title: 'The Beginning',
                description: 'Started with a small shelter and big dreams',
                icon: <PawPrint className="w-8 h-8 text-blue-500" />
              },
              {
                year: '2018',
                title: 'Growing Community',
                description: '1000+ successful adoptions and counting',
                icon: <Users className="w-8 h-8 text-green-500" />
              },
              {
                year: '2023',
                title: 'National Reach',
                description: 'Now helping pets across the country',
                icon: <Home className="w-8 h-8 text-purple-500" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
                {item.icon}
                <h3 className="text-2xl font-bold mt-4 mb-2">{item.year}</h3>
                <h4 className="text-xl font-semibold mb-2 text-gray-700">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section ref={statsRef} className="py-20 bg-blue-50 opacity-0 transition-opacity duration-1000">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '5000+', label: 'Pets Adopted', icon: <Home className="w-8 h-8 text-blue-500" /> },
              { number: '10k+', label: 'Happy Families', icon: <Heart className="w-8 h-8 text-rose-500" /> },
              { number: '50+', label: 'Partner Shelters', icon: <Trophy className="w-8 h-8 text-yellow-500" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:transform hover:scale-105 transition-transform duration-300">
                {stat.icon}
                <h3 className="text-4xl font-bold my-4">{stat.number}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section ref={storyRef} className="py-20 opacity-0 transition-opacity duration-1000">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">A Tale of Love</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=800"
                  alt="Happy adopted dog with new family"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold mb-4">Max's Story</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  From a shy shelter dog to the heart of the Johnson family, Max's
                  journey represents everything we stand for. Now he spends his days
                  playing fetch, getting belly rubs, and spreading joy to everyone
                  he meets.
                </p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  Read more stories <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8">Ready to Change a Life?</h2>
          <p className="text-xl mb-12">
            Whether you're looking to adopt, foster, or volunteer, we'd love to have
            you join our mission.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
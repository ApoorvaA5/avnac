import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Palette, Share2, Zap, Globe } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  const createNewCanvas = () => {
    const newCanvasId = uuidv4();
    navigate(`/canvas/${newCanvasId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Canvas Editor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create, edit, and share beautiful designs instantly. No login required, 
            just click and start designing. Share your canvas with anyone using a simple link.
          </p>
          <button
            onClick={createNewCanvas}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Creating
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Palette size={24} />}
            title="Easy to Use"
            description="Intuitive tools for rectangles, circles, text, and freehand drawing"
          />
          <FeatureCard
            icon={<Share2 size={24} />}
            title="Instant Sharing"
            description="Share your canvas with anyone using a simple, shareable link"
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Real-time Sync"
            description="Changes are saved automatically and synced across all viewers"
          />
          <FeatureCard
            icon={<Globe size={24} />}
            title="No Sign-up"
            description="Start creating immediately without any registration or login"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create"
              description="Click 'Start Creating' to generate a new canvas with a unique link"
            />
            <StepCard
              number="2"
              title="Design"
              description="Use our intuitive tools to add shapes, text, and drawings to your canvas"
            />
            <StepCard
              number="3"
              title="Share"
              description="Copy the link and share it with anyone for instant collaboration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
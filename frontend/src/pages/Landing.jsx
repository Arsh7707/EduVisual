import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card, CardBody } from '../components/common/Card';
import { Sparkles, Image, Download } from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Enhancement',
      description: 'Automatically extract key topics and add concise explanations for clarity',
    },
    {
      icon: Image,
      title: 'Visual Generation',
      description: 'Auto-generate relevant images using AI to make content more engaging',
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Export your enhanced lectures to PowerPoint or PDF with one click',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            AI-Powered Lecture Visual Enhancer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your lecture materials and watch them transform into engaging, interactive lessons with AI-generated visuals and questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardBody className="pt-8">
                    <Icon className="mx-auto mb-4 text-blue-600" size={48} />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Lectures?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Start uploading your lecture materials today and see the magic happen.
          </p>
          <Link to="/upload">
            <Button variant="secondary" size="lg">
              Upload Your First Lecture
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}


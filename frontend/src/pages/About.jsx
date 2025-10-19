import React from 'react';
import { Card, CardBody } from '../components/common/Card';
import { Sparkles, Image, Download, Zap, Users, Shield } from 'lucide-react';

export function About() {
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
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Get your enhanced lectures in minutes, not hours',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Share and collaborate with colleagues on enhanced lectures',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your data is encrypted and stored securely',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">About EduVisual</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transforming education through AI-powered visual enhancement
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardBody className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              EduVisual is dedicated to revolutionizing the way educators create and deliver lectures. We believe that every lecture deserves to be engaging, visually appealing, and interactive.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              By leveraging cutting-edge AI technology, we help educators transform their lecture materials into compelling visual experiences that enhance student engagement and learning outcomes.
            </p>
          </CardBody>
        </Card>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Why Choose EduVisual?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardBody className="pt-4">
                    <Icon className="mb-4 text-blue-600" size={32} />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <Card className="mb-12">
          <CardBody className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">How It Works</h2>
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold">
                    1
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Upload Your Lecture</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Simply upload your lecture materials in PDF or TXT format
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold">
                    2
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">AI Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI analyzes your content and generates visuals and questions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold">
                    3
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Review & Customize</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Review the generated content and make any adjustments you need
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold">
                    4
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Export & Share</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Export to PowerPoint, PDF, or HTML and share with your students
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <a
              href="mailto:support@eduvisual.com"
              className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
            >
              Contact Us
            </a>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}


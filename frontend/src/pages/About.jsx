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
                  <CardBody className="pt-4 text-center">
                    <div className="flex justify-center mb-4">
                      <Icon className="text-blue-600 dark:text-blue-400" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">How It Works</h2>
          <Card>
            <CardBody className="py-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 overflow-x-auto">
                {/* Step 1 */}
                <div className="flex-1 min-w-full lg:min-w-0 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold text-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Upload Your Lecture</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Simply upload your lecture materials in PDF or TXT format
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex-1 min-w-full lg:min-w-0 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold text-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">AI Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Our AI analyzes your content and generates visuals and questions
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex-1 min-w-full lg:min-w-0 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold text-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Review & Customize</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Review the generated content and make any adjustments you need
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex-1 min-w-full lg:min-w-0 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-700 text-white font-bold text-lg">
                      4
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Export & Share</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Export to PowerPoint, PDF, or HTML and share with your students
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

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


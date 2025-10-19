import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useTheme } from '../hooks/useTheme';

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    toggleTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Settings</h1>

        {/* Preferences Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Preferences</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </CardBody>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">About</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Version:</span> 1.0.0
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                EduVisual is an AI-powered lecture visual enhancer that transforms your lecture materials into engaging, interactive lessons.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                View Documentation →
              </a>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="secondary" size="sm">
              Check for Updates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


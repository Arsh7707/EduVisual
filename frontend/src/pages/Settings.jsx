import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useNotification } from '../hooks/useNotification';
import { useTheme } from '../hooks/useTheme';

export function Settings() {
  const { success } = useNotification();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    apiKey: localStorage.getItem('apiKey') || '',
    theme: theme,
    notifications: localStorage.getItem('notifications') !== 'false',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    localStorage.setItem('apiKey', settings.apiKey);
    localStorage.setItem('notifications', settings.notifications);
    toggleTheme(settings.theme);
    success('Settings saved successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Settings</h1>

        {/* API Key Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">API Configuration</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="password"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Your API key is stored locally and never sent to our servers
              </p>
            </div>
          </CardBody>
        </Card>

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
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="notifications" className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable notifications
              </label>
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

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <Button variant="primary" size="lg" onClick={handleSave} className="flex-1">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}


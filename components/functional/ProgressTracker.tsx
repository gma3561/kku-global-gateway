'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'visa' | 'documents' | 'arrival' | 'settlement';
}

interface ProgressTrackerProps {
  t: any;
}

export default function ProgressTracker({ t }: ProgressTrackerProps) {
  const [tasks, setTasks] = useState<Task[]>([
    // Visa Tasks
    { id: 'visa-1', title: t.progress?.tasks?.visaApplication || 'Submit D-2 Visa Application', completed: false, category: 'visa' },
    { id: 'visa-2', title: t.progress?.tasks?.admissionLetter || 'Receive Admission Letter', completed: false, category: 'visa' },
    { id: 'visa-3', title: t.progress?.tasks?.financialProof || 'Prepare Financial Proof', completed: false, category: 'visa' },

    // Documents
    { id: 'doc-1', title: t.progress?.tasks?.passport || 'Valid Passport (6+ months)', completed: false, category: 'documents' },
    { id: 'doc-2', title: t.progress?.tasks?.transcripts || 'Apostilled Academic Transcripts', completed: false, category: 'documents' },
    { id: 'doc-3', title: t.progress?.tasks?.healthInsurance || 'International Health Insurance', completed: false, category: 'documents' },

    // Arrival Preparation
    { id: 'arrival-1', title: t.progress?.tasks?.flightBooking || 'Book Flight to Incheon Airport', completed: false, category: 'arrival' },
    { id: 'arrival-2', title: t.progress?.tasks?.pickupService || 'Arrange Airport Pickup', completed: false, category: 'arrival' },
    { id: 'arrival-3', title: t.progress?.tasks?.dormReservation || 'Confirm Dormitory Reservation', completed: false, category: 'arrival' },

    // Settlement
    { id: 'settle-1', title: t.progress?.tasks?.alienRegistration || 'Alien Registration Card (within 90 days)', completed: false, category: 'settlement' },
    { id: 'settle-2', title: t.progress?.tasks?.bankAccount || 'Open Korean Bank Account', completed: false, category: 'settlement' },
    { id: 'settle-3', title: t.progress?.tasks?.phoneNumber || 'Get Korean Phone Number', completed: false, category: 'settlement' },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('kku-progress-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to load tasks from localStorage:', e);
      }
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('kku-progress-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const resetProgress = () => {
    if (confirm(t.progress?.resetConfirm || 'Are you sure you want to reset all progress?')) {
      setTasks(tasks.map(task => ({ ...task, completed: false })));
    }
  };

  const categories = [
    { id: 'visa', name: t.progress?.categories?.visa || 'Visa Application', emoji: '📋', color: 'bg-blue-100 text-blue-800' },
    { id: 'documents', name: t.progress?.categories?.documents || 'Required Documents', emoji: '📄', color: 'bg-green-100 text-green-800' },
    { id: 'arrival', name: t.progress?.categories?.arrival || 'Arrival Preparation', emoji: '✈️', color: 'bg-purple-100 text-purple-800' },
    { id: 'settlement', name: t.progress?.categories?.settlement || 'Settlement Tasks', emoji: '🏠', color: 'bg-orange-100 text-orange-800' },
  ];

  const getProgress = (category?: string) => {
    const filteredTasks = category ? tasks.filter(t => t.category === category) : tasks;
    const completed = filteredTasks.filter(t => t.completed).length;
    return { completed, total: filteredTasks.length, percentage: Math.round((completed / filteredTasks.length) * 100) };
  };

  const overallProgress = getProgress();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.progress?.title || 'Arrival Preparation Tracker'}</h2>
          <p className="text-gray-600">{t.progress?.subtitle || 'Track your progress step by step'}</p>
        </div>
        <button
          onClick={resetProgress}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-all"
        >
          {t.progress?.resetButton || 'Reset Progress'}
        </button>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-900">{t.progress?.overallProgress || 'Overall Progress'}</span>
          <span className="text-2xl font-bold text-blue-600">{overallProgress.percentage}%</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${overallProgress.percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>{overallProgress.completed} / {overallProgress.total} {t.progress?.tasksCompleted || 'tasks completed'}</span>
          {overallProgress.percentage === 100 && (
            <span className="text-green-600 font-semibold">🎉 {t.progress?.allDone || 'All Done!'}</span>
          )}
        </div>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map(category => {
          const progress = getProgress(category.id);
          return (
            <div key={category.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{category.emoji}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                  {progress.completed}/{progress.total}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{category.name}</h3>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryTasks = tasks.filter(t => t.category === category.id);
          const allCompleted = categoryTasks.every(t => t.completed);

          return (
            <div key={category.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{category.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    {categoryTasks.filter(t => t.completed).length} / {categoryTasks.length} {t.progress?.completed || 'completed'}
                  </p>
                </div>
                {allCompleted && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">{t.progress?.done || 'Done!'}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {categoryTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`flex-1 ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900 font-medium'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-blue-900">
            <strong>{t.progress?.needHelp || 'Need help?'}</strong> {t.progress?.contactSupport || 'Contact our international student support team for assistance with any step.'}
          </p>
        </div>
      </div>
    </div>
  );
}

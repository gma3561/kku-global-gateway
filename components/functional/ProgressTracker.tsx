'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle, Save, Trophy, Target } from 'lucide-react';
import { useLanguageStore } from '@/lib/store/languageStore';
import { getTranslation } from '@/lib/i18n/translations';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'visa' | 'documents' | 'arrival' | 'settlement';
}

interface ProgressTrackerProps {
  t: any;
}

export default function ProgressTracker({ t: _t }: ProgressTrackerProps) {
  // Use language store instead of props for client-side language switching
  const { currentLocale } = useLanguageStore();
  const t = getTranslation(currentLocale);
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

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [justCompletedTask, setJustCompletedTask] = useState<string | null>(null);

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
    if (tasks.length > 0) {
      localStorage.setItem('kku-progress-tasks', JSON.stringify(tasks));

      // Show save notification
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 2000);
    }
  }, [tasks]);

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      setJustCompletedTask(id);
      setTimeout(() => setJustCompletedTask(null), 2000);
    }

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
    { id: 'visa', name: t.progress?.categories?.visa || 'Visa Application', emoji: '📋', color: 'bg-blue-100 text-blue-800', borderColor: 'border-blue-300' },
    { id: 'documents', name: t.progress?.categories?.documents || 'Required Documents', emoji: '📄', color: 'bg-green-100 text-green-800', borderColor: 'border-green-300' },
    { id: 'arrival', name: t.progress?.categories?.arrival || 'Arrival Preparation', emoji: '✈️', color: 'bg-purple-100 text-purple-800', borderColor: 'border-purple-300' },
    { id: 'settlement', name: t.progress?.categories?.settlement || 'Settlement Tasks', emoji: '🏠', color: 'bg-orange-100 text-orange-800', borderColor: 'border-orange-300' },
  ];

  const getProgress = (category?: string) => {
    const filteredTasks = category ? tasks.filter(t => t.category === category) : tasks;
    const completed = filteredTasks.filter(t => t.completed).length;
    return { completed, total: filteredTasks.length, percentage: Math.round((completed / filteredTasks.length) * 100) };
  };

  const overallProgress = getProgress();

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce">
          <Save className="w-4 h-4" />
          <span className="text-sm font-semibold">자동 저장됨</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Header with Trophy */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.progress?.title || 'Arrival Preparation Tracker'}
              </h2>
              <p className="text-gray-600 text-lg">{t.progress?.subtitle || 'Track your progress step by step'}</p>
            </div>
          </div>
          <button
            onClick={resetProgress}
            className="px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all hover:shadow-lg"
          >
            🔄 {t.progress?.resetButton || 'Reset Progress'}
          </button>
        </div>

        {/* Overall Progress Bar with Trophy */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900">{t.progress?.overallProgress || 'Overall Progress'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {overallProgress.percentage}%
              </span>
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${overallProgress.percentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 text-sm">
            <span className="text-gray-700 font-semibold">
              ✅ {overallProgress.completed} / {overallProgress.total} {t.progress?.tasksCompleted || 'tasks completed'}
            </span>
            {overallProgress.percentage === 100 && (
              <span className="text-green-600 font-black text-lg animate-pulse">
                🎉 {t.progress?.allDone || 'All Done!'}
              </span>
            )}
          </div>
        </div>

        {/* Category Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(category => {
            const progress = getProgress(category.id);
            const isComplete = progress.percentage === 100;
            return (
              <div
                key={category.id}
                className={`bg-white rounded-xl p-5 shadow-lg transition-all hover:shadow-xl hover:scale-105 ${
                  isComplete ? 'ring-2 ring-green-400' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{category.emoji}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${category.color}`}>
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{category.name}</h3>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                {isComplete && (
                  <div className="mt-2 text-green-600 font-bold text-sm flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Task List with Enhanced Checkboxes */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryTasks = tasks.filter(t => t.category === category.id);
            const allCompleted = categoryTasks.every(t => t.completed);
            const progress = getProgress(category.id);

            return (
              <div
                key={category.id}
                className={`bg-white border-2 rounded-xl p-6 shadow-lg transition-all ${
                  allCompleted ? 'border-green-400 bg-green-50' : category.borderColor
                }`}
              >
                <div className="flex items-center space-x-3 mb-5">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <span className="text-3xl">{category.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-900">{category.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            allCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-600">
                        {progress.percentage}%
                      </span>
                    </div>
                  </div>
                  {allCompleted && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                      <Trophy className="w-6 h-6" />
                      <span className="font-black">{t.progress?.done || 'Done!'}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {categoryTasks.map(task => {
                    const isJustCompleted = justCompletedTask === task.id;
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`group flex items-center space-x-4 p-5 rounded-xl cursor-pointer transition-all ${
                          task.completed
                            ? 'bg-green-100 border-2 border-green-300 shadow-md'
                            : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:scale-102'
                        } ${isJustCompleted ? 'animate-bounce' : ''}`}
                      >
                        {/* Custom Checkbox */}
                        <div className="flex-shrink-0">
                          {task.completed ? (
                            <div className="relative">
                              <CheckCircle2 className="w-8 h-8 text-green-600 animate-pulse" />
                              {isJustCompleted && (
                                <div className="absolute -inset-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                              )}
                            </div>
                          ) : (
                            <div className="relative">
                              <Circle className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full group-hover:bg-blue-100"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Task Text */}
                        <span
                          className={`flex-1 transition-all ${
                            task.completed
                              ? 'text-gray-500 line-through'
                              : 'text-gray-900 font-semibold group-hover:text-blue-600'
                          }`}
                        >
                          {task.title}
                        </span>

                        {/* Completion Badge */}
                        {isJustCompleted && (
                          <span className="text-green-600 font-bold text-sm bg-green-100 px-3 py-1 rounded-full animate-pulse">
                            ✓ Completed!
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Notice */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5 flex items-start space-x-4 shadow-lg">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong className="text-lg">{t.progress?.needHelp || 'Need help?'}</strong><br />
              {t.progress?.contactSupport || 'Contact our international student support team for assistance with any step.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

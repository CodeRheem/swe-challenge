/**
 * Month Configuration - Maps month to image and color palette
 * Each month has a unique look with matching colors from the hero image
 */

import jan from '../assets/download (7).jpg';
import feb from '../assets/download (5).jpg';
import mar from '../assets/download (3).jpg';
import apr from '../assets/3D Wallpaper.jpg';
import may from '../assets/Best.jpg';
import jun from '../assets/4K Live wallpaper 🌶.jpg';
import jul from '../assets/download (13).jpg';
import aug from '../assets/download (8).jpg';
import sep from '../assets/download (12).jpg';
import oct from '../assets/download (10).jpg';
import nov from '../assets/download (11).jpg';
import dec from '../assets/download (4).jpg';

export interface MonthConfig {
  month: number; // 0-11
  monthName: string;
  imagePath: string;
  colors: {
    primary: string; // Main accent color
    secondary: string; // Secondary accent
    text: string; // Text overlay color
    bg: string; // Background gradient
    accent: string; // Accent for buttons
    headerBg: string; // Header background
  };
}

export const monthConfigs: MonthConfig[] = [
  {
    month: 0, // January
    monthName: 'January',
    imagePath: jan, // Blue eyes
    colors: {
      primary: '#1f2937', // Dark black/grey
      secondary: '#374151', // Medium grey
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #000000 0%, #1f2937 100%)',
      accent: '#4b5563',
      headerBg: 'bg-linear-to-r from-gray-900 to-gray-800',
    },
  },
  {
    month: 1, // February
    monthName: 'February',
    imagePath: feb, // Purple/dark
    colors: {
      primary: '#92400e', // Medium brown
      secondary: '#b45309', // Warm brown
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
      accent: '#a16207',
      headerBg: 'bg-linear-to-r from-amber-900 to-yellow-700',
    },
  },
  {
    month: 2, // March
    monthName: 'March',
    imagePath: mar, // Blue eyes
    colors: {
      primary: '#3b82f6', // Blue
      secondary: '#06b6d4', // Cyan
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      accent: '#2563eb',
      headerBg: 'bg-linear-to-r from-blue-600 to-cyan-500',
    },
  },
  {
    month: 3, // April
    monthName: 'April',
    imagePath: apr, // Yellow eyes
    colors: {
      primary: '#eab308', // Yellow
      secondary: '#fbbf24', // Amber
      text: '#1f2937',
      bg: 'linear-gradient(135deg, #78350f 0%, #eab308 100%)',
      accent: '#ca8a04',
      headerBg: 'bg-linear-to-r from-yellow-600 to-amber-500',
    },
  },
  {
    month: 4, // May
    monthName: 'May',
    imagePath: may, // Red eyes
    colors: {
      primary: '#ef4444', // Red
      secondary: '#f97316', // Orange
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #7c2d12 0%, #ef4444 100%)',
      accent: '#dc2626',
      headerBg: 'bg-linear-to-r from-red-600 to-orange-500',
    },
  },
  {
    month: 5, // June
    monthName: 'June',
    imagePath: jun, // Red/orange owl
    colors: {
      primary: '#f97316', // Orange
      secondary: '#ec4899', // Pink
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)',
      accent: '#ea580c',
      headerBg: 'bg-linear-to-r from-orange-600 to-pink-500',
    },
  },
  {
    month: 6, // July
    monthName: 'July',
    imagePath: jul,
    colors: {
      primary: '#16a34a', // Vibrant green
      secondary: '#22c55e', // Light green
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
      accent: '#15803d',
      headerBg: 'bg-linear-to-r from-green-600 to-emerald-500',
    },
  },
  {
    month: 7, // August
    monthName: 'August',
    imagePath: aug,
    colors: {
      primary: '#6b7280', // Medium grey
      secondary: '#9ca3af', // Light grey
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',
      accent: '#4b5563',
      headerBg: 'bg-linear-to-r from-gray-600 to-gray-500',
    },
  },
  {
    month: 8, // September
    monthName: 'September',
    imagePath: sep,
    colors: {
      primary: '#f3f4f6', // Off-white
      secondary: '#e5e7eb', // Light grey-white
      text: '#1f2937',
      bg: 'linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%)',
      accent: '#d1d5db',
      headerBg: 'bg-linear-to-r from-gray-200 to-gray-100',
    },
  },
  {
    month: 9, // October
    monthName: 'October',
    imagePath: oct,
    colors: {
      primary: '#f59e0b', // Amber
      secondary: '#f97316', // Orange
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #7c2d12 0%, #f59e0b 100%)',
      accent: '#d97706',
      headerBg: 'bg-linear-to-r from-amber-600 to-orange-500',
    },
  },
  {
    month: 10, // November
    monthName: 'November',
    imagePath: nov,
    colors: {
      primary: '#6366f1', // Indigo
      secondary: '#a855f7', // Purple
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #312e81 0%, #6366f1 100%)',
      accent: '#4f46e5',
      headerBg: 'bg-linear-to-r from-indigo-600 to-purple-500',
    },
  },
  {
    month: 11, // December
    monthName: 'December',
    imagePath: dec,
    colors: {
      primary: '#06b6d4', // Cyan
      secondary: '#0ea5e9', // Sky
      text: '#ffffff',
      bg: 'linear-gradient(135deg, #0c3b5a 0%, #06b6d4 100%)',
      accent: '#0891b2',
      headerBg: 'bg-linear-to-r from-cyan-600 to-blue-500',
    },
  },
];

/**
 * Get configuration for a specific month
 */
export function getMonthConfig(date: Date): MonthConfig {
  const month = date.getMonth();
  return monthConfigs[month] || monthConfigs[0];
}

/**
 * Get image path for specific month
 */
export function getMonthImage(date: Date): string {
  const config = getMonthConfig(date);
  return config.imagePath;
}

/**
 * Get color palette for specific month
 */
export function getMonthColors(date: Date) {
  const config = getMonthConfig(date);
  return config.colors;
}

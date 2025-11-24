<<<<<<< HEAD
// src/App.tsx

import React from 'react';
import Quiz from './components/Quiz';
import { Question } from './types';
import NavBar from './components/NavBar';


const questions: Question[] = [
  {
    question: 'Is 2+2 equal to 4?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    question: 'Can a triangle have four sides?',
    options: ['Yes', 'No'],
    answer: 'No',
  },
  {
    question: 'Is the capital of India delhi?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
];

const App: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <div className="container text-center">
  <div className="row">
    <div className="col">
      <Quiz questions={questions} />
      </div>
      </div>
      </div>
    </div>
  );
};
=======
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { OrderHistoryProvider } from '@/contexts/OrderHistoryContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderHistoryProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OrderHistoryProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);
>>>>>>> 62434d7 (first commit)

export default App;

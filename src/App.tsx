import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CanvasEditor } from './components/CanvasEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/canvas/:canvasId" 
          element={<CanvasRoute />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function CanvasRoute() {
  const canvasId = window.location.pathname.split('/canvas/')[1];
  const urlParams = new URLSearchParams(window.location.search);
  const viewOnly = urlParams.get('viewOnly') === 'true';

  if (!canvasId) {
    return <Navigate to="/" replace />;
  }

  return <CanvasEditor canvasId={canvasId} viewOnly={viewOnly} />;
}

export default App;
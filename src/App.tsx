import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CanvasEditor } from './components/CanvasEditor';

const CanvasRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Invalid canvas ID</div>;
  }
  
  return <CanvasEditor sceneId={id} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/canvas/:id" element={<CanvasRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
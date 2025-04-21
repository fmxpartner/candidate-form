// src/App.js (projeto candidate-form)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobDescription from './JobDescription';
import CandidateForm from './CandidateForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobDescription />} />
        <Route path="/form" element={<CandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
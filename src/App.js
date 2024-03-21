import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage.js';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

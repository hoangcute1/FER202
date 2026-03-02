import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import Home from './pages/Home';
import AllLessons from './pages/AllLessons';
import CompletedLessons from './pages/CompletedLessons';
import LessonDetail from './pages/LessonDetail';
import AddLesson from './pages/AddLesson';
import UpdateLesson from './pages/UpdateLesson';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/he186454/all-lessons" element={<AllLessons />} />
          <Route path="/he186454/completed-lessons" element={<CompletedLessons />} />
          <Route path="/he186454/lessons/:id" element={<LessonDetail />} />
          <Route path="/he186454/add-lesson" element={<AddLesson />} />
          <Route path="/he186454/update-lesson/:id" element={<UpdateLesson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
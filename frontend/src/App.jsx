import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/common/Header';
import { Landing } from './pages/Landing';
import { Upload } from './pages/Upload';
import { Processing } from './pages/Processing';
import { Dashboard } from './pages/Dashboard';
import { PreviewCustomization } from './pages/PreviewCustomization';
import { LectureViewer } from './pages/LectureViewer';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/processing/:lectureId" element={<Processing />} />
                <Route path="/preview/:lectureId" element={<PreviewCustomization />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lecture/:lectureId" element={<LectureViewer />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Landing />} />
              </Routes>
            </main>
          </div>
          <ToastContainer />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

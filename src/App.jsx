import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import AssociateLogin from './pages/associate/Login';
import TodayView from './pages/associate/Today';
import PipelineBoard from './pages/associate/Pipeline';
import DonorCommandCenter from './pages/associate/DonorCommandCenter';
import SvoEditor from './pages/associate/SvoEditor';
import DonorLogin from './pages/donor/Login';
import DonorHome from './pages/donor/Home';
import DonorIntake from './pages/donor/Intake';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Associate Console */}
        <Route path="/associate" element={<Navigate to="/associate/today" replace />} />
        <Route path="/associate/login" element={<AssociateLogin />} />
        <Route path="/associate/today" element={<TodayView />} />
        <Route path="/associate/pipeline" element={<PipelineBoard />} />
        <Route path="/associate/donor/:id" element={<DonorCommandCenter />} />
        <Route path="/associate/donor/:id/svo" element={<SvoEditor />} />

        {/* Donor Portal */}
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/home" element={<DonorHome />} />
        <Route path="/donor/intake" element={<DonorIntake />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

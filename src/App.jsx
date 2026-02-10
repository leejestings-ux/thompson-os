import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import AssociateLogin from './pages/associate/Login';
import TodayView from './pages/associate/Today';
import PipelineBoard from './pages/associate/Pipeline';
import DonorCommandCenter from './pages/associate/DonorCommandCenter';
import SvoEditor from './pages/associate/SvoEditor';
import MeetingNotes from './pages/associate/MeetingNotes';
import NpoView from './pages/associate/NpoView';
import PlaceholderPage from './components/shared/PlaceholderPage';
import DonorLogin from './pages/donor/Login';
import DonorHome from './pages/donor/Home';
import DonorIntake from './pages/donor/Intake';
import DonorBasicInfo from './pages/donor/BasicInfo';
import DonorVbq from './pages/donor/Vbq';
import DonorConcerns from './pages/donor/Concerns';
import DonorAssets from './pages/donor/Assets';
import DonorDeliverables from './pages/donor/Deliverables';
import DonorNextSteps from './pages/donor/NextSteps';

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
        <Route path="/associate/donor/:id/notes" element={<MeetingNotes />} />
        <Route path="/associate/npo/:id" element={<NpoView />} />
        <Route path="/associate/reports" element={<PlaceholderPage title="Reports" section="Associate Console" />} />
        <Route path="/associate/templates" element={<PlaceholderPage title="Templates" section="Associate Console" />} />
        <Route path="/associate/settings" element={<PlaceholderPage title="Settings" section="Associate Console" />} />

        {/* Donor Portal */}
        <Route path="/donor" element={<Navigate to="/donor/home" replace />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/home" element={<DonorHome />} />
        <Route path="/donor/intake" element={<DonorIntake />} />
        <Route path="/donor/intake/basic-info" element={<DonorBasicInfo />} />
        <Route path="/donor/intake/vbq" element={<DonorVbq />} />
        <Route path="/donor/intake/concerns" element={<DonorConcerns />} />
        <Route path="/donor/intake/assets" element={<DonorAssets />} />
        <Route path="/donor/deliverables" element={<DonorDeliverables />} />
        <Route path="/donor/next-steps" element={<DonorNextSteps />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

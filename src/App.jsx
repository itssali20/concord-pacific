import { Routes, Route, useLocation } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import MobileBar from './components/MobileBar'
import { TransitionProvider } from './components/Transition'
import Home from './pages/Home'
import Developments from './pages/Developments'
import DevelopmentDetail from './pages/DevelopmentDetail'
import Residences from './pages/Residences'
import Vision from './pages/Vision'
import Materials from './pages/Materials'
import Team from './pages/Team'
import Company from './pages/Company'
import Opportunities from './pages/Opportunities'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  return (
    <SmoothScroll>
      <TransitionProvider>
        <Preloader />
        <Cursor />
        <Header />
        <main key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/developments" element={<Developments />} />
            <Route path="/developments/:slug" element={<DevelopmentDetail />} />
            <Route path="/signature-residences" element={<Residences />} />
            <Route path="/design-and-materials" element={<Materials />} />
            <Route path="/our-vision" element={<Vision />} />
            <Route path="/international-team" element={<Team />} />
            <Route path="/company" element={<Company />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
        <MobileBar />
      </TransitionProvider>
    </SmoothScroll>
  )
}

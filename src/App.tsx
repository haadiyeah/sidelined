import LandingPage from "./pages/LandingPage"
import ConfiguratorStepOne from "./pages/ConfiguratorStepOne"
import ConfiguratorStepTwo from "./pages/ConfiguratorStepTwo"
import ConfiguratorStepThree from "./pages/ConfiguratorStepThree"
import About from "./pages/About"
import Contact from "./pages/Contact"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/configurator/step-one" element={<ConfiguratorStepOne />} />
        <Route path="/configurator/step-two" element={<ConfiguratorStepTwo />} />
        <Route path="/configurator/step-three" element={<ConfiguratorStepThree />} />
      </Routes>
    </Router>
  )
}

export default App
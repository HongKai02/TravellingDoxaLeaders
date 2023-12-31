import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import CreateAccount from "./pages/CreateAccount"
import LogInPage from "./pages/LogInPage"
import AssignRides from "./pages/AssignRides"
import ForgotPassword from "./pages/ForgotPassword"
import ViewRides from './pages/ViewRides'


function App(){

  // import ChooseDrivers from "./pages/ChooseDrivers"
  //<Route path="/ChooseDrivers" element={<ChooseDrivers />} />
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path ="/LogInPage" element={<LogInPage />} />
      <Route path ="/AssignRides" element={<AssignRides />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ViewRides" element={<ViewRides />} />
      
    </Routes>
  )
}

export default App
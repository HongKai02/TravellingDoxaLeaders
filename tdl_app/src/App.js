import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import CreateAccount from "./pages/CreateAccount"
import LogInPage from "./pages/LogInPage"
import AssignRides from "./pages/AssignRides"
import ForgotPassword from "./pages/ForgotPassword"

function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path ="/LogInPage" element={<LogInPage />} />
      <Route path ="/AssignRides" element={<AssignRides />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
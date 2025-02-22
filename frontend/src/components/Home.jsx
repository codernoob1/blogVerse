import { AuthProvider } from "../context/AuthContext"
import Body from "./Body"
import CreatePost from "./CreatePost"
import Explore from "./Explore"
import Features from "./Feature"
import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./NavBar"
import Profile from "./Profile"
import SignUpPage from "./SignupPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const Home = () => {
  return (
    <AuthProvider>
   <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
    <Body />
    <Features />
    <Footer />
   </Router>
   </AuthProvider>
  )
}

export default Home
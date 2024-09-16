import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { store } from './app/store/store'
import Courses from './pages/Courses'
import Instructors from './pages/Instructors'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NoteFound'
import CreateCourse from './components/CreateCourse'
import DescOfCourse from './components/DescOfCourse'
import ChatWithAI from './components/ChatWithAI'
import Profile from './components/Profile'
import AddQuizToCourse from './components/AddQuizToCourse'
import EditCourse from './components/EditCourse'
import EnrolledCourses from './components/EnrolledCourses'
import CreateGoogleMeet from './components/CreateGoogleMeet'
import ScheduleMeeting from './components/ScheduleMeeting'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Courses' element={<Courses />} />
          <Route path='/Instructors' element={<Instructors />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/AddCourse' element={<CreateCourse />} />
          <Route path='/course/:courseId/add-quiz' element={<AddQuizToCourse />} />
          <Route path='/description/course/:id' element={<DescOfCourse />} />
          <Route path='/ask-ai' element={<ChatWithAI />} />
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/course/:courseId/edit' element={<EditCourse />} />
          <Route path='/enrolledCourse/:courseId' element={<EnrolledCourses />} />
          <Route path='/Instructor/create/googleMeet' element={<CreateGoogleMeet />} />
          <Route path='/Instructor/schedule/googleMeet' element={<ScheduleMeeting />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App

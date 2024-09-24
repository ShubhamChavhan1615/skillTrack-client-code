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
import ResetPassword from './components/ResetPassword'
import ChangePass from './components/ChangePass'
import EnrolledStudents from './components/EnrolledStudents'
import ShowAllUsers from './components/admin/ShowAllUsers'


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
          <Route path='/ResetPassword' element={<ResetPassword />} />
          <Route path='/change-password/:email' element={<ChangePass />} />
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
          <Route path='/EnrolledStudents' element={<EnrolledStudents />} />
          <Route path='/course/:courseId/verify/google-meet' element={<CreateGoogleMeet />} />
          <Route path='/course/:courseId/schedule/google-meet' element={<ScheduleMeeting />} />
          <Route path='/admin/:adminId/allusers' element={<ShowAllUsers />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App

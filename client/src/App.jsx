import { Routes, Route } from "react-router-dom";
import LadingPage from './pages/LadingPage/LadingPage'
import HomePage from './pages/HomePage/HomePage';
import AddDogForm from './pages/Dog/AddDogForm';
import DogDetail from './pages/DogDetail/DogDetail';
import AboutPage from './pages/AboutPage/AboutPage';
import RootLayout from './layout/RootLayout';
import EditDogForm from "./pages/Dog/EditDogForm";
import NotFound from "./pages/NotFound/NotFound";

function App() {

  return (
   <div className="App">
    <Routes>
      <Route path="/" element={<LadingPage/>} />
      <Route path='/dogs' element={<RootLayout/>}>
        <Route path="about" element={<AboutPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path='new-dog' element={<AddDogForm/>}/>
        <Route path="detail/:id" element={<DogDetail />} />
        <Route path="update/:id" element={<EditDogForm/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
   </div>
  )
}

export default App

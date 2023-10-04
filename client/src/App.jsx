import { Routes, Route } from "react-router-dom";
import LadingPage from './pages/LadingPage/LadingPage'
import HomePage from './pages/HomePage/HomePage';
import NewDog from './pages/Dog/NewDog';
import DogDetail from './pages/DogDetail/DogDetail';
import AboutPage from './pages/AboutPage/AboutPage';
import RootLayout from './layout/RootLayout';

function App() {

  return (
   <div>
    <Routes>
      <Route index element={<LadingPage/>} />
      <Route path='/dogs' element={<RootLayout/>}>
        <Route path="about" element={<AboutPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path='new-dog' element={<NewDog/>}/>
        <Route path="detail/:id" element={<DogDetail />} />
      </Route>
    </Routes>
   </div>
  )
}

export default App

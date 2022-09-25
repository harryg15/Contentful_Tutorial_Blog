import './App.css';
import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/blogDetails/:id" element={<BlogDetails />}/>
      <Route path="/blogList/:id" element={<BlogList />}/>
      <Route path="/" element={<BlogList />}/>
    </Routes>
  );
}

export default App;

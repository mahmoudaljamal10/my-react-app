
import"./App.css";
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Blog from "./Blog";
import PostDetails from"./PostDetails";
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Blog/>} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;
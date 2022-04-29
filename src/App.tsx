import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Search from "./pages/Search";
import Tv from "./pages/Tv";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:contentId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:contentId" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

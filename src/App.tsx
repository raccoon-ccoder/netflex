import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home/Home"));
const Tv = lazy(() => import("./pages/Tv/index"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/movies/:contentId" element={<Home />} />
          </Route>
          <Route path="/tv" element={<Tv />}>
            <Route path="/tv/:contentId" element={<Tv />} />
          </Route>
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

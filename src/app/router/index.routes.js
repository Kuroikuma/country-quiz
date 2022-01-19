import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../page/home/home.js";
import { ResultPage } from "../page/resultPage/result";

export function IndexRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<ResultPage />} />
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

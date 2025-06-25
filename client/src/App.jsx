import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <>
            <Navbar />
            <div className="p-4">
              <AppRoutes />
            </div>
          </>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

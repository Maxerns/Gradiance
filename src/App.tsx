import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import { AuthProvider } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Module from "./components/Module";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong:</h2>
      <pre className="text-red-500 mt-2">{error.message}</pre>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route
                    path="/levels/:levelId/modules/:moduleId"
                    element={<Module />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

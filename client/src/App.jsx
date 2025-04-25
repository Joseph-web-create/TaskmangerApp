import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <Toaster position="top-right" expand={true} richColors />
      <AppRoutes />
    </>
  );
}

export default App;

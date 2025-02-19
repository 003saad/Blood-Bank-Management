import { UserProvider } from "./providers/UserContext";
import AppRoutes from "./Routes/Routes";

export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

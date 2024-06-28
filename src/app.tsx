import { AuthSwitch } from "./auth-switch/auth-switch";
import { Providers } from "./providers";

export const App = () => {
  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};

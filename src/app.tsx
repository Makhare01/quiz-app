import { AuthSwitch } from "@app/auth-switch";
import { Providers } from "./providers";

export const App = () => {
  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};

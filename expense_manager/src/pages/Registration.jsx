import { useState } from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import Otp from "../components/Otp";
import { RegistrationContextProvider } from "../context/RegistrationContext";
export default function Registration() {
  const [portal, setPortal] = useState(false);
  const [email, setEmail] = useState("");
  const open = () => {
    setPortal((p) => !p);
  };

  const getEmail = (e) => setEmail(e);

  return (
    <RegistrationContextProvider value={{ open, email, getEmail }}>
      <div className="h-[650px] w-[100%] flex items-center justify-center">
        <Box>
          {!portal && <Form />}
          {portal && <Otp />}
        </Box>
      </div>
    </RegistrationContextProvider>
  );
}

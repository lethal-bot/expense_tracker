import { createContext, useContext } from "react";

export const RegistrationContext = createContext({
  open: () => {},
  email: "",
  getEmail: () => {},
});

export const RegistrationContextProvider = RegistrationContext.Provider;

export default function useRegistration() {
  return useContext(RegistrationContext);
}

import { createContext, useContext } from "react";

export const TrackContext = createContext({
  arr: [],
  changeArr: () => {},
});

export const TrackContextProvider = TrackContext.Provider;

export default function useTrack() {
  return useContext(TrackContext);
}

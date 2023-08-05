import React from "react";
import { createContext, useContext } from "react";

interface IUser {
  id: number | null;
  userName: string | null;
}
interface IState {
  user: IUser | null;
  state2: boolean;
}
type setState = {
  onChangeState: (state: Partial<IState>) => void;
};
const AppContext = createContext<IState & setState>({ user: null, state2: false, onChangeState: () => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<IState>({
    user: null,
    state2: false,
  });
  const onChangeState = (params: Partial<IState>) => {
    setState((s) => ({ ...s, ...params }));
  };
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("user") !== null) {
        onChangeState({ user: JSON.parse(window.localStorage.getItem("user") || "") });
      }
    }
  }, []);

  let sharedState: IState = {
    ...state,
  };

  return <AppContext.Provider value={{ ...sharedState, onChangeState }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

"use client";

    import { createContext, useContext, useReducer } from 'react';

    type AppState = {
      loading: boolean;
      error: string | null;
    };

    type AppAction =
      | { type: 'SET_LOADING'; payload: boolean }
      | { type: 'SET_ERROR'; payload: string | null };

    const initialState: AppState = {
      loading: false,
      error: null,
    };

    const appReducer = (state: AppState, action: AppAction): AppState => {
      switch (action.type) {
        case 'SET_LOADING':
          return { ...state, loading: action.payload };
        case 'SET_ERROR':
          return { ...state, error: action.payload };
        default:
          return state;
      }
    };

    type AppContextType = {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    };

    const AppContext = createContext<AppContextType | undefined>(undefined);

    export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [state, dispatch] = useReducer(appReducer, initialState);

      return (
        <AppContext.Provider value={{ state, dispatch }}>
          {children}
        </AppContext.Provider>
      );
    };

    export const useAppContext = () => {
      const context = useContext(AppContext);
      if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
      }
      return context;
    };

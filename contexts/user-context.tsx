"use client";

    import { createContext, useContext, useReducer } from 'react';

    type User = {
      id: string;
      name: string;
      email: string;
      bio?: string;
    };

    type UserState = {
      user: User | null;
      isAuthenticated: boolean;
    };

    type UserAction =
      | { type: 'SET_USER'; payload: User | null }
      | { type: 'SET_AUTH'; payload: boolean };

    const initialState: UserState = {
      user: null,
      isAuthenticated: false,
    };

    const userReducer = (state: UserState, action: UserAction): UserState => {
      switch (action.type) {
        case 'SET_USER':
          return { ...state, user: action.payload };
        case 'SET_AUTH':
          return { ...state, isAuthenticated: action.payload };
        default:
          return state;
      }
    };

    type UserContextType = {
      state: UserState;
      dispatch: React.Dispatch<UserAction>;
    };

    const UserContext = createContext<UserContextType | undefined>(undefined);

    export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [state, dispatch] = useReducer(userReducer, initialState);

      return (
        <UserContext.Provider value={{ state, dispatch }}>
          {children}
        </UserContext.Provider>
      );
    };

    export const useUserContext = () => {
      const context = useContext(UserContext);
      if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
      }
      return context;
    };

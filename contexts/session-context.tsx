"use client";

import { createContext, useContext, useReducer } from 'react';
import type { Session } from '@/types/session';

type SessionState = {
  sessions: Session[];
};

type SessionAction =
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'UPDATE_SESSION'; payload: Session }
  | { type: 'REMOVE_SESSION'; payload: string }
  | { type: 'SET_SESSIONS'; payload: Session[] };

const initialState: SessionState = {
  sessions: [],
};

const sessionReducer = (state: SessionState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.payload] };
    case 'UPDATE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(session => 
          session.id === action.payload.id ? action.payload : session
        )
      };
    case 'REMOVE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload)
      };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    default:
      return state;
  }
};

type SessionContextType = {
  state: SessionState;
  addSession: (session: Session) => void;
  updateSession: (session: Session) => void;
  removeSession: (sessionId: string) => void;
  setSessions: (sessions: Session[]) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const addSession = (session: Session) => {
    dispatch({ type: 'ADD_SESSION', payload: session });
  };

  const updateSession = (session: Session) => {
    dispatch({ type: 'UPDATE_SESSION', payload: session });
  };

  const removeSession = (sessionId: string) => {
    dispatch({ type: 'REMOVE_SESSION', payload: sessionId });
  };

  const setSessions = (sessions: Session[]) => {
    dispatch({ type: 'SET_SESSIONS', payload: sessions });
  };

  return (
    <SessionContext.Provider value={{ state, addSession, updateSession, removeSession, setSessions }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
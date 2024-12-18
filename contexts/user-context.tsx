"use client";

import { createContext, useContext, useReducer } from 'react';
import type { Material } from '@/types/material';

type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  materials: Material[];
};

type UserAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTH'; payload: boolean }
  | { type: 'SET_MATERIALS'; payload: Material[] }
  | { type: 'ADD_MATERIAL'; payload: Material }
  | { type: 'UPDATE_MATERIAL'; payload: Material }
  | { type: 'DELETE_MATERIAL'; payload: string };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  materials: [],
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTH':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_MATERIALS':
      return { ...state, materials: action.payload };
    case 'ADD_MATERIAL':
      return { ...state, materials: [...state.materials, action.payload] };
    case 'UPDATE_MATERIAL':
      return {
        ...state,
        materials: state.materials.map(material =>
          material.id === action.payload.id ? action.payload : material
        ),
      };
    case 'DELETE_MATERIAL':
      return {
        ...state,
        materials: state.materials.filter(material => material.id !== action.payload),
      };
    default:
      return state;
  }
};

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  setMaterials: (materials: Material[]) => void;
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (materialId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setMaterials = (materials: Material[]) => dispatch({ type: 'SET_MATERIALS', payload: materials });
  const addMaterial = (material: Material) => dispatch({ type: 'ADD_MATERIAL', payload: material });
  const updateMaterial = (material: Material) => dispatch({ type: 'UPDATE_MATERIAL', payload: material });
  const deleteMaterial = (materialId: string) => dispatch({ type: 'DELETE_MATERIAL', payload: materialId });

  return (
    <UserContext.Provider value={{ 
      state, 
      dispatch, 
      setMaterials, 
      addMaterial, 
      updateMaterial, 
      deleteMaterial 
    }}>
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

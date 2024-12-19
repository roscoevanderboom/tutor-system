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
  | { type: 'DELETE_MATERIAL'; payload: string }
  | { type: 'UPDATE_MATERIAL_CONTENT'; payload: { id: string; content: any } };

const initialState: UserState = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'A passionate educator.',
  },
  isAuthenticated: true,
  materials: [
    {
      id: '1',
      name: 'Introduction to Algebra',
      description: 'Basic concepts of algebra.',
      level: 'B1',
      createdAt: '2024-12-19T06:02:10.307Z',
      tags: ['math', 'algebra'],
      content: {
        heading: 'Introduction to Algebra',
        text: 'This is an introductory course on Algebra.',
      },
    },
    // {
    //   id: '2',
    //   name: 'Advanced Calculus',
    //   description: 'In-depth study of calculus.',
    //   level: 'B1',
    //   createdAt: new Date().toISOString(),
    //   tags: ['math', 'calculus'],
    //   content: {
    //     heading: 'Advanced Calculus',
    //     text: 'This course covers advanced topics in Calculus.',
    //   },
    // },
  ],
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
    case 'UPDATE_MATERIAL_CONTENT':
      return {
        ...state,
        materials: state.materials.map(material =>
          material.id === action.payload.id ? { ...material, content: action.payload.content } : material
        ),
      };
    default:
      return state;
  }
};

type UserContextType = {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  setUser: (user: User | null) => void;
  setMaterials: (materials: Material[]) => void;
  addMaterial: (material: Material) => void;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (materialId: string) => void;
  updateMaterialContent: (id: string, content: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: User | null) => dispatch({ type: 'SET_USER', payload: user });
  const setMaterials = (materials: Material[]) => dispatch({ type: 'SET_MATERIALS', payload: materials });
  const addMaterial = (material: Material) => dispatch({ type: 'ADD_MATERIAL', payload: material });
  const updateMaterial = (material: Material) => dispatch({ type: 'UPDATE_MATERIAL', payload: material });
  const deleteMaterial = (materialId: string) => dispatch({ type: 'DELETE_MATERIAL', payload: materialId });
  const updateMaterialContent = (id: string, content: any) => dispatch({ type: 'UPDATE_MATERIAL_CONTENT', payload: { id, content } });

  return (
    <UserContext.Provider value={{ 
      state, 
      dispatch, 
      setUser, 
      setMaterials, 
      addMaterial, 
      updateMaterial, 
      deleteMaterial,
      updateMaterialContent 
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

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  userMenuOpen: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  userMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleUserMenu: (state) => {
      state.userMenuOpen = !state.userMenuOpen;
    },
    setUserMenuOpen: (state, action) => {
      state.userMenuOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleTheme, toggleUserMenu, setUserMenuOpen } = uiSlice.actions;

export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectUserMenuOpen = (state: RootState) => state.ui.userMenuOpen;

export default uiSlice.reducer;
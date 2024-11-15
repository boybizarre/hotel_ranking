'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HotelsData, Hotel } from '@/lib/data/hotel_data';
import { CATEGORIES, Category } from '@/lib/data/categories';

export interface StateType {
  hotels: Hotel[];
  categories: Category[];
  searchTerm: string;
  categoryFilter: string;
}

// Helper functions to get and set data in localStorage
const loadState = () => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = localStorage.getItem('appState');
      return serializedState
        ? JSON.parse(serializedState)
        : { hotels: HotelsData, categories: CATEGORIES };
    } catch (err) {
      console.error('Could not load state', err);
      return { hotels: HotelsData, categories: CATEGORIES };
    }
  }
};

const saveState = (state: { hotels: Hotel[]; categories: Category[] }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = loadState();

export const HotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    ...loadState(),
    searchTerm: '',
    categoryFilter: '',
  },
  reducers: {
    addHotel: (
      state: StateType,
      action: PayloadAction<Omit<Hotel, 'id' | 'image'>>
    ) => {
      const uniqueId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      const newHotel = {
        ...action.payload,
        id: uniqueId,
        image: '',
      };

      state.hotels.unshift(newHotel);

      saveState(state);
    },

    editHotel: (
      state: StateType,
      action: PayloadAction<{ id: string; updatedHotel: Partial<Hotel> }>
    ) => {
      const { id, updatedHotel } = action.payload;

      // find index of hotel
      const hotelIndex = state.hotels.findIndex(
        (hotel: Hotel) => hotel.id === id
      );

      // if index found, update
      if (hotelIndex !== -1) {
        console.log('hotelIndex: ', hotelIndex);
        state.hotels[hotelIndex] = {
          ...state.hotels[hotelIndex],
          ...updatedHotel,
        };
        saveState(state);
        return;
      }

      console.log('error updating');
    },

    deleteHotel: (state: StateType, action: PayloadAction<string>) => {
      console.log('deleteHotel');
      state.hotels = state.hotels.filter(
        (hotel: Hotel) => hotel.id !== action.payload
      );
      saveState(state);
    },

    addCategory: (state: StateType, action: PayloadAction<string>) => {
      const exists = state.categories.find(
        (category: Category) => category.value === action.payload
      );

      const uniqueId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      if (!exists) {
        state.categories.push({
          id: uniqueId,
          value: action.payload,
          label: action.payload,
        });

        saveState(state);
        return;
      }

      console.log('error creating category');
    },

    editCategory: (
      state: StateType,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      // find index of category
      const categoryIndex = state.categories.findIndex(
        (category: Category) => category.id === action.payload.id
      );

      console.log('categoryIndex: ', categoryIndex);

      // if index found, update
      if (categoryIndex !== -1) {
        console.log('categoryIndex: ', categoryIndex);
        state.categories[categoryIndex] = {
          ...state.categories[categoryIndex],
          value: action.payload.value,
          label: action.payload.value,
        };

        saveState(state);
        return;
      }

      console.log('error updating category');
    },

    deleteCategory: (state: StateType, action: PayloadAction<string>) => {
      console.log('deleteCategory');
      state.categories = state.categories.filter(
        (category: Category) => category.id !== action.payload
      );
      saveState(state);
    },

    setSearchTerm: (state: StateType, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setCategoryFilter: (state: StateType, action: PayloadAction<string>) => {
      console.log(action.payload, 'payload');
      state.categoryFilter = action.payload;
    },

    // sortHotelsByName: (state) => {
    //   state.hotels.sort((a: Hotel, b: Hotel) => a.name.localeCompare(b.name));
    //   saveState(state);
    // },
  },
});

export const {
  addHotel,
  editHotel,
  deleteHotel,
  addCategory,
  editCategory,
  deleteCategory,
  setSearchTerm,
  setCategoryFilter,
  // sortHotelsByName,
} = HotelSlice.actions;

export default HotelSlice.reducer;

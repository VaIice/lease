import { configureStore, createSlice } from "@reduxjs/toolkit";
import originalData from '../data/data.json';

const textInput = createSlice({
    name: 'textInput',
    initialState: "",
    reducers: {
        changeTextInput(state, action) {
            return action.payload;
        },
        initialTextInput() {
          return "";
      }
    }
});

const currentPage = createSlice({
    name: 'currentPage',
    initialState: 1,
    reducers: {
        changeCurrentPage(state, action) {
            return action.payload;
        },
        initialCurrentPage() {
            return 1;
        }
    }
});

const data = createSlice({
  name: 'filter',
  initialState: originalData.records,
  reducers: {
        filterData(state, action) {
            return state.filter(record => record.사업소명.includes(action.payload) || record.소재지도로명주소.includes(action.payload) || record.소재지지번주소.includes(action.payload));
        },
      initialData() {
          return originalData.records;
      }
  },
});

const stateModal = createSlice({
  name: 'stateModal',
  initialState: false,
    reducers: {
    openModal() {
            return true;
      },
      closeModal() {
          return false;
        },
      initialChangeModal() {
          return false;
      }
  },
});

export const { changeTextInput, initialTextInput } = textInput.actions;
export const { changeCurrentPage, initialCurrentPage } = currentPage.actions;
export const { filterData, initialData } = data.actions;
export const { openModal, closeModal, initialChangeModal } = stateModal.actions;

export default configureStore({
    reducer: {
        textInput: textInput.reducer,
        currentPage: currentPage.reducer,
        data: data.reducer,
        stateModal: stateModal.reducer
    }
});
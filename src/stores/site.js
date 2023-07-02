import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_COLORS = "cv-maker-colors";
const LOCAL_STORAGE_MARGINS = "cv-maker-margins";

const getColorsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLORS));
    return colors || {};
  }
  return {};
};

const getMarginsFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const margins = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MARGINS));
    return margins || {};
  }
  return {};
};

export const siteSlice = createSlice({
  name: "site",
  initialState: {
    leftSide: [
      { id: 1, component: "PreviewSocial" },
      { id: 2, component: "PreviewLanguage" },
      { id: 3, component: "PreviewHobbies" },
    ],
    rightSide: [
      { id: 1, component: "PreviewEducation" },
      { id: 2, component: "PreviewExperience" },
      { id: 3, component: "PreviewSkills" },
      { id: 4, component: "PreviewProjects" },
      { id: 5, component: "PreviewCourses" },
      { id: 6, component: "PreviewReferences" },
    ],
    colors: {
      primary: getColorsFromLocalStorage().primary || "#373740",
      secondary: getColorsFromLocalStorage().secondary || "#E1D8CF",
      title: getColorsFromLocalStorage().title || "#E1D8CF",
      subtitle: getColorsFromLocalStorage().subtitle || "#FFFFFF",
      titles: getColorsFromLocalStorage().titles || "#E1D8CF",
      text1: getColorsFromLocalStorage().text1 || "#43434C",
      text2: getColorsFromLocalStorage().text2 || "#43434C",
    },
    margins: {
      top: getMarginsFromLocalStorage().top || 0,
      right: getMarginsFromLocalStorage().right || 0,
      bottom: getMarginsFromLocalStorage().bottom || 0,
      left: getMarginsFromLocalStorage().left || 0,
    },
    isContentEditable: false,
  },
  reducers: {
    setLeftSide: (state, action) => {
      state.leftSide = action.payload;
    },
    setRightSide: (state, action) => {
      state.rightSide = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setMargins: (state, action) => {
      state.margins = action.payload;
    },
    setContentEditable: (state, action) => {
      state.isContentEditable = action.payload;
    },
  },
});

export const {
  setLeftSide,
  setRightSide,
  setColors,
  setMargins,
  setContentEditable,
} = siteSlice.actions;

export default siteSlice.reducer;

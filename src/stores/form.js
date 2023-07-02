import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_APP = "cv-maker-app";

const initialState = {
  personal: {},
  languages: [],
  hobbies: [],
  education: [],
  experience: [],
  skills: [],
  projects: [],
  courses: [],
  references: [],
  social: [],
};

export const loadFormData = () => {
  return async (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP));
      if (data) {
        dispatch(setPersonal(data.personal || {}));
        dispatch(setLanguages(data.languages || []));
        dispatch(setHobbies(data.hobbies || []));
        dispatch(setEducation(data.education || []));
        dispatch(setExperience(data.experience || []));
        dispatch(setSkills(data.skills || []));
        dispatch(setProjects(data.projects || []));
        dispatch(setCourses(data.courses || []));
        dispatch(setReferences(data.references || []));
        dispatch(setSocial(data.social || []));
      }
    } catch (error) {
      console.error("Error loading form data:", error);
    }
  };
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPersonal: (state, action) => {
      state.personal = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setHobbies: (state, action) => {
      state.hobbies = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setReferences: (state, action) => {
      state.references = action.payload;
    },
    setSocial: (state, action) => {
      state.social = action.payload;
    },
  },
});

export const {
  setPersonal,
  setLanguages,
  setHobbies,
  setEducation,
  setExperience,
  setSkills,
  setProjects,
  setCourses,
  setReferences,
  setSocial,
} = formSlice.actions;

export default formSlice.reducer;

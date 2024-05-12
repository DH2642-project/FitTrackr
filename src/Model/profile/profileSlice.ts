import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, database } from "../../firebase";
import { ref, set } from "firebase/database";
import { UserProfile } from "../../main";
import { get } from "firebase/database";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const userId = auth.currentUser?.uid;
  const snapshot = await get(ref(database, "users/" + userId + "/profile"));
  return snapshot.val();
});
export const setGender = createAsyncThunk("profile/setGender", async (newValue: string) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, "users/" + userId + "/profile/gender"), newValue);
});
export const setWeight = createAsyncThunk("profile/setWeight", async (newValue: number) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, "users/" + userId + "/profile/weight"), newValue);
});
export const setHeight = createAsyncThunk("profile/setHeight", async (newValue: number) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, "users/" + userId + "/profile/height"), newValue);
});
export const setAge = createAsyncThunk("profile/setAge", async (newValue: number) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, "users/" + userId + "/profile/age"), newValue);
});

// Define a type for the slice state
export interface ProfileState {
  userProfile: UserProfile | undefined;
  status: string;
  error?: string;
}

const initialState: ProfileState = {
  userProfile: undefined,
  status: "loading", // always fetch data on page load
};

// Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.status = "idle";
        state.userProfile = action.payload;
      })
      .addCase(setGender.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setGender.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(setWeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setWeight.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(setHeight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setHeight.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(setAge.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setAge.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default profileSlice.reducer;
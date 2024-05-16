import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, database } from "../../firebase";
import { ref, set } from "firebase/database";
import { UserProfile } from "../../main";
import { get } from "firebase/database";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const userId = auth.currentUser?.uid;
  const snapshot = await get(ref(database, "users/" + userId + "/profile"));
  if (!snapshot.exists()) {
    return {} as UserProfile;
  }
  return snapshot.val();
});
export const saveChanges = createAsyncThunk("profile/saveChanges", async (newUserProfile: UserProfile) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, "users/" + userId + "/profile"), newUserProfile);
});

// Define a type for the slice state
export interface ProfileState {
  userProfile: UserProfile | undefined;
  status: string;
  error?: string;
}

const initialState: ProfileState = {
  userProfile: {} as UserProfile,
  status: "loading", // always fetch data on page load
};

// Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAge: (state, action: PayloadAction<number>) => {
      if (state.userProfile && action.payload) {
        state.userProfile.age = action.payload;
      }
    },
    setGender: (state, action: PayloadAction<string>) => {
      if (state.userProfile && action.payload) {
        state.userProfile.gender = action.payload;
      }
    },
    setHeight: (state, action: PayloadAction<number>) => {
      if (state.userProfile && action.payload) {
        state.userProfile.height = action.payload;
      }
    },
    setWeight: (state, action: PayloadAction<number>) => {
      if (state.userProfile && action.payload) {
        state.userProfile.weight = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.status = "idle";
        state.userProfile = action.payload;
      })
      .addCase(saveChanges.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveChanges.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { setAge, setGender, setHeight, setWeight } = profileSlice.actions;

export default profileSlice.reducer;

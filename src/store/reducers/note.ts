import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface NoteState {
    id: string;
  }
const initialState: NoteState = {
    id:"",
};
const noteSlice  = createSlice({
    name: "note",
    initialState,
    reducers:{
        setNote:(state, action: PayloadAction<string>)=>{
            state.id = action.payload;
        },
    }

})

export  const {setNote} =noteSlice.actions;
export default noteSlice.reducer;
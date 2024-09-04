import { createSlice } from '@reduxjs/toolkit' //next js redux toolkit

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        eventName: '',
        categories: [],
        fromDate: '',
        toDate: '',
    },
    reducers: {
        fetchConfig: (state, action) => {
            state = { ...state, ...action.payload }
        },
    },
})
// case under reducers becomes an action
export const { fetchConfig } = configSlice.actions
export default configSlice.reducer

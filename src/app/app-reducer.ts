import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type initialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: initialStateType = {
// происходит ли сейчас взаимодействие с сервером
    status: 'idle',
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: null,
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions
//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }

        dispatch(setAppInitializedAC({value: true}));
    })
}

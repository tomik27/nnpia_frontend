import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

//useAppDispatch =It allows you to send or dispatch an action to the redux store by giving the action as an argument to the dispatch variable
//UseAppSelector -Allows you to extract data from the Redux store state, using a selector function
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
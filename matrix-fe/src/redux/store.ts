import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configApi } from './services/configApi'
import { ideasApi } from './services/ideasApi'

export const store = configureStore({
    reducer: {
        [configApi.reducerPath]: configApi.reducer,
        [ideasApi.reducerPath]: ideasApi.reducer,
    }, //add reducers here
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            configApi.middleware,
            ideasApi.middleware
        ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

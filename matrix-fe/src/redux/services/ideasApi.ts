import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IdeaData } from '../../components/common.interface'
import { constants } from './constants'

// Define a service using a base URL and expected endpoints
export const ideasApi = createApi({
    reducerPath: 'ideasApi',
    baseQuery: fetchBaseQuery({ baseUrl: constants.BASE_URL }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getIdeas: builder.query<Array<IdeaData>, void>({
            query: () => 'getIdeas',
        }),
        downloadIdeas: builder.query<[], void>({
            query: () => 'download-excel',
        }),
        submitIdea: builder.mutation({
            query: (payload) => ({
                url: '/submitIdea',
                method: 'POST',
                body: payload,
                // mode: 'no-cors',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetIdeasQuery,
    useLazyGetIdeasQuery,
    useDownloadIdeasQuery,
    useSubmitIdeaMutation,
} = ideasApi

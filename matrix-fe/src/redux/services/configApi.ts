import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { constants } from './constants'
import { Config } from '../../components/common.interface'

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({ baseUrl: constants.BASE_URL }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getConfig: builder.query<Config, void>({
            query: () => 'getConfig',
        }),
        validate: builder.mutation({
            query: (payload) => ({
                url: '/validateAdmin',
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
export const { useGetConfigQuery, useValidateMutation } = configApi

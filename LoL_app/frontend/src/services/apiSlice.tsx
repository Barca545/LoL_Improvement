import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {MatchlistRequestState} from './types/matchlist-types'///why did I need this?
import {} from '../app/slices/matchlistRequestSlice' 

///delete in final build

///https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#:~:text=RTK%20Query%20expects%20a%20baseQuery,to%20return%20such%20an%20object.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:'matchlist/'}),
  endpoints: (builder) => ({
    getMatchlist: builder.query({
      ///Possibly use Axios to handle requests instead of fetchBaseQuery https://redux-toolkit.js.org/rtk-query/usage/customizing-queries and https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced 
      ///This makes it seem like I do: https://stackoverflow.com/questions/71978723/redux-toolkit-setting-initial-state-using-rtk-query.
      query: () => ({url:`atmost/na1/2/`})
      ///query: (url:string|null) => ({url:`${url}/`})
    }),
  }),
})

export const useGetMatchlistQuery = apiSlice.endpoints.getMatchlist.useQuery
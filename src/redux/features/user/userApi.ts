import { baseApi } from "@/redux/api/baseApi";
import { RootState, store } from "@/redux/store";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data) => {
        const params = new URLSearchParams();

        if (data) {
          if (data.searchTerm) {
            params.append("searchTerm", data.searchTerm);
          }
          if (data.category) {
            params.append("category", data.category);
          }
          if (data.sort) {
            params.append("sort", data.sort);
          }
          if (data.limit) {
            params.append("limit", data.limit);
          }
        }

        return {
          url: "/auth/user",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    getUser: builder.query({
      query: () => {
        const user = (store.getState() as RootState).auth.user;
        return {
          url: `/auth/user/${user?.email}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const user = (store.getState() as RootState).auth.user;
        return {
          url: `/auth/user/${user?.email}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } =
  userApi;

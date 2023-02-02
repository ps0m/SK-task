import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BASE, URL_CONTACTS, URL_WS } from '../../constants/constants';
import { isValidMessage } from '../../helpers';
import { BodyContact, IContact, MessageFromWS, MethodForSend } from '../../types/types';
import { NAME } from '../constants/constants';

export const contactsApi = createApi({
  reducerPath: NAME.contactsApi,
  tagTypes: [NAME.Contacts],
  baseQuery: fetchBaseQuery({ baseUrl: URL_BASE }),
  endpoints: (build) => ({
    getContacts: build.query<IContact[], string>({
      query: () => URL_CONTACTS,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: NAME.Contacts as const, _id })),
              { type: NAME.Contacts, id: 'LIST' },
            ]
          : [{ type: NAME.Contacts, id: 'LIST' }],

      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket(URL_WS);
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data: MessageFromWS = JSON.parse(event.data);
            if (!isValidMessage(data)) return;

            updateCachedData((draft) => {
              switch (data.operation) {
                case MethodForSend.add:
                  draft.push({ _id: data._id, code: data.code, phone: data.phone });
                  break;
                case MethodForSend.delete:
                  draft = draft.filter((item) => item._id !== data._id);
                  break;
                case MethodForSend.update:
                  draft.map((item) => {
                    if (item._id === data._id) {
                      item.code = data.code;
                      item.phone = data.phone;
                    }
                  });
                  break;
              }
              return draft;
            });
          };

          ws.addEventListener('message', listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),

    addContact: build.mutation<IContact, BodyContact>({
      query: ({ code, phone }: BodyContact) => ({
        url: URL_CONTACTS,
        method: 'POST',
        body: { code, phone },
      }),
      invalidatesTags: [{ type: NAME.Contacts, id: 'LIST' }],
    }),

    deleteContact: build.mutation<IContact, string>({
      query: (id: string) => ({
        url: `${URL_CONTACTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: NAME.Contacts, id: 'LIST' }],
    }),

    updateContact: build.mutation<IContact, IContact>({
      query: ({ _id, code, phone }: IContact) => ({
        url: `${URL_CONTACTS}/${_id}`,
        method: 'PATCH',
        body: { _id, code, phone },
      }),
      invalidatesTags: [{ type: NAME.Contacts, id: 'LIST' }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;

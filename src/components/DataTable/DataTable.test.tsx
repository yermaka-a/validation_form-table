import { render, screen, waitFor } from '@testing-library/react';
import DataTable from './DataTable';
import {vi, expect, it, describe } from 'vitest'
import '~/__mocks__/intersectionObserverMock'
import fetchPosts from '~/services/fetchPosts';
import { dataIsnotFetch } from '~/constants/commonErrorsMessages';
import FetchDataError from '~/errors/FetchDataError';
import createWrapper from '~/__mocks__/queryClientWrapper';

vi.mock("~/services/fetchPosts")
describe('DataTable', () => {
 
  it('renders mocked post after fetch', async () => {
   const infRsp = {first: 1, items: 1, last: 1, next: null, pages: 1, prev: null,data: [{age: "18", created_at: "2025-05-29T19:46:38.584Z", email: "user1.1@mail.ru", fio: "Петр Петрович Петров", id: "fe78", password: "1234567890", sex: "1"}]}

   vi.mocked(fetchPosts).mockResolvedValue(infRsp)
    const wrapperDataTable = createWrapper()
    render(wrapperDataTable(<DataTable/>))
 
 
    await waitFor(() => {
      const age = screen.getByText(infRsp.data[0].age)
      const email = screen.getByText(infRsp.data[0].email)
      const name = screen.getByText(infRsp.data[0].fio)
      const password = screen.getByText(infRsp.data[0].password)
      const createdAt = screen.getByText(infRsp.data[0].created_at)
      const sex = screen.getByText(infRsp.data[0].sex)
      expect(age).toBeInTheDocument()
      expect(email).toBeInTheDocument()
      expect(name).toBeInTheDocument()
      expect(password).toBeInTheDocument()
      expect(createdAt).toBeInTheDocument()
      expect(sex).toBeInTheDocument()
    })
  })
  it('renders fetch data error message after fetch', async ()=>{
    vi.mocked(fetchPosts).mockRejectedValue(new FetchDataError(500, dataIsnotFetch))
    const wrapperDataTable = createWrapper()
    render(wrapperDataTable(<DataTable/>))
 
   await waitFor(()=>{
      const msg = screen.getByText(dataIsnotFetch)
      expect(msg).toBeInTheDocument()
    })
    
  })
})



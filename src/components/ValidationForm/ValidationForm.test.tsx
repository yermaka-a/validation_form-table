import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ValidationForm from './ValidationForm';
import { expect, it, describe, vi } from 'vitest'
import '~/__mocks__/intersectionObserverMock'
import createWrapper from '~/__mocks__/queryClientWrapper';
import createPost from '~/services/createPost';

vi.mock('~/services/createPost', () => ({
  default: vi.fn(() => Promise.resolve({ success: true })),
}));

describe('ValidationForm', async () => {
  it('calls onSubmit with correct data and checks all data are passed into createPost', async () => {
   
    const validationFormWrapper = createWrapper()
    render(validationFormWrapper(<ValidationForm />));
    
    const email = await screen.findByLabelText(/Email адрес/i) 
    const pass = await screen.findByLabelText(/Пароль/i)
    const fio =  await  screen.findByLabelText(/фио/i)
    const age =  await  screen.findByLabelText(/возраст/i)
    const sex = await  screen.findByRole('combobox')
    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(pass, { target: { value: 'password123' } });
    fireEvent.change(fio, { target: { value: 'Иван Иванов Иванович' } });
    fireEvent.change(age, { target: { value: '30' } });
    fireEvent.change(sex, { target: { value: '1' } }); 
    const btn = await screen.findByRole('button', { name: /Отправить/i })
    fireEvent.click(btn);
    
    await waitFor(() => {
      expect(createPost).toHaveBeenCalledTimes(1); 
      expect(createPost).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        fio: 'Иван Иванов Иванович',
        age: '30',
        sex: '1',
      });
    });
  });
});




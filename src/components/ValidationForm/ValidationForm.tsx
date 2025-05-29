import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import './styles.scss'
import schema from '~/schemas/validationSchemas'
import { type FormData } from '~/types/FormData'
import { useState } from 'react'
import createPost from '~/services/createPost'
import SendDataError from '~/errors/SendDataError'
import ErrorAlert from '~/components/ErrorAlert'
import { useMutation, useQueryClient, type InfiniteData,  } from '@tanstack/react-query'
import type ResponseInfinite from '~/types/ResponseInfinite'


const ValidationForm = () => {
  const [loading, setLoading] = useState(false);
  const [sendingErr, setSendingdErr] = useState("")
  const queryClient = useQueryClient()
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: ()=>{
    let isInvalidate = false
    queryClient.setQueryData(['posts'], (oldData: InfiniteData<ResponseInfinite, number> | undefined)=>{
      console.log('setQueryData',oldData)
      if (oldData){
        const lastPageNum = oldData.pageParams[oldData.pages.length-1]
        const lastPageIdx = lastPageNum-1
        const lastPage = oldData.pages[lastPageIdx]
        console.log("lastPage", lastPage, 'lastPageIdx', lastPageIdx)
       if (lastPage.next == undefined && (lastPage.pages === oldData.pages.length || lastPage.pages === 0)){
          const pages = oldData.pages.filter((_, idx)=> idx >= lastPageIdx - 2)
          const pageParams = oldData.pageParams.filter((_, idx)=> idx >= lastPageIdx - 2)
          console.log("success")
          console.log({pages: [...pages], pageParams:[...pageParams]})
          isInvalidate = true
          return {pages: [...pages], pageParams:[...pageParams]}
       }
      }
    })
    
    if (isInvalidate) queryClient.invalidateQueries({queryKey: ['posts']})  
  },
  onError: (e)=>{
  console.error((e as Error).message)
        if (e instanceof SendDataError){
          setSendingdErr(e.message)
        }
  },
  onSettled: ()=>{
      setLoading(false)
      reset()
  },
  retry: 3,
  retryDelay: 1000
})

  const onSubmit: SubmitHandler<FormData> = async  (data) => {
    setLoading(true)
    mutation.mutate(data)
  };

  return (
    <div className="form-container">
      <h2>Добавить сотрудника</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="form-group">
          <Form.Label>Email адрес</Form.Label>
          <Form.Control type="email" placeholder="введите email" {...register('email', {
            required: true,
          })} />
          {errors?.email && <Form.Text className="error-message">{errors.email.message}</Form.Text>}
           </Form.Group>
            <Form.Group className="form-group">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" {...register('password', {
            required: true,
          })} />
          {errors?.password && <Form.Text className="error-message">{errors.password.message}</Form.Text>}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>ФИО</Form.Label>
          <Form.Control type="text" placeholder="ФИО" {...register('fio', {
            required: true
          })} />
            {errors?.fio && <Form.Text className="error-message">{errors.fio.message}</Form.Text>}
          </Form.Group>
           <Form.Group className="form-group">
          <Form.Label>Возраст</Form.Label>
          <Form.Control type="number" placeholder="Возраст" {...register('age', {
            required: true
          })} />
           {errors?.age && <Form.Text className="error-message">{errors.age.message}</Form.Text>}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Select  {...register('sex', {
            required: true
          })}>
              <option value="1">муж.</option>
              <option value="2">жен.</option>
            </Form.Select>
        </Form.Group>
        <div className="button-container">
          <Button disabled={!isValid || loading}  variant="primary" type="submit" >
             {loading ? "Отправка..." : "Отправить"}
          </Button>
        </div>
      </Form>
      {sendingErr && <ErrorAlert message={sendingErr} onClose={()=> setSendingdErr("")}/>}
    </div>
  )
}

export default ValidationForm

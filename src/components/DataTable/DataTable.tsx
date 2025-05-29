import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import "./styles.scss"
import { useInfiniteQuery } from '@tanstack/react-query';

import fetchPosts from '~/services/fetchPosts';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const DataTable = () => {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({pageParam}) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam:  (lastPage) => lastPage.next || undefined,
    getPreviousPageParam: (firstPage) => firstPage.prev || undefined
  })
  const prev = useInView(
    { threshold: 0.3,}
  )
  const next = useInView({
    threshold: 0.3,
  });
   const listRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
    if (prev.inView && hasPreviousPage) {
      fetchPreviousPage();
       if (listRef.current) {
        listRef.current.scrollTop += 50;
      }
    } 
  }, [prev.inView, hasPreviousPage, fetchPreviousPage]);

  useEffect(() => {
    if (next.inView && hasNextPage) {
      fetchNextPage();
    } 
  }, [next.inView, hasNextPage, fetchNextPage]);
  if (isLoading) return <Spinner animation="border" variant="primary"  className='spinner' />;
  if (error) return <div  className="alert alert-danger" style={{height: "60px", textAlign: "center"}} role="alert">{error.message}</div>;


  return (
    <Container className="table-container">
      <h2 className="mb-4 text-primary">Список Пользователей</h2>
      <Container ref={listRef} className="datatable">
        <Table striped bordered hover variant="light" className="posts-table">
          <thead ref={prev.ref}>
            <tr>
              <th>№</th>
              <th>Email</th>
              <th>ФИО</th>
              <th>Пароль</th>
              <th>Дата создания</th>
              <th>Возраст</th>
            </tr>
          </thead>
          <tbody >
           {data?.pages.map((page, pageIdx) => 
              page.data.map((post, idx) => {
                const currentNumber =  (idx + 1) + (page.next ? (page.next-2) * 5 : page?.prev ? (page.prev) * 5 : pageIdx * 5)
               return ( <tr key={post.id}>
                  <td>{currentNumber}</td>
                  <td>{post.email}</td>
                  <td>{post.fio}</td>
                  <td>{post.password}</td>
                  <td>{post.created_at}</td>
                  <td>{post.age}</td>
                </tr>)
              } 
              )  
            ) }
            <tr ref={next.ref}></tr>
          </tbody>
        </Table>
           {isFetching && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                  <Spinner animation="border" variant="primary"  className='spinner' />
             </div>}
        
      </Container>
    </Container>
  );
};

export default DataTable;

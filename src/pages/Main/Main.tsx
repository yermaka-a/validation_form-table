import  Container from 'react-bootstrap/Container';
import "./styles.scss"
import ValidationForm from '~/components/ValidationForm';
import DataTable from '~/components/DataTable';
 const Main = () => {

  return(
    <Container fluid  className="main-container">
        <ValidationForm/>
        <DataTable />
    </Container>
  );
};

export default Main
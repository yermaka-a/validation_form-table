import Alert from 'react-bootstrap/Alert';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const ErrorAlert =  ({ message, onClose }: ErrorAlertProps) => {
  return (
    <Alert variant="danger" onClose={onClose} dismissible  style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -80%)',
        zIndex: 10, 
        minWidth: '300px',
        textAlign: 'center',
      }}>
      <Alert.Heading>Ошибка</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default ErrorAlert;

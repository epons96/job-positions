import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  subTitle?: string;
}

export const FetchError = ({
  title = 'Recurso no encontrado',
  subTitle = 'Lo sentimos, el recurso que buscas no existe.'
}: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      }
    />
  );
};

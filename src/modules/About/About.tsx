import { Typography, Card } from 'antd'

const { Title, Paragraph } = Typography

const About = () => {
  
  return (
    <Card>
      <Title level={2}>Sobre Job Board</Title>
      <Paragraph>
        Job Board es una plataforma que conecta a profesionales talentosos con
        las mejores oportunidades laborales. Nuestra misión es simplificar el
        proceso de búsqueda de empleo y ayudar a las empresas a encontrar
        el talento adecuado.
      </Paragraph>

      <Title level={3}>¿Qué ofrecemos?</Title>
      <Paragraph>
        <ul>
          <li>Empleos actualizados diariamente</li>
          <li>Proceso de aplicación simplificado</li>
          <li>Búsqueda personalizada por tipo de trabajo y ubicación</li>
          <li>Conexión directa con empleadores</li>
        </ul>
      </Paragraph>
    </Card>
  )
}

export default About
import { Typography, Card } from 'antd'
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography

const About = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <Title level={2}>{t('Sobre Job Board')}</Title>
      <Paragraph>
        {t('Job Board es una plataforma que conecta a profesionales talentosos con las mejores oportunidades laborales. Nuestra misión es simplificar el proceso de búsqueda de empleo y ayudar a las empresas a encontrar el talento adecuado.')}
      </Paragraph>

      <Title level={3}>{t('¿Qué ofrecemos?')}</Title>
      <Paragraph>
        <ul>
          <li>{t('Empleos actualizados diariamente')}</li>
          <li>{t('Proceso de aplicación simplificado')}</li>
          <li>{t('Búsqueda personalizada por tipo de trabajo y ubicación')}</li>
          <li>{t('Conexión directa con empleadores')}</li>
        </ul>
      </Paragraph>
    </Card>
  )
}

export default About
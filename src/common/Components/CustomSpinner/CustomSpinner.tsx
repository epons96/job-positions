import { CoffeeOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react'

interface CustomSpinnerProps {
  fullscreen: boolean;
  indicator?: React.ReactElement<HTMLElement>;
  size?: 'small' | 'default' | 'large';
}

const CustomSpinner: React.FC<CustomSpinnerProps> = ({ fullscreen, indicator, size }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Spin
        size={size || 'large'}
        fullscreen={fullscreen}
        indicator={indicator || <CoffeeOutlined className='text-gray-500!' style={{
          animation: 'zoomInOut 1.5s infinite ease-in-out',
          fontSize: '3rem'
        }} />}
      />
      <p className={`pt-2 ${fullscreen && "hidden"} `}>Cargando datos...</p>
      <style>{`
      @keyframes zoomInOut {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
      `}</style>
    </div>
  );
}

export default CustomSpinner
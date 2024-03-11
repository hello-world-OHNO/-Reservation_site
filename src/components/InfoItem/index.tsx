import React from 'react';

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = () => {
  return (
    <div style={{ width: '180px', height: '428px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '40px', marginLeft: '17px', marginTop: '10px' }}>住所</div>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '40px', marginLeft: '17px' }}>アクセス</div>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '40px', marginLeft: '17px' }}>電話番号</div>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '40px', marginLeft: '17px' }}>営業時間</div>
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '40px', marginLeft: '17px' }}>定休日</div>
    </div>
  )
};

export default InfoItem;

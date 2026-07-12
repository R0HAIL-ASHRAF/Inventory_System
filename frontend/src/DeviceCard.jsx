import React from 'react';

// This component takes a "device" object as a property (prop)
function DeviceCard({ device }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{device.manufacturer} {device.model}</h3>
      <p><strong>Type:</strong> {device.device_type}</p>
      <p><strong>Status:</strong> {device.status}</p>
    </div>
  );
}

export default DeviceCard;
'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001'
    : 'https://gipit-back.vercel.app';

  return (
    <SwaggerUI url={`${baseUrl}/api/docs`} />
  );
}
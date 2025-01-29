'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001'
    : 'https://gipit-back.vercel.app';

  return (
    <div className="swagger-container">
      <SwaggerUI 
        url={`${baseUrl}/api/docs`}
        tryItOutEnabled={true}
        docExpansion="list"
        persistAuthorization={true}
      />
      <style jsx global>{`
        .swagger-container {
          margin: 0 auto;
          max-width: 1200px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
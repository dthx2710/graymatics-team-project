import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import apiDoc from '@/Doc/api_doc.json';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }) as React.FC<{ spec: any }>;
  

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: apiDoc,
    host: 'localhost:3000',
    basePath: '/api',
    schemes: ['http'],
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
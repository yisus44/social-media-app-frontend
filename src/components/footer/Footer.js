import React from 'react';

import { Header } from 'semantic-ui-react';

export default function Footer() {
  return (
    <div className="footer">
      <br />
      <Header size="small">
        <p style={{ color: '#FFFF' }}>
          <strong>
            Project mainly developed and updated by Jesus Adrian Flores Arevalo
            using Postgres, NodeJS, GraphQL and ReactJS
            <br />
            Here you can find code for the
            <a href="https://github.com/yisus44/social-media-app-frontend">
              {' '}
              frontend{' '}
            </a>
            and for the
            <a href="https://github.com/yisus44/social-media-app-backend">
              {' '}
              backend.
            </a>{' '}
          </strong>
        </p>
      </Header>
    </div>
  );
}

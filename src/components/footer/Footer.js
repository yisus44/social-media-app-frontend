import React from 'react';

import { Header } from 'semantic-ui-react';

export default function Footer() {
  return (
    <div class="footer">
      <br />
      <Header size="small">
        Project mainly developed and updated by Jesus Adrian Flores Arevalo
        using NodeJS, GraphQL and ReactJS
        <br />
        Here you can find code for the{' '}
        <a href="https://github.com/yisus44/social-media-app-frontend">
          frontend
        </a>{' '}
        and for the
        <a href="https://github.com/yisus44/exercise-tracker-graph">
          {' '}
          backend.
        </a>{' '}
      </Header>
    </div>
  );
}

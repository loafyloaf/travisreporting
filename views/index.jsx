import React from 'react';
import { Header } from 'watson-react-components';
import Demo from './Demo.jsx';

export default function Index() {
  return (
    <div>
      <Header
        mainBreadcrumbs="Watson Natural Language Understanding Starter"
        mainBreadcrumbsUrl="#"
        subBreadcrumbs="travisreportingolaph"
        subBreadcrumbsUrl="#"
      />
      <Demo/>
    </div>
  );
}

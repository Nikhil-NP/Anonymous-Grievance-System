import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Layout from './Components/Layout'; //for the basic header and footer

const App = () => (
  <Router>
    <Layout>
      <AppRoutes />
    </Layout>
  </Router>
);


export default App;
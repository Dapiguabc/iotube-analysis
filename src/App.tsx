import React from 'react';
import Home from  './page/home'
import { Layout } from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const { Header, Content } = Layout;

const client = new ApolloClient({
  uri: '/api-gateway/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "#3C3C4D"}}>
          <div className="logo" />
        </Header>
        <Content className="site-layout" style={{padding: '24px 10%', marginTop: 64 }}>
          <Home />
        </Content>
      </Layout>
    </ApolloProvider>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const client = new ApolloClient({
    uri: 'http://localhost:4001',
    cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
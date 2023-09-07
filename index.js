const { ApolloServer} = require('apollo-server');
const { typeDefs } = require('./schema');
const { Product } = require('./resolvers/product');
const { Category } = require('./resolvers/category');
const { Query } = require('./resolvers/query');
const { Mutation } = require('./resolvers/mutation');
const { products, categories, reviews } = require('./db');


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Category,
        Product,
    },
    context: {      // Passing the DB data
        products,
        categories,
        reviews
    }
});


server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
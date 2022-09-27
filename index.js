const { response } = require('express');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const app = express();
const PORT = 3000;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log (`Server running at port ${PORT}`);
});
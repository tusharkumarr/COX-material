const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const MONGODB = 'mongodb://localhost:27017/CoxUsers';
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
// const Recipe = require('./models/Recipe');
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});


mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(async () => {
        console.log("Connected successfully");
        app.use(bodyParser.json());
        app.use(cors());



        await server.start();
        app.use("/graphql", expressMiddleware(server));



        app.listen(5000, () => console.log("Sever Started at PORT 5000"));
        // server.listen({ port: 5000 }).then(({ url }) => {
        //     console.log(`Server running at ${url}`);
        // });

    })



    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

    app.get('/recipes', async (req, res) => {
        try {
            
            var query = `query GetRecipesByName($name: String!) {
                getRecipeByName(name: $name) {
                  description
                  createdAt
                  
                }
              }`

            fetch("http://localhost:5000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query,
                    variables: { name:"hhjhh" },
                }),
            })
                .then(r => r.json())
                .then(data => res.json( data["data"]["getRecipeByName"]))
               







        // var name = "hhjhh";

        // const { data } = await server.executeOperation({
        //     query: `
        //         query GetRecipesByName($name: String!) {
        //             getRecipeByName(name: $name) {
        //               description
        //               createdAt
        //               name
        //             }
        //           }
     
        //         `,
        //     // variables: { name },
        //     varables: { name }
        // });
        // console.log(data);
        // res.json(data.getRecipeByName);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});
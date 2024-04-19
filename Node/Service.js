const {ApolloServer}=require("@apollo/server");
const {expressMiddleware}=require("@apollo/server/express4");
const { default: axios } = require("axios");
const bodyParser=require('body-parser');
const cors=require('cors');
const express=require("express");
async function satrtServer(){
    const app=express();
    const server=new ApolloServer({
        typeDefs:`
            type User{
                id:ID!
                name:String!
                username:String!
                email:String!
                phone:String!
                website:String!
            }
            
            type Todo{
                id:ID!
                title:String!
                completed:Boolean
                userId:ID!
            }
            type Query{
                getTodos:[Todo]
                getAllUsers:[User]
                getUser(id:ID):User
            }
        `,
        resolvers:{
            Query:{
                getTodos: async ()=>(await (axios.get('https://jsonplaceholder.typicode.com/todos'))).data,
                getAllUsers: async ()=>(await (axios.get('https://jsonplaceholder.typicode.com/users'))).data,
                getUser:async (parend,{id})=>(await (axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))).data,
            }
        },
    });
    app.use(bodyParser.json());
    app.use(cors());
    await server.start();
    app.use("/graphql",expressMiddleware(server));
    app.listen(5000,()=>console.log("Sever Started at PORT 5000"));
}
satrtServer();
// fileName : server.js
// Example using the http module
import http from "http";
import db from "./db";
import { ApolloServer, gql } from "apollo-server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { Query } from "mongoose";

import Continent from "./models/Continent"
import Country from "./models/Country"
import Language from "./models/Language"


db();

const typeDefs = gql`

    type Query {
        continent(code:String!): Continent!
        continents: [Continent!]
        
        country(code:String!): Country!
        countries:[Country!]

        language(code:String!):Language!
        languages:[Language!]
    }



  type Continent {
    name: String!
  }
  type Country {
    name: String!
  }
  type Language {
    name: String!
  }
`;

const resolvers = {
  Query: {

    continent: async(parent,args,{db}) => {
        const continent = await db.Continent.find((continent)=> continent.code === args.code)
        console.log("continent finded: ", continent)
        return continent
    },

    continents: async(parent,args,{db})=> {
        const continents = await db.Continent.find()
        return continents
    },
    
    country: async(parent,args,{db})=> {
        const country = await db.Country.find((country)=> country.code === args.code)
        return country
    },

    countries: async(parent,args,{db}) => {
        const countries = await await db.Country.find()
        return countries
    },

    language: async(parent,args,{db})=> {
        const language = await db.Language.find((language)=> language.code === args.code)
        return language
    },

    languages: async(parent,args,{db}) => {
        const continent =  await db.Language.find()
        return continent
    }

  },


};

// Create an HTTP server
const server = new ApolloServer({

    typeDefs,
    resolvers,
  
  context:{
    db:{
        Continent,
        Country,
        Language
    }
  },
  plugins:[ApolloServerPluginLandingPageGraphQLPlayground({})]
});


server.listen().then(({url})=> {
    console.log(`Apollo server ready at ${url}`);

})


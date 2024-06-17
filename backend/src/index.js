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
    id:ID!
    name: String!
    code:String!
    countries:[Country]

  }
  type Country {
    id:ID!
    name: String!
    code:String!
    languages:[Language]
    continent:Continent
    continent_code:String,    
  }
  type Language {
    id:ID!
    name: String!
    code:String!
    countries:[Country]
    continent:Continent
    continent_code:String
  }
`;

const resolvers = {

        Continent:{
            countries: async(parent,args,{db})=> {
                const countries = await db.Country.find().then(countries=> countries.filter((country) => country.continent_code === parent.code))
                return countries
            },
        },

        Country:{

            languages: async(parent,args, {db})=> {
                const lang = await db.Language.find().then(langs=> langs.filter((lang) => lang.code === parent.code))
                console.log("finded")
                return lang
            },
        

            continent: async(parent,args, {db})=> {
                const continentObj = await db.Continent.find().then(continents=> continents.find((continent) => continent.code === parent.continent_code))
                console.log("finded")
                return continentObj
            }
        },


            Language: {
                countries: async(parent,args, {db})=> {
                    const countryObj = await db.Country.find().then(countries=> countries.filter((country) => country.code === parent.code))
                    console.log("finded")
                    return countryObj
                },
                continent: async(parent,args, {db})=> {
                    const continentObj = await db.Continent.find().then(continents=> continents.filter((continent) => continent.code === parent.continent_code))
                    console.log("finded")
                    return continentObj
                }
            },
        
    

  Query: {

    continent: async(parent,args,{db}) => {
        const continent = await db.Continent.find().then(continents=>continents.find((continent)=> continent.code === args.code))
        console.log("continent finded: ")
        return continent
    },

    continents: async(parent,args,{db})=> {
        const continents = await db.Continent.find()
        return continents
    },
    
    country: async(parent,args,{db})=> {
        const country =  await db.Country.find().then(countries=>countries.find((country)=> country.code === args.code))
        return country
    },

    countries: async(parent,args,{db}) => {
        const countries = await await db.Country.find()
        return countries
    },

    language: async(parent,args,{db})=> {
        const language = await db.Language.find().then(languages=>languages.find((language)=> language.code === args.code))
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


const express = require('express');
const mysql = require('mysql2');
const { graphqlHTTP } = require('express-graphql');
const {
   GraphQLSchema,
   GraphQLObjectType,
   GraphQLString,
   GraphQLList,
   GraphQLInt,
   GraphQLNonNull,
   GraphQLFloat
} = require('graphql');

const app = express()

const connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: 'bonose',
   database: 'shelton_restaurants_local'
});

connection.connect();

const RestaurantType = new GraphQLObjectType({
   name: 'Restaurant',
   description: 'This represents a restaurant',
   fields: () => ({
      id_restaurant: {type: GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLNonNull(GraphQLString)},
      address: {type: GraphQLNonNull(GraphQLString)},
      menuItems: {
         type: new GraphQLList(MenuItemType),
         resolve: async (restaurant) => {
            const [rows] = await connection.promise().execute('SELECT * FROM menu_items WHERE id_restaurant = ?', [restaurant.id_restaurant]);
            return rows;
         }
      }
   })
})

const MenuItemType = new GraphQLObjectType({
   name: 'MenuItem',
   description: 'This represents a menu item',
   fields: () => ({
      id_menu_item: {type: GraphQLNonNull(GraphQLInt)},
      name: {type: GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLNonNull(GraphQLString)},
      price: {type: GraphQLNonNull(GraphQLFloat)},
      category: {type: GraphQLNonNull(GraphQLInt)},
      id_restaurant: {type: GraphQLNonNull(GraphQLInt)}
   })
})

const RootQueryType = new GraphQLObjectType({
   name: 'Query',
   description: 'Root Query',
   fields: () => ({
      restaurants: {
         type: new GraphQLList(RestaurantType),
         description: 'List all restaurants',
         resolve: () => connection.promise().query('select * from restaurants')
            .then( ([rows]) => {
               return rows
            })
         },
         restaurant: {
            type: RestaurantType,
            description: 'A single restaurant',
            args: {
               id_restaurant: {type: GraphQLInt}
            },
            resolve: (parent, args) => connection.promise().execute('SELECT * FROM restaurants where id_restaurant = ?', [args.id_restaurant])
               .then( ([rows]) => {
                  return rows[0]
               })
         }
   })
})

// const RootMutationType = new GraphQLObjectType({
//    name: 'Mutation',
//    description: 'Root Mutation',
//    fields: () => ({

//    })
// })

const schema = new GraphQLSchema({
   query: RootQueryType,
   // mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true
}))

app.listen(5000, () => console.log('Server Running'))
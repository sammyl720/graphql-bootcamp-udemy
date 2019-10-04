import { GraphQLServer } from 'graphql-yoga'

// 5 scalar types in graphql
// Types: String, Boolean, Int
// Float, ID

// Demo User Data
const users = [
  {
    id: '1',
    name: 'Shmuel Leider',
    email: 'sam@example.com',
    age: 32
  },
  {
    id: '2',
    name: 'Sara',
    email: 'sarah@example.com'
  },
  {
    id: 3,
    name: 'Mike',
    email: 'mike@example.com'
  }
]

// Dummy post data
const posts = [
  {
    id: '32ae',
    title: 'Welcome to Graphql',
    body: 'I just started learning GraphQL. Cool Stuff!!',
    published: false
  },
  {
    id: '12ae',
    title: 'Keep learning graphql',
    body: 'How to perform query operations on custom types',
    published: false
  },
  {
    id: '11ae',
    title: 'Graphql custom types',
    body:
      'With Graphql, you can write custom types that have scalar or other custm type fields',
    published: true
  }
]
// ? Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post! 
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// ? Resolvers
// ? resolver arguments:
// ? parent, args, context: ctx, info
const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => {
      if (!args.query) {
        return users
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts: (parent, args, ctx, info) => {
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    },
    me: () => {
      return {
        id: 'edon23',
        name: 'Shmuel Leider',
        email: 'sam.leider@gmail.com',
        age: 32
      }
    },
    post: () => {
      return posts[0]
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('Server is up')
})

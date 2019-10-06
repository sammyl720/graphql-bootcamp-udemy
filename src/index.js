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
    age: 32,
    comments: ['c1e13', 'c1e12', 'c1e15']
  },
  {
    id: '2',
    name: 'Sara',
    email: 'sarah@example.com',
    comments: ['c1e14']
  },
  {
    id: 3,
    name: 'Mike',
    email: 'mike@example.com',
    comments: []
  }
]

// Dummy post data
const posts = [
  {
    id: '32ae',
    title: 'Welcome to Graphql',
    body: 'I just started learning GraphQL. Cool Stuff!!',
    published: false,
    author: '1',
    comments: ['c1e12']
  },
  {
    id: '12ae',
    title: 'Keep learning graphql',
    body: 'How to perform query operations on custom types',
    published: false,
    author: '1',
    comments: ['c1e14']
  },
  {
    id: '11ae',
    title: 'Graphql custom types',
    body:
      'With Graphql, you can write custom types that have scalar or other custm type fields',
    published: true,
    author: '2',
    comments: ['c1e13', 'c1e15']
  }
]

// dummy comment data
const comments = [
  { id: 'c1e12', text: 'Way to Go!', author: '1', post: '32ae' },
  { id: 'c1e13', text: 'Keep it up!', author: '1', post: '11ae' },
  { id: 'c1e14', text: 'Keep Going!', author: '2', post: '12ae' },
  { id: 'c1e15', text: 'Cool Stuff!', author: '1', post: '11ae' }
]
// ? Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
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
    },
    comments: (parent, args, ctx, info) => {
      return comments
    }
  },
  Post: {
    author: (parent, args, ctx, info) => {
      return users.find(user => parent.author === user.id)
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter(comment => parent.id === comment.post)
    }
  },
  User: {
    posts: (parent, args, ctx, info) => {
      return posts.filter(post => post.author === parent.id)
    },
    comments: (parent, args, ctx, info) => {
      return comments.filter(comment => parent.id === comment.author)
    }
  },
  Comment: {
    author: (parent, args, ctx, info) => {
      return users.find(user => parent.author === user.id)
    },
    post: (parent, args, ctx, info) => {
      return posts.find(post => parent.post === post.id)
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

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
    id: '3',
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

const db = {
  users,
  posts,
  comments
}

export default db

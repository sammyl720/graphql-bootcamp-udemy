const Query = {
  users: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.users
    }
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.posts
    }
    return db.posts.filter(post => {
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
    return {
      id: '092',
      title: 'Graphql 101',
      body: '',
      published: false
    }
  },
  comments: (parent, args, { db }, info) => {
    return db.comments
  }
}

export default Query

import v4 from 'uuid'
const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const emailTaken = db.users.some(user => user.email === args.data.email)
    if (emailTaken) {
      throw new Error('E-mail taken')
    }
    const user = {
      id: v4(),
      ...args.data
    }
    db.users.push(user)
    return user
  },
  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    const deletedUsers = db.users.splice(userIndex, 1)
    db.posts = db.posts.filter(post => {
      const match = post.author === args.id
      if (match) {
        db.comments = db.comments.filter(comment => {
          return comment.post !== post.id
        })
      }
      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== args.id)
    return deletedUsers[0]
  },
  deletePost: (parent, args, { db }, info) => {
    const postIndex = db.posts.findIndex(post => post.id === args.id)
    if (postIndex === -1) {
      throw new Error('Post not found')
    }
    const deletedPosts = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter(comment => {
      return comment.post !== args.id
    })
    return deletedPosts[0]
  },
  updateUser: (parent, args, { db }, info) => {
    const { id, data } = args
    const user = db.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => {
        user.email === data.email
      })
      if (emailTaken) {
        throw new Error('Email Taken')
      }

      user.email = data.email
    }
    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },
  deleteComment: (parent, args, { db }, info) => {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    )
    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }
    const deletedComments = db.comments.splice(commentIndex, 1)
    return deletedComments[0]
  },
  createPost: (parent, args, { db }, info) => {
    const userExists = db.users.some(user => user.id === args.data.author)
    if (!userExists) {
      throw new Error('User not found')
    }
    const post = {
      id: v4(),
      ...args.data
    }
    db.posts.push(post)

    return post
  },
  createComment: (parent, args, { db }, info) => {
    const userExists = db.users.some(user => user.id === args.data.author)
    const postExists = db.posts.some(
      post => post.id === args.data.post && post.published
    )
    if (!userExists) {
      throw new Error('User not found')
    }
    if (!postExists) {
      throw new Error('Post does not exist')
    }

    const comment = {
      id: v4(),
      ...args.data
    }
    db.comments.push(comment)

    return comment
  }
}

export default Mutation
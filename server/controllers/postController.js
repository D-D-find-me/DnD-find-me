
module.exports = {
    getPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        try {
            const post = await db.post.get_one_post(+id)
            res.status(200).send(post)
        } catch(err){
            console.log('err on getPost in server', err)
            res.sendStatus(502)
        }
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        try {
            const allPosts = await db.post.get_posts()
            res.status(200).send(allPosts)
        } catch(err){
            console.log('err on getPosts in server', err)
            res.sendStatus(503)
        }
    },
    createPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, content, zipcode} = req.body
        const {id} = req.session.user
        try {
            const post = await db.post.create_posts([title, content, zipcode, id])
            res.status(200).send(post)
        } catch(err){
            console.log('err on createPost serverside', err)
            res.sendStatus(504)
        }
    },
    updatePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {title, description, zipcode} = req.body
        try {
            const newPost = await db.post.update_post([description, title, zipcode, +id])
            res.status(200).send(newPost)
        } catch(err){
            console.log('err on updatePost server side', err)
            res.sendStatus(505)
        }
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        try {
            const posts = await db.post.delete_post(+id)
            res.status(200).send(posts)
        } catch(err){
            console.log('err on deletePost server side', err)
            res.sendStatus(506)
        }
    },
}

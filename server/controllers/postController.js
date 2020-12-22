
module.exports = {
    getPost: async (req, res) => {
        const db = req.app.get('db')
        const id = req.params
        db.post.get_one_post(id).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        db.post.get_posts().then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    createPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, content, zipcode} = req.body
        const {id} = req.session.user
        await db.post.create_posts([title, content, zipcode, id])
        res.sendStatus(200)
    },
    updatePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {title, description, zipcode} = req.body
        await db.post.update_post([description, title, zipcode, id]).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        await db.post.delete_get_post(id)
        res.sendStatus(200)
    },
}

const bcrypt = require('bcrypt');
const db = req.app.get('db')
module.exports = {
    getPost: async (req, res) => {
        const id = req.params
        db.get_one_post(id).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getPosts: async (req, res) => {
        db.get_posts().then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    createPost: async (req, res) => {
        const {title, content, zipcode} = req.body
        const {id} = req.session.user
        await db.create_posts([title, content, zipcode, id])
        res.sendStatus(200)
    },
    updatePost: async (req, res) => {
        const {id} = req.params
        const {title, description, zipcode}
        await db.update_post([description, title, zipcode, id]).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    deletePost: async (req, res) => {
        const {id} = req.params
        await db.delete_get_post(id)
        res.sendStatus(200)
    },
}
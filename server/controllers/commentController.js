module.exports = {
    getAllComments: async (req, res) => {
        const db = req.app.get('db');
        const {postId} = req.params;
        try {
            const comments = await db.comments.get_comments(+postId)
            res.status(200).send(comments)
        } catch(err){
            console.log('err on getAllComments func, server', err)
            res.sendStatus(503);
        }
    },
    addComment: async (req, res) => {
        // what are these specific variables called? if nothing is showing up thru
        // these endpoints, its because of these being wrong, I'd im
        const db = req.app.get('db');
        const {body} = req.body;
        const {id} = req.session.user;
        const {postId} = req.params;
        try {
            const comment = await db.comment.create_comment([body, id, +postId])
            res.status(200).send(comment);
        } catch(err){
            console.log('err on addComment func, server', err);
            res.sendStatus(502);
        }
    },
    deleteComment: async (req, res) => {
        const db = req.app.get('db');
        const {commentId} = req.params;
        try {
            const comments = await db.comments.delete_comment(+commentId);
            res.status(200).send(comments);
        } catch(err){
            console.log('err on deleteComment func, server', err);
            res.sendStatus(501);
        }
    },
    updateComment: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {body} = req.body;
        try {
            const newComment = await db.comments.update_comments([+id, body])
            res.status(200).send(newComment)
        } catch(err){
            console.log('err on updatecomment, server', err);
            res.sendStatus(505);
        }
    }
}
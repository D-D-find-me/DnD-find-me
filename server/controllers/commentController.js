module.exports = {
    getAllComments: async (req, res) => {
        const db = req.app.get('db');
        const {post_id} = req.params;
        try {
            const comments = await db.comments.get_comments(+post_id)
            res.status(200).send(comments)
        } catch(err){
            console.log('err on getAllComments func, server', err)
            res.sendStatus(503);
        }
    },
    addComment: async (req, res) => {
        const db = req.app.get('db');
        const {commentBody} = req.body;
        const {id} = req.session.user;
        const {post_id} = req.params;
        try {
            const comment = await db.comments.create_comment([commentBody, id, +post_id])
            res.status(200).send(comment);
        } catch(err){
            console.log('err on addComment func, server', err);
            res.sendStatus(502);
        }
    },
    deleteComment: async (req, res) => {
        //is it getting the comments id from params? 
        const db = req.app.get('db');
        const {commentId} = req.params;
        try {
            const comments = await db.comments.delete_comments(+commentId);
            res.status(200).send(comments);
        } catch(err){
            console.log('err on deleteComment func, server', err);
            res.sendStatus(501);
        }
    },
    updateComment: async (req, res) => {
        const db = req.app.get('db');
        const {commentId} = req.params;
        const {commentBody} = req.body;
        try {
            const newComment = await db.comments.update_comments([+commentId, commentBody])
            res.status(200).send(newComment)
        } catch(err){
            console.log('err on updatecomment, server', err);
            res.sendStatus(505);
        }
    }
}
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password, phone_num, char_class, zipcode, dm, online, pfp} = req.body;
        try {
            let [foundUser] = await db.adventurer.check_adventurers([username, phone_num]);
            if(foundUser){
                return res.status(403).send('User information already taken')
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            let [newUser] = await db.adventurer.add_adventurers([username, hash, phone_num, char_class, zipcode, dm, online, pfp]);
            req.session.user = newUser
            res.status(200).send(req.session.user)
        } catch(err){
            console.log('err on register func, server', err)
            res.sendStatus(501);
        }
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password, } = req.body;
        try {
            const [foundUser] = await db.adventurer.check_login(username)
            if(foundUser){
                const comparePassword = foundUser.password;
                const authenticated = bcrypt.compareSync(password, comparePassword);
                if(authenticated){
                    delete foundUser.password;
                    req.session.user = foundUser;
                    res.status(200).send(req.session.user);
                } else {
                    res.status(402).send('incorrect login information')
                }
            } else {
                res.status(405).send('incorrect login information')
            }
        } catch(err){
            console.log('err on login func, server', err);
            res.sendStatus(500);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getAdventurer: (req, res) => {
        res.status(200).send(req.session.user);
    },
    editAdventurer: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {username, online, pfp} = req.body;
        try {
            const [newAdventurer] = await db.adventurer.update_adventurer([id, username, online, pfp]);
            req.session.user = newAdventurer;
            res.status(200).send(req.session.user);
        } catch(err){
            console.log('err on editAdvent func, server', err);
            res.sendStatus(504);
        }
    }
}
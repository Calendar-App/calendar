module.exports = {
    getUsers: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.get_users()
        .then((users) => {
            return res.status(200).send(users)
        })
        .catch((err) => res.status(500).send(err))
    }
}
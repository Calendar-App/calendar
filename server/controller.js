module.exports = {
    getUsers: (req, res, next) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.get_users()
        .then((users) => {
            return res.status(200).send(users)
        })
        .catch((err) => res.status(500).send(err))
    },

    deleteUser: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const userId = req.params.id;

        console.log(userId)

        dbInstance.delete_user([userId])
                  .then( () => res.send() );
    },

    removeWeek: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id, week } = req.params;

        dbInstance.removeWeek([id, week])
                  .then( () => res.send() );
    }
}
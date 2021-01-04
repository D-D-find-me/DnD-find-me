module.exports = {
    getLocations: async (req, res) => {
        const db = req.app.get('db')
        try {
            const locations = await db.locations.get_locations()
            res.status(200).send(locations)
        } catch(err){
            console.log('err on getlocations backend', err)
            res.sendStatus(409)
        }
    },
    createLocation: async (req, res) => {
        const db = req.app.get('db');
        const {latitude, longitude} = req.body;
        try {
            let location = await db.locations.create_location([latitude, longitude])
            res.status(200).send(location)
        } catch(err){
            console.log('err on createlocation server side', err)
            res.sendStatus(408)
        }
    },
    deleteLocation: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params;
        try {
            const locations = await db.locations.delete_location(+id)
            res.status(200).send(locations)
        } catch(err){
            console.log('err on deletelocation serverside', err)
            res.sendStatus(409)
        }
    },
    updateLocation: async (req, res) => {
        const db = req.app.get('db');
        const {locationId} = req.params;
        const {latitude, longitude} = req.body;
        try {
            const newLocation = await db.locations.update_location([+locationId, latitude, longitude])
            res.status(200).send(newLocation)
        } catch(err){
            console.log('err on updatelocation server', err)
            res.sendStatus(407)
        }
    }
}
const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// routes for api/users endpoint

//api/users: get all and create new
router.route('/')
.get(getAllUsers)
.post(createUser)

//api/users/:id
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;
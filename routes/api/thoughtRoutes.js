const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// routes for api/thoughts endpoint

//api/thoughts: get all and create new
router.route('/')
.get(getAllThoughts)
.post(createThought)

//api/thoughts/:id
router.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

//api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;
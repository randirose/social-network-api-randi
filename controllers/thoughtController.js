const { User, Thought } = require('../models');

// functionality for api/thoughts endpoint
const thoughtController = {
    //get all thoughts
    async getAllThoughts(req,res) {
      try {
        const thoughts = await Thought.find({})
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //get a single thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.id})
              .select('-__v')

              if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
        
              res.json(thought);
        } catch (err) {
              res.status(500).json(err);
        }
    },
    //create a new thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const id = req.body._id;
          await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: {thoughts: id }},
            { new: true }
          )
          res.json(thought);
        } catch (err) {
          res.status(500).json(err.message);
        }
    },
    //update thought by id
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete thought by id and remove from its associated users
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          //remove thought from associated User
          await User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        );
          res.json({ message: 'thought deleted and removed from associated users!' })
        } catch (err) {
          res.status(500).json(err);
        }
    },
    //add reaction
    async addReaction(req,res) {
        try {
            const thought = await User.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought with that id!' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: { reactions: req.params.reactionId }},
                { new: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought with that id!' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = thoughtController;
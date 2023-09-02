const { User, Thought } = require('../models');

// functionality for api/users endpoint
const userController = {
    //get all users
    async getAllUsers(req,res) {
      try {
        const users = await User.find({})
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //get a single user
    async getSingleUser (req, res) {
        try {
            const user = await User.findOne({_id: req.params.id})
              .select('-__v')
              .populate({
                path: 'thoughts',
                select: '-__v'
              })
              .populate({
                path: 'friends',
                select: '-__v'
              })

              if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
              }
        
              res.json(user);
        } catch (err) {
              res.status(500).json(err);
        }
    },
    //create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    //update user by id
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete user by id and its associated thoughts
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    //!!!!! BONUS!!!!!!! delete associated user thoughts when user is deleted !!!!!BONUS!!!!!!//
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
    },
    //add friend
    async addFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'no user with that id!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $pull: { friends: req.params.friendId }},
                { new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'no user with that id!' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = userController;
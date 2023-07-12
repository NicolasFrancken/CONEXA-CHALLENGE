const HttpError = require("../models/http-error");
const User = require("../models/user");

// GET ALL USERS
const getUsers = async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const search = req.query.search.toLowerCase();

  let users;
  let user;
  if (search === "") {
    try {
      users = await User.paginate({}, { limit, page });
    } catch (e) {
      const error = new HttpError("Fetching users failed", 500);
      return next(error);
    }
    res.status(200).json(users);
  } else {
    try {
      user = await User.findOne({ email: search });
    } catch (e) {
      const error = new HttpError("Fetching user failed", 500);
      return next(error);
    }

    if (user === null) {
      const error = new HttpError("No user with that email", 500);
      return next(error);
    }
    res.status(200).json(user);
  }
};

module.exports = getUsers;

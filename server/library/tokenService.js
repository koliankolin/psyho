const jwt = require('jsonwebtoken');
const jwtSecrete = require('config').get('jwtSecrete');
const expiresTimeForToken = 3600;

module.exports.getTokenForUser = async (user) => {
  const payload = {
      user: {
          id: user.id
      }
  };

  return await jwt.sign(
      payload,
      jwtSecrete,
      { expiresIn: expiresTimeForToken }
  );
};

module.exports.getUserFromToken = async (token) => {
    try {
        return await jwt.verify(token, jwtSecrete).user;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};
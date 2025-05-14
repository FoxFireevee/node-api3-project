const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  console.log(
    'Request Method: ', method,
    'Request URL: ', url,
    'Timestamp: ', timestamp, 
  );
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const id = await Users.getById(req.params.id);
    if(id) {
      req.id = id;
      next();
    } else {
      res.status(404).json({ message: 'user not found' });
      // next({ status: 404, message: 'user not found' });
    }
  } catch(error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if(
    name !== undefined &&
    typeof name === 'string' && 
    name.trim().length
  ) {
    next()
  } else {
    next({ status: 400, message: 'missing required name field' });
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if(
    text !== undefined && 
    typeof text === 'string' && 
    text.trim().length
  ) {
    next()
  } else {
    next({ status: 400, message: 'missing required text field' })
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
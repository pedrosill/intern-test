import jwt from 'jsonwebtoken';
import config from './config.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isInstitution: user.isInstitution,
    },
    config.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length); // Bearer XXXXXX
    jwt.verify(
      onlyToken,
      config.JWT_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isInstitution = (req, res, next) => {
  if (req.user && req.user.isInstitution) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Institution Token' });
  }
};

export const isInstitutionOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isInstitution || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Institution/Admin Token' });
  }
};


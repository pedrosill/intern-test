import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Internship from '../models/internshipModel.js';
import { isAdmin, isAuth } from '../utilities.js';
import data from '../data.js'

const internshipRouter = express.Router();

internshipRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const internships = await Internship.find({});
    res.send(internships);
  })
);

internshipRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Internship.remove({});
    const createdInternship = await Internship.insertMany(data.internships);
    res.send({ createdInternship });
  })
);

internshipRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (internship) {
      res.send(internship);
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

internshipRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const internship = new Internship({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      company: 'sample name',
      location: 'sample location',
      candidates: 0,
      status: 'Open or Closed',
      type: 'Part-time',
      date: 'sample date',
      description: 'sample description',
    });
    const createdInternship = await internship.save();
    res.send({ message: 'Internship Created', internship: createdInternship });
  })
);

internshipRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const internshipId = req.params.id;
    const internship = await Internship.findById(internshipId);
    if (internship) {
        internship.name = req.body.name;
        internship.image = req.body.image;
        internship.company = req.body.company;
        internship.location = req.body.location;
        internship.candidates = req.body.candidates;
        internship.status = req.body.status;
        internship.type = req.body.type;
        internship.date = req.body.date;
        internship.description = req.body.description;
      const updatedInternship = await internship.save();
      res.send({ message: 'Internship Updated', internship: updatedInternship });
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

internshipRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    if (internship) {
      const deleteInternship = await internship.remove();
      res.send({ message: 'Internship Deleted', internship: deleteInternship });
    } else {
      res.status(404).send({ message: 'Internship Not Found' });
    }
  })
);

export default internshipRouter;
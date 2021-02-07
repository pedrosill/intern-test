import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Internship from '../models/internshipModel.js';
import { isAdmin, isAuth, isInstitutionOrAdmin } from '../utilities.js';
import data from '../data.js'

const internshipRouter = express.Router();

internshipRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize =6;
    const page = Number(req.query.pageNumber) || 1;

    const name = req.query.name || '';
    const category = req.query.category || '';
    const institution = req.query.institution || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const institutionFilter = institution ? { institution}: {};
    const categoryFilter = category ? { category}: {};

    const count = await Internship.count({
      ...institutionFilter, 
      ...nameFilter,
      ...categoryFilter,
    });
    const internships = await Internship.find({
      ...institutionFilter, 
      ...nameFilter,
      ...categoryFilter,
    })
      .populate('institution', 'institution.name institution.logo')
      .skip(pageSize*(page - 1))
      .limit(pageSize)
      ;
    res.send({internships, page, pages: Math.ceil(count / pageSize)});
  })
);

internshipRouter.get(
  '/categories', 
  expressAsyncHandler(async(req, res) => {
    const categories = await Internship.find().distinct('category');
    res.send(categories);
  })
);

internshipRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Internship.remove({});
    const institution = await User.findOne({ isInstitution: true});
    if (institution) {
      const internships = data.internships.map((internship) => ({
        ...internship,
        institution: institution._id,
      }));
      const createdInternship = await Internship.insertMany(internships);
      res.send({ createdInternship });
    } else {
      res 
        .status(500)
        .send({ message: 'No institution found. first run /api/users/seed'});
    }
  })
);

internshipRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const internship = await Internship.findById(req.params.id).populate('institution', 'institution.name institution.logo ');
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
  isInstitutionOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const internship = new Internship({
      name: 'sample name ' + Date.now(),
      institution: req.user._id,
      image: 'https://internwebapp.s3.eu-central-1.amazonaws.com/IST.png',
      category: 'Tech',
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
  isInstitutionOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const internshipId = req.params.id;
    const internship = await Internship.findById(internshipId);
    if (internship) {
        internship.name = req.body.name;
        internship.image = req.body.image;
        internship.category = req.body.category;
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
  isInstitutionOrAdmin,
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
import fetch from 'node-fetch';
import { Dev } from '../models';

export const createDev = async (req, res) => {
  const { github_username, techs, coordinates } = req.body;
  try {
    const response = await (
      await fetch(`https://api.github.com/users/${github_username}`)
    ).json();

    const { name, avatar_url, bio } = response;

    const newDev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs,
      location: { coordinates }
    });
    res.status(201).json(newDev);
  } catch (error) {
    console.error(error);
    res.status(409).send(error.message);
  }
};

export const getAllDevs = async (req, res) => {
  const devs = await Dev.find();
  res.status(200).json(devs);
};

export const searchDevs = async (req, res) => {
  const { techs, lat, long } = req.query;

  try {
    const devs = await Dev.find({
      techs: { $in: techs },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat]
          },
          $maxDistance: 10000
        }
      }
    });
    res.json(devs);
  } catch (error) {
    res.send(error);
  }
};

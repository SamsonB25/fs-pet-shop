import pool from "../database/db.js";
import {
  addNewPet,
  getAllPets,
  getPetByID,
  removePet,
  changePet,
} from "./queries.js";

export const getPets = async (req, res) => {
  try {
    const results = await pool.query(getAllPets);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving pets from database" });
  }
};

export const getPet = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await pool.query(getPetByID, [id]);
    if (results.rows.length === 0) {
      res.status(404).json({ error: "Pet Not Found" });
      return;
    }
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving pet from database" });
  }
};

export const addPet = async (req, res) => {
  try {
    const { name, kind, age } = req.body;
    if (!name || !kind || !age) {
      res.status(404).json({ error: "name, kind, and age needed to add pet" });
      return;
    }
    const results = await pool.query(addNewPet, [name, kind, age]);

    res.status(201).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding pet database" });
  }
};

export const deletePet = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const results = await pool.query(removePet, [id]);
    if (results.rows.length === 0) {
      res.status(404).json({ error: "Pet Not Found" });
      return;
    }
    res.status(204).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding pet database" });
  }
};

export const updatePet = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { name, kind, age } = req.body;
    const pet = await pool.query(getPetByID, [id]);
    if (pet.rows.length === 0) {
      res.status(404).json({ error: "Pet Not Found" });
      return;
    }
    const updatedPet = {
      name: name || pet.rows[0].name,
      kind: kind || pet.rows[0].kind,
      age: age || pet.rows[0].age,
    };
    const results = await pool.query(changePet, [
      updatedPet.name,
      updatedPet.kind,
      updatedPet.age,
      id,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating pet in database" });
  }
};

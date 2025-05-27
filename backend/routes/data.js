const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');
;
;

// GET all data with optional filters as query params
router.get('/', async (req, res) => {
  try {
    const { pillar, year, population, violenceType, region, age } = req.query;
    // Build dynamic query with filters
    let query = 'SELECT * FROM pillar_data WHERE 1=1';
    let params = [];
    if (pillar) {
      params.push(pillar);
      query += ` AND pillar = $${params.length}`;
    }
    if (year) {
      params.push(Number(year));
      query += ` AND year = $${params.length}`;
    }
    if (population) {
      params.push(population);
      query += ` AND population = $${params.length}`;
    }
    if (violenceType) {
      params.push(violenceType);
      query += ` AND violence_type = $${params.length}`;
    }
    if (region) {
      params.push(region);
      query += ` AND region = $${params.length}`;
    }
    if (age) {
      params.push(age);
      query += ` AND age = $${params.length}`;
    }
    query += ' ORDER BY year DESC';
;
;

    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Error querying data', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
;
;

// POST create or update data (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { pillar, year, population, violenceType, region, age, value } = req.body;
;
;

    if (!pillar || !year || !population || !violenceType || !region || !age || value == null) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
;
;

    // Check existing record
    const checkQuery = `
      SELECT id FROM pillar_data WHERE 
      pillar=$1 AND year=$2 AND population=$3 AND violence_type=$4 AND region=$5 AND age=$6
    `;
    const { rows } = await db.query(checkQuery, [pillar, year, population, violenceType, region, age]);
;
;

    if (rows.length > 0) {
      // Update existing
      const updateQuery = `
        UPDATE pillar_data SET value=$1 WHERE id=$2
      `;
      await db.query(updateQuery, [value, rows[0].id]);
      res.json({ message: 'Dato actualizado correctamente' });
    } else {
      // Insert new
      const insertQuery = `
        INSERT INTO pillar_data (pillar, year, population, violence_type, region, age, value)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await db.query(insertQuery, [pillar, year, population, violenceType, region, age, value]);
      res.status(201).json({ message: 'Dato creado correctamente' });
    }
;
;

  } catch (err) {
    console.error('Error saving data', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
;
;

module.exports = router;

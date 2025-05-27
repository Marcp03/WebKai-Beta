const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// GET all data with optional filters as query params
router.get('/', async (req, res) => {
  try {
    const {
      pillar, year, population_type, violence_type, region, municipality,
      age_range, month, death_location, weapon_type, judicial_status,
      migration_country, migration_reason
    } = req.query;

    let query = 'SELECT * FROM observatory_data WHERE 1=1';
    const params = [];

    if (pillar) {
      params.push(pillar);
      query += ` AND pillar = $${params.length}`;
    }
    if (year) {
      params.push(Number(year));
      query += ` AND year = $${params.length}`;
    }
    if (population_type) {
      params.push(population_type);
      query += ` AND population_type = $${params.length}`;
    }
    if (violence_type) {
      params.push(violence_type);
      query += ` AND violence_type = $${params.length}`;
    }
    if (region) {
      params.push(region);
      query += ` AND region = $${params.length}`;
    }
    if (municipality) {
      params.push(municipality);
      query += ` AND municipality = $${params.length}`;
    }
    if (age_range) {
      params.push(age_range);
      query += ` AND age_range = $${params.length}`;
    }
    if (month) {
      params.push(month);
      query += ` AND month = $${params.length}`;
    }
    if (death_location) {
      params.push(death_location);
      query += ` AND death_location = $${params.length}`;
    }
    if (weapon_type) {
      params.push(weapon_type);
      query += ` AND weapon_type = $${params.length}`;
    }
    if (judicial_status) {
      params.push(judicial_status);
      query += ` AND judicial_status = $${params.length}`;
    }
    if (migration_country) {
      params.push(migration_country);
      query += ` AND migration_country = $${params.length}`;
    }
    if (migration_reason) {
      params.push(migration_reason);
      query += ` AND migration_reason = $${params.length}`;
    }

    query += ' ORDER BY year DESC';

    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Error querying data', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST create new data (protected)
router.post('/', authenticateToken, async (req, res) => {
  const {
    pillar, year, population_type, violence_type,
    region, municipality, age_range, value, month,
    death_location, weapon_type, judicial_status,
    migration_country, migration_reason
  } = req.body;

  // Validación básica
  if (
    !pillar || !year || !population_type || !violence_type ||
    !region || !municipality || !age_range || value == null ||
    !month
  ) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados' });
  }

  try {
    const result = await db.query(
      `INSERT INTO observatory_data (
        pillar, year, population_type, violence_type,
        region, municipality, age_range, value, month,
        death_location, weapon_type, judicial_status,
        migration_country, migration_reason
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
      ) RETURNING *`,
      [
        pillar, year, population_type, violence_type,
        region, municipality, age_range, value, month,
        death_location, weapon_type, judicial_status,
        migration_country, migration_reason
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving data', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;

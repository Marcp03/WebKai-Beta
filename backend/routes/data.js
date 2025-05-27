const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// GET /api/data?pillar=&year=&region=&age_range=&...
router.get('/', async (req, res) => {
  try {
    const {
      pillar,
      year,
      population_type,
      region,
      municipality,
      age_range,
      violence_type,
      month
    } = req.query;

    const filters = [];
    const values = [];

    if (pillar) {
      filters.push(`pillar = $${filters.length + 1}`);
      values.push(pillar);
    }

    if (year) {
      filters.push(`year = $${filters.length + 1}`);
      values.push(year);
    }

    if (population_type) {
      filters.push(`population_type ILIKE $${filters.length + 1}`);
      values.push(`%${population_type}%`);
    }

    if (region) {
      filters.push(`region ILIKE $${filters.length + 1}`);
      values.push(`%${region}%`);
    }

    if (municipality) {
      filters.push(`municipality ILIKE $${filters.length + 1}`);
      values.push(`%${municipality}%`);
    }

    if (age_range) {
      filters.push(`age_range = $${filters.length + 1}`);
      values.push(age_range);
    }

    if (violence_type) {
      filters.push(`violence_type ILIKE $${filters.length + 1}`);
      values.push(`%${violence_type}%`);
    }

    if (month) {
      filters.push(`month ILIKE $${filters.length + 1}`);
      values.push(`%${month}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const result = await pool.query(
      `SELECT * FROM observatory_data ${whereClause} ORDER BY year DESC, created_at DESC`,
      values
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos filtrados:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
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


const pool = require('../database');
require('dotenv').config();

exports.getData10LT = async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    try {
      const [data] = await connection.execute(`
        SELECT
          s.submission_time,
          i.visual_inspection,
          i.seam_inspection,
          md.operator,
          md.line,
          md.shift,
          m.weight,
          m.height,
          m.minimum_wall_thickness,
          pd.check_type,
          pd.product_size,
          pd.cavity
        FROM
          submission s
          INNER JOIN inspection i ON s.id = i.submission_id
          INNER JOIN machine_details md ON s.id = md.submission_id
          INNER JOIN measurement m ON s.id = m.submission_id
          INNER JOIN product_details pd ON s.id = pd.submission_id
        WHERE
          pd.product_size = '10LT'
      `);

      const result = data.map((row) => ({
        submission_time: row.submission_time,
        visual_inspection: row.visual_inspection,
        seam_inspection: row.seam_inspection,
        shift: row.shift,
        operator: row.operator,
        line: row.line,
        weight: row.weight,
        height: row.height,
        minimum_wall_thickness: row.minimum_wall_thickness,
        check_type: row.check_type,
        product_size: row.product_size,
        cavity: row.cavity,
      }));

      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: 'Server Error' });
  }
};

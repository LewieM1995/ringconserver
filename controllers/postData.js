const pool = require('../database');
require('dotenv').config();

exports.postData = async (req, res) => {
    let connection;
  
    try {
      const { shiftValue, operatorName, lineValue, typeCheck, selectedSize, selectCavity, inspectionValue, seamInspection, weight, height, minWallThickness } = req.body;
  
      console.log("Received Data", req.body);
  
      // Get a connection from the MySQL pool
      connection = await pool.getConnection();
      console.log(connection);
  
      try {
        // Start a transaction
        if (connection){
        await connection.beginTransaction();
        }
  
        // Create a new batch by executing individual INSERT statements
        await connection.query('INSERT INTO inspection (visual_inspection, seam_inspection) VALUES (?, ?)', [inspectionValue, seamInspection]);
        await connection.query('INSERT INTO machine_details (shift, operator, line) VALUES (?, ?, ?)', [shiftValue, operatorName, lineValue]);
        await connection.query('INSERT INTO measurement (weight, height, minimum_wall_thickness) VALUES (?, ?, ?)', [weight, height, minWallThickness]);
        await connection.query('INSERT INTO product_details (check_type, product_size, cavity) VALUES (?, ?, ?)', [typeCheck, selectedSize, selectCavity]);
  
        // Commit the transaction
        await connection.commit();
  
        res.status(201).json({ message: 'Data Saved to SQL' });
      } catch (error) {
        // Rollback the transaction in case of an error
        if (connection){
        await connection.rollback();
        }
  
        throw error; // Re-throw the error to be handled in the catch block
      } finally {
        // Release the connection back to the pool
        if (connection) {
          connection.release();
        }
      }
    } catch (error) {
      console.error(error);
  
      res.status(500).json({ error: 'Server error'});
    }
  };
  
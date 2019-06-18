const dotenv = require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.DB_PWD,
	port: process.env.DB_PORT
});

const getCompanies = (request, response) => {
	pool.query('SELECT * FROM companies ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getCompanyById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM companies WHERE id = $1', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};
// Create company
const createCompany = (request, response) => {
	const { name, about, address, website, phone } = request.body;

	pool.query(
		'INSERT INTO companies (name, about, address, website, phone) VALUES ($1, $2, $3, $4, $5)',
		[ name, about, address, website, phone ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`success ${results.row}`);
		}
	);
};

// const createCompany = (request, response) => {
// 	const { name } = request.body;

// 	pool.query('INSERT INTO companies (name) VALUES ($1)', [ name ], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(201).send(`Company added with name: ${results.name}`);
// 	});
// 	// pool.query(
// 	// 	'INSERT INTO companies (name, bio, address, website, phone) VALUES ($1, $2, $3, $4, $5)',
// 	// 	[ name, bio, address, website, phone ],
// 	// 	(error, results) => {
// 	// 		if (error) {
// 	// 			throw error;
// 	// 		}
// 	// 		response.status(201).send(`Company added with ID: ${result.insertId}`);
// 	// 	}
// 	// );
// };

const updateCompany = (request, response) => {
	const id = parseInt(request.params.id);
	const { name, bio, address, website, phone } = request.body;

	pool.query(
		'UPDATE companies SET name = $1, email = $2 WHERE id = $3',
		[ name, bio, address, website, phone, id ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		}
	);
};

const deleteCompany = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('DELETE FROM companies WHERE id = $1', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Company deleted with ID: ${id}`);
	});
};

module.exports = {
	getCompanies,
	getCompanyById,
	createCompany,
	updateCompany,
	deleteCompany
};

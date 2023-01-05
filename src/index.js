const express = require('express')
const walletRoutes= require('./wallet/wallet.route')
require('dotenv').config()
// const knexConfig = require('./db/knexfile');
require('./connection')

//initialize knex
// const knex = require('knex')(knexConfig[process.env.NODE_ENV])


const app = express()
// app.use(cors());
app.use(express.json());

app.use('/api', walletRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));

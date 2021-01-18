import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get('/status', (req, res) => res.send('Operational: ' + Date()))

app.listen(PORT, () => console.log('Started on port', PORT))

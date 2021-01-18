import express from 'express'
import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => res.send('You just made an API call to the API API 🤯'))
app.get('/status', (req, res) => res.send('Operational: ' + Date()))

app.get('/init', (req, res) => {
    try {
        const prisma = new PrismaClient()

        prisma.api.create({
            data: {
                name: 'Space X API',
                description: 'The Space X API',
                documentation: 'https://docs.spacexdata.com/',
                creator_id: 'theswerd'
            }
        }).catch((error: any) => {
            res.status(400).send(error)
        }).then((dbRes: any) => {
            res.status(200).send(dbRes)
        })
    } catch (error) {
        res.status(401).send(error)
    }
})
app.listen(PORT, () => console.log('Started on port', PORT))

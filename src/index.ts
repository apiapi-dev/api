import express from 'express'
import * as dotenv from 'dotenv'
import { PrismaClient, Prisma } from '@prisma/client'

import fetch from 'node-fetch'

dotenv.config()

const PORT = process.env.PORT

const app = express()
const prisma = new PrismaClient()

app.get('/', (req, res) => res.send('You just made an API call to the API API 🤯'))
app.get('/status', (req, res) => res.send('Operational: ' + Date()))
app.get('/db', (req, res) => res.send(process.env.DATABASE_URL))

app.post('/api', (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(400).send('No Authorization Header - No Dice 🚫🎲')
    } else {
        fetch('https://api.github.com/user', {
            headers: {
                Authorization: req.headers.authorization,
                Accept: 'application/vnd.github.v3+json'
            }
        }).then(async (dbRes): Promise<void> => {
            if (dbRes.status !== 200) {
                const user = await dbRes.json()
                const creatorId: string = user.login

                const name: string = req.body.name
                const description: string = req.body.description
                const homepage: string = req.body.homepage
                const documentation: string = req.body.documentation

                const data = await prisma.api.create({
                    data: {
                        name,
                        description,
                        homepage,
                        documentation,
                        creator_id: creatorId,
                    }
                })

                res.send(data)

                // const name: string = user.name
                // const bio: string =  user.bio
            } else {
                res.status(401).send('Failed to Authenticate with Github')
            }

        }).catch((e) => {
            res.status(401).send(e)
        })
    }
})

app.get('/api/:apiid', async (req, res) => {
    const api = await prisma.api.findFirst({
        where: {
            id: parseInt(req.params.apiid, 10)
        }
    })
    res.send(api)
})

app.get('/apis', async (req, res) => {
    const api = await prisma.api.findMany()

    res.send(api)
})

app.listen(PORT, () => console.log('Started on port', PORT))

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ExcelJS = require('exceljs')
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri =
    'mongodb+srv://matrix:matrix2023@cluster0.cqiibmk.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
})

;(async function () {
    try {
        await client.connect()
        const db = client.db('hackathon-ideas')
        console.log('Connected to Database')

        initServices(db)
        // client.close();
    } catch (e) {
        console.error(e)
    }
})()

const initServices = (db) => {
    const app = express()
    // const hostname = process.env.HOST_NAME || 'localhost'
    const port = process.env.PORT || 5000
    app.listen(port, function () {
        console.log(`Server running at port: ${port}`)
    })

    app.use(bodyParser.json())
    // app.use(
    //     bodyParser.urlencoded({
    //         extended: true,
    //     })
    // )
    app.use(
        cors({
            origin: '*',
        })
    )

    const ideaCollection = db.collection('idea-collection')
    const configCollection = db.collection('config')

    app.get('/', (req, res) => {
        res.type('html')
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/getConfig', (req, res) => {
        const cursor = configCollection
            .find()
            .toArray()
            .then((results) => {
                if (results && results.length) {
                    delete results[0]?.adminPin
                    res.type('application/json')
                    res.status(200).send(JSON.stringify(results[0]))
                } else {
                    res.type('application/json')
                    res.status(400).send(
                        JSON.stringify({ error: 'Error while fetching config' })
                    )
                }
            })
            .catch((error) => console.error(error))
    })

    app.post('/validateAdmin', (req, res) => {
        const payload = req.body
        const reqAdminPin = payload.adminPin
        const cursor = configCollection
            .find()
            .toArray()
            .then((results) => {
                if (results && results.length) {
                    const adminPin = results[0]?.adminPin
                    if (reqAdminPin === adminPin) {
                        res.type('application/json')
                        res.status(200).send(
                            JSON.stringify({
                                success: 'Authentication successful',
                            })
                        )
                    } else {
                        res.type('application/json')
                        res.status(400).send(
                            JSON.stringify({ error: 'Authentication error' })
                        )
                    }
                } else {
                    res.type('application/json')
                    res.status(400).send(
                        JSON.stringify({ error: 'Authentication error' })
                    )
                }
            })
            .catch((error) => {
                console.error(error)
                res.type('application/json')
                res.status(400).send(
                    JSON.stringify({ error: 'Authentication error' })
                )
            })
    })

    app.get('/getIdeas', (req, res) => {
        const cursor = ideaCollection
            .find()
            .toArray()
            .then((results) => {
                res.type('application/json')
                res.status(200).send(JSON.stringify(results))
            })
            .catch((error) => console.error(error))
    })

    app.post('/submitIdea', (req, res) => {
        const payload = req.body
        const teamId = payload.teamName.replace(/\s/g, '').toLowerCase()
        payload.teamId = teamId
        payload.timeStamp = moment().toString()
        payload.status = 'New'

        const cursor = ideaCollection
            .insertOne(payload)
            .then(() => {
                res.type('application/json')
                res.status(200).send(
                    JSON.stringify({ success: 'successfully posted' })
                )
            })
            .catch((error) => {
                console.error(error)
                res.type('application/json')
                res.status(400).send(
                    JSON.stringify({ error: 'Error while submitting the idea' })
                )
            })
    })

    // Excel file generation function
    async function generateExcelData() {
        try {
            // Fetch data from MongoDB (e.g., all documents in the collection)
            const data = await ideaCollection.find({}).toArray()

            // Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Registration-Data')

            // Define Excel headers

            worksheet.columns = [
                { header: 'Team Id', key: 'teamId', width: 30 },
                { header: 'Team Name', key: 'teamName', width: 25 },
                {
                    header: 'First Member Name',
                    key: '1_member_name',
                    width: 40,
                },
                {
                    header: 'First Member Email',
                    key: '1_member_email',
                    width: 40,
                },
                {
                    header: 'First Member Tshirt',
                    key: '1_member_tshirt',
                    width: 40,
                },
                {
                    header: 'Second Member Name',
                    key: '2_member_name',
                    width: 40,
                },
                {
                    header: 'Second Member Email',
                    key: '2_member_email',
                    width: 40,
                },
                {
                    header: 'SecondMember Tshirt',
                    key: '2_member_tshirt',
                    width: 40,
                },
                {
                    header: 'Third Member Name',
                    key: '3_member_name',
                    width: 40,
                },
                {
                    header: 'Third Member Email',
                    key: '3_member_email',
                    width: 40,
                },
                {
                    header: 'Third Member Tshirt',
                    key: '3_member_tshirt',
                    width: 40,
                },
                {
                    header: 'Fourth Member Name',
                    key: '4_member_name',
                    width: 40,
                },
                {
                    header: 'Fourth Member Email',
                    key: '4_member_email',
                    width: 40,
                },
                {
                    header: 'Fourth Member Tshirt',
                    key: '4_member_tshirt',
                    width: 40,
                },
                {
                    header: 'Fifth Member Name',
                    key: '5_member_name',
                    width: 40,
                },
                {
                    header: 'Fifth Member Email',
                    key: '5_member_email',
                    width: 40,
                },
                {
                    header: 'Fifth Member Tshirt',
                    key: '5_member_tshirt',
                    width: 40,
                },
                { header: 'Category Id', key: 'category_id', width: 40 },
                { header: 'Category Label', key: 'category_label', width: 40 },
                { header: 'Problem', key: 'problem', width: 40 },
                { header: 'Solution', key: 'solution', width: 40 },
                { header: 'Benefits', key: 'benefits', width: 40 },
                { header: 'Mode', key: 'mode', width: 15 },
                { header: 'Time Stamp', key: 'timeStamp', width: 40 },
            ]

            // Add data to the worksheet
            data.forEach((item) => {
                var count = 1
                item.members.forEach((member) => {
                    item[count + '_member_name'] = member.name
                    item[count + '_member_email'] = member.email
                    item[count + '_member_tshirt'] = member.tshirt
                    count++
                })

                item.category_id = item.category.id
                item.category_label = item.category.label

                worksheet.addRow(item)
            })

            // Create a buffer for the Excel file
            const buffer = await workbook.xlsx.writeBuffer()

            return buffer
        } catch (error) {
            console.error('Error generating Excel data:', error)
            throw error
        }
    }

    app.get('/download-excel', async (req, res) => {
        const reqAdminPin = req.query.pin
        const cursor = configCollection
            .find()
            .toArray()
            .then(async (results) => {
                if (results && results.length) {
                    const adminPin = results[0]?.adminPin
                    if (reqAdminPin === adminPin) {
                        try {
                            // Generate Excel data
                            const excelBuffer = await generateExcelData()

                            // Set headers for the response
                            res.setHeader(
                                'Content-Type',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            )
                            res.setHeader(
                                'Content-Disposition',
                                'attachment; filename=Team Registrations.xlsx'
                            )

                            // Send the Excel file as a response
                            res.send(excelBuffer)
                        } catch (error) {
                            console.error(
                                'Error downloading Excel data:',
                                error
                            )
                            res.status(500).json({
                                error: 'Internal Server Error',
                            })
                        }
                    } else {
                        res.type('application/json')
                        res.status(400).send(
                            JSON.stringify({ error: 'Authentication error' })
                        )
                    }
                } else {
                    res.type('application/json')
                    res.status(400).send(
                        JSON.stringify({ error: 'Authentication error' })
                    )
                }
            })
            .catch((error) => {
                console.error(error)
                res.type('application/json')
                res.status(400).send(
                    JSON.stringify({ error: 'Authentication error' })
                )
            })
    })

    // Define a route to update data in MongoDB
    app.put('/updateIdeaStatus', async (req, res) => {
        try {
            const id = req.body._id
            delete req.body._id
            const updateData = req.body

            // Update the document with the provided ID
            const result = await ideaCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            )

            if (result.modifiedCount === 1) {
                return res.json({ message: 'Document updated successfully' })
            } else {
                return res
                    .status(404)
                    .json({ error: 'Error - Document not found' })
            }
        } catch (error) {
            console.error('Error updating data:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })
}

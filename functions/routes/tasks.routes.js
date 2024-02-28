const { Router } = require('express')
const { addNewTask, getTaskById, getAllTasks, deleteTask, updateTask, getTasksByStatus } = require('../controllers/task.controller')
const router = Router()

const admin = require('firebase-admin')
const db = admin.firestore()

router.post('/', addNewTask)
router.get('/:taskId', getTaskById)
router.get('/', getAllTasks)
router.get('/status/:status', getTasksByStatus)
router.delete('/:taskId', deleteTask)
router.put('/:taskId', updateTask)

module.exports = router
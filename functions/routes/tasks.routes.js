const { Router } = require('express')
const { addNewTask, getTaskById, getAllTasks, deleteTask, updateTask } = require('../controllers/task.controller')
const router = Router()

const admin = require('firebase-admin')
const db = admin.firestore()

router.post('/', addNewTask)
router.get('/:taskId', getTaskById)
router.get('/', getAllTasks)
router.delete('/:taskId', deleteTask)
router.put('/:taskId', updateTask)

module.exports = router
const TaskService = require('./../services/task.service')

const service = new TaskService

const addNewTask = async (req, res) => {
    try {
        const name = req.body.name
        const status = req.body.status
    
    if (!name || typeof name !== 'string' || !status || typeof status !== 'number') {
        throw new Error('Los campos nombre y estado son requeridos');
    } else {
        await service.createTask(name, status)
        res.status(204).json()
    }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const data = await service.taskById(taskId)
        
        res.status(200).json(data)
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const getAllTasks = async (req, res) => {
    try {
        const data = await service.getAllTasks()
        res.status(200).json(data)
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        await service.deleteTask(taskId)

        res.status(204).json()
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const data = req.body

        await service.updateTask(taskId, data)

        res.status(200).json({data})
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    addNewTask,
    getTaskById,
    getAllTasks,
    deleteTask,
    updateTask
}
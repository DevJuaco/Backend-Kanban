const admin = require('firebase-admin')
const db = admin.firestore()
class TaskService {
    
    async createTask (name, status) {
        return await db.collection('tasks').doc().create({name, status})
    }

    async taskById (taskId) {
        const doc = await db.collection('tasks').doc(taskId).get()
        return {
            id: doc.id,
            ...doc.data()
        }
    }

    async getAllTasks () {
        const snapshot = await db.collection('tasks').get()
        const query = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return query
    }

    async deleteTask (taskId) {
        await db.collection('tasks').doc(taskId).delete()
    }

    async updateTask (taskId, data) {
        await db.collection('tasks').doc(taskId).update(data)
    }

    async getTasksByStatus (status) {
       const snapshot = await db.collection('tasks').where('status', '==', parseInt(status)).get()
       const query = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return query
    }

}

module.exports = TaskService
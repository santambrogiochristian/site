import clientPromise from ".";

let client
let db
let tasks

async function init() {
    if(db) return
    try {
        client = await clientPromise
        db = await client.db()
        tasks = await db.collection('tasks')
    } catch (error) {
        throw new Error(`Failed to stablish connection to database: ${error.message}`)
    }
}

;(async () => {
    await init()
})()

export async function getTasks() {
    try {
        if (!tasks) await init()
        const result = await tasks
            .find({})
            .toArray()

        return {tasks: result}
    } catch (error) {
        return { error: `Failed to fetch tasks: ${error.message}` }
    }
}
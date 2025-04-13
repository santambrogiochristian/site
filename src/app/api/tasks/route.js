import { getTasks } from '@lib/mongo/tasks'

export async function GET() {
    try {

        const { tasks, error } = await getTasks()
        if (error) throw new Error(`Error: ${error.message}`)

        return new Response(
            JSON.stringify({ tasks }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {

        return new Response(
            JSON.stringify({ error: error.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}

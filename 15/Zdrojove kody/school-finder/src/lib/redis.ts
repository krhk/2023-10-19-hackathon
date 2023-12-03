import { env } from '$env/dynamic/private';
import { createClient } from 'redis';

const client = createClient({
	url: env.REDIS_URL ?? 'redis://localhost:6379'
});

export async function getClient(): Promise<typeof client> {
	if (!client.isOpen) {
		await client.connect();

		const pingResult = await client.ping();

		if (pingResult === 'PONG') {
			console.log('Redis is connected');
		} else {
			console.log('Redis is not connected');
		}
	}

	return client;
}

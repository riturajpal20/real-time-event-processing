import asyncio
import websockets


async def client():

    uri = "ws://127.0.0.1:8000/ws"

    async with websockets.connect(uri) as websocket:

        while True:
            await websocket.recv()


async def main():

    tasks = []

    for _ in range(200):
        tasks.append(asyncio.create_task(client()))

    await asyncio.gather(*tasks)


asyncio.run(main())
from fastapi import FastAPI, WebSocket
import asyncio

from event_generator import event_producer
from workers import start_workers
from websocket_manager import manager, metrics_stream
from config import WORKER_COUNT
from calculate_event_generation import calculate_event_rate

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Real-time event processing server is running"}


@app.on_event("startup")
async def startup():

    asyncio.create_task(event_producer())

    await start_workers(WORKER_COUNT)

    asyncio.create_task(metrics_stream())

    asyncio.create_task(calculate_event_rate())


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except:
        manager.disconnect(websocket)
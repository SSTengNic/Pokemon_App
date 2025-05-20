from fastapi import FastAPI
from routes.routes import router  # your endpoints


app = FastAPI() #Initializes the FastAPI application

app.include_router(router)

MAX_RETRIES = 10

def create_db_with_retry():
    for attempt in range(MAX_RETRIES):
        try:
            SQLModel.metadata.create_all(engine)
            print("✅ Connected to the database and created tables.")
            break
        except OperationalError as e:
            print(f"❌ Attempt {attempt+1}/{MAX_RETRIES} - Database not ready. Retrying...")
            time.sleep(2)
    else:
        raise RuntimeError("❌ Failed to connect to the database after several attempts.")

# Then in 
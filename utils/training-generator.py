import json
from datetime import datetime, timedelta
import uuid
import random
random.seed(5)


# Define the start and end dates
start_date = datetime(2023, 2, 1)
end_date = datetime(2024, 10, 31, 23, 59, 59)

# Helper function to generate random timestamps
def generate_training_sessions(start_date, end_date, num_sessions):
    sessions = []
    current_date = start_date

    for i in range(num_sessions):
        if random.random() > 0.5:
          session_start_time = current_date + timedelta(days=i)  # Spread sessions every 10 days
          session_end_time = session_start_time + timedelta(hours=1)  # Sessions last 1 hour

          session = {
              "name": f"Training Session {i+1}",
              "exercises": [],
              "startTime": int(session_start_time.timestamp() * 1000),  # Convert to milliseconds
              "finishTime": int(session_end_time.timestamp() * 1000),  # Convert to milliseconds
              "id": str(uuid.uuid4())  # Generate a unique ID
          }

          sessions.append(session)

    return sessions

# Generate training sessions
num_sessions = 500  # Example number of sessions
training_sessions = generate_training_sessions(start_date, end_date, num_sessions)

# Convert the list to JSON
json_content = json.dumps(training_sessions, indent=4)

# Define the file path
file_path = 'training_sessions.json'

# Save the JSON content to the file
with open(file_path, 'w') as file:
    file.write(json_content)

print(json_content)


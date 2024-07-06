from kafka import KafkaConsumer
import json

# Initialize Kafka Consumer
consumer = KafkaConsumer(
    'player-actions',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Process messages from Kafka
for message in consumer:
    action = message.value
    print(f"Received action: {action}")
    # Process the action (e.g., store in database, trigger other services)

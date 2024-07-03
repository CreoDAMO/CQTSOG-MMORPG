from pyspark.sql import SparkSession

# Initialize Spark session
spark = SparkSession.builder.appName('CryptoQuestDataLakehouse').getOrCreate()

# Read raw data from Kafka
raw_data = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "player-actions") \
    .load()

# Process data and write to Delta Lake
raw_data \
    .writeStream \
    .format("delta") \
    .option("checkpointLocation", "/tmp/checkpoints") \
    .start("/path/to/delta-lake")

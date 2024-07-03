from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('CryptoQuestAnalytics').getOrCreate()

# Read data from Delta Lake
player_data = spark.read.format("delta").load("/path/to/delta-lake")

# Aggregate data
aggregated_data = player_data.groupBy("player_id").agg(count("action").alias("action_count"))

# Write aggregated data to Snowflake
aggregated_data.write.format("snowflake").options(
    url="jdbc:snowflake://your_account.snowflakecomputing.com",
    user="your_user",
    password="your_password",
    db="your_db",
    schema="your_schema"
).save()

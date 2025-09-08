import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import { KafkaConfig } from "../interfaces/interfaces";
dotenv.config();

export const CLIENT_ID = process.env.KAFKA_CLIENT_ID;
export const GROUP_ID = process.env.KAFKA_GROUP_ID;
export const BROKERS = process.env.KAFKA_BROKERS?.split(",").map(b => b.trim()) ?? [];

if (!BROKERS.length) {
  throw new Error("Kafka brokers are required and must be a comma-separated string.");
}

if (!CLIENT_ID) {
  throw new Error("Kafka client ID is required.");
}

const kafkaConfig: KafkaConfig= {
  clientId: CLIENT_ID,
  brokers: BROKERS,
};

const kafka = new Kafka(kafkaConfig);

export { kafka };

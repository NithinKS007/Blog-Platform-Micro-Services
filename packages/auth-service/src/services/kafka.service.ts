import { injectable } from "inversify";
import {
  IMessageService,
  MessageHandler,
  PublishMessageParams,
} from "../interfaces/interfaces";
import {
  Consumer,
  EachMessagePayload,
  Producer,
  ProducerRecord,
  Message,
} from "kafkajs";

@injectable()
export class KafkaService implements IMessageService {
  constructor(
    private readonly producer: Producer,
    private readonly consumer: Consumer
  ) {}
  async connectProducer(): Promise<void> {
    await this.producer.connect();
  }
  async connectConsumer(): Promise<void> {
    await this.consumer.connect();
  }

  async publishMessage<T>(params: PublishMessageParams<T>): Promise<void> {
    const { topic, message } = params;
    const payload: Message = {
      value: JSON.stringify(message),
    };
    const record: ProducerRecord = {
      topic,
      messages: [payload],
    };

    await this.producer.send(record);
  }

  async consumeMessages<T>(
    topic: string,
    groupId: string,
    handler: MessageHandler<T>
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          if (!message?.value) {
            console.warn("Kafka message value is empty or null.");
            return;
          }
          const parsed: T = JSON.parse(message?.value.toString());
          await handler(parsed);
        } catch (err) {
          console.error(
            `[Kafka Consumer] Error processing message on topic "${topic}" [partition ${partition}]`,
            err
          );
        }
      },
    });
  }
}

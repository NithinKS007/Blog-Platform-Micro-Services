
export interface KafkaConfig {
  clientId: string;
  brokers: string[];
}

export interface PublishMessageParams<T> {
  topic: string;
  message: T;
}

export interface MessageHandler<T> {
  (payload: T): Promise<void> | void;
}

export interface IMessageService {
  consumeMessages<T>(topic: string, handler: MessageHandler<T>): Promise<void>;
  publishMessage<T>(params: PublishMessageParams<T>): Promise<void>;
  connectProducer(): Promise<void>;
  connectConsumer(): Promise<void>;
}

export interface IBaseController {
  handle(request: Request, response: Response): Promise<void>;
}

export interface IUserService {
    signUp(data: { name: string; email: string; password: string }): Promise<void>
     signIn(data: { email: string; password: string }): Promise<void>
}
import { container } from "./container";
import { IMessageService } from "./file-imports.index";
import { TYPES } from "./types";

export const MessageService = container.get<IMessageService>(TYPES.MessageService);

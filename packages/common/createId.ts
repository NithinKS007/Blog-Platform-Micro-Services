import { v4 as uuidv4, v4 } from "uuid";

export const createId = () => {
  return {
    randomId: uuidv4(),
  };
};

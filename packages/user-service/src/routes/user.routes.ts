import { Router } from "express";

const routerV1 = Router();

routerV1.post("/v1/signin");
routerV1.post("/v1/signup");
routerV1.post("/v1/signout");
routerV1.post("/v1/refresh-token");

export { routerV1 };

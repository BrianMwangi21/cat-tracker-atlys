import redis from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";

export default async(req, res) => {
  if (!req.body) {
    return res.status(400).send("Body cannot be empty");
  }

  const id = uuidv4();
  const cart = {
    id: id,
    name: req.body.name,
    color: req.body.color,
    timeZone: req.body.timeZone,
  };

  let response = await redis.hset("cart", id, JSON.stringify(cart));
  return res.status(200).json(response);
};

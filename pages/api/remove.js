import redis from "../../lib/redis";

export default async(req, res) => {
  if(!req.query.id) {
    return res.status(400).send("Cart item id parameter required");
  }

  let response = await redis.hdel('cart', req.query.id);
  return res.status(200).json(response);
}

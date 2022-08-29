import redis from "../../lib/redis";

export default async(req, res) => {
  let response = await redis.hvals('cart');
  return res.status(200).json(response);
}

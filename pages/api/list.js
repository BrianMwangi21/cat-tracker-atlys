export default async(req, res) => {
  const token = "AXf1ASQgMjZjNDBjZmMtYjUwZi00MmViLWJkOWYtZmEyYmFjMTA0ODgyMWIxNzYxZmYxNmFhNDFhMjkyOGNhZjBmMTk0M2IwMzc=";
  const url = "https://eu2-mature-locust-30709.upstash.io/lrange/cart/0/100?_token=" + token;

  return fetch(url)
          .then(response => response.json())
          .then(data => {
            let result = JSON.stringify(data.result);
            return res.status(200).json(result);
          })
}

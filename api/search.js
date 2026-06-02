export default async function handler(req, res) {

  try {

    const { query } = req.query

    const response = await fetch(
      `https://saavn.sumit.co/api/search?query=${encodeURIComponent(query)}&limit=50&type=song`
    )

    const data = await response.json()

    res.status(200).json(data)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
}
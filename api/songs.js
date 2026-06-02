export default async function handler(req, res) {

  try {

    const { language } = req.query

    const response = await fetch(
      `https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0&languages=${language}`
    )

    const data = await response.json()

    res.status(200).json(data)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
}
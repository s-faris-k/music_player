export default async function handler(req, res) {

  try {

    const { language } = req.query

    if (!language) {
      return res.status(400).json({ error: 'language query parameter is required' })
    }

    const url = `https://corsproxy.io/?https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0&languages=${encodeURIComponent(language)}`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('JioSaavn fetch failed', response.status, text)
      return res.status(502).json({
        error: `Failed to fetch songs from JioSaavn (${response.status})`,
        details: text.slice(0, 1000),
      })
    }

    const text = await response.text()
    let data

    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error('Failed to parse JioSaavn response', parseError, text.slice(0, 1000))
      return res.status(502).json({
        error: 'Invalid JSON received from JioSaavn',
        details: text.slice(0, 1000),
      })
    }

    res.status(200).json(data)

  } catch (error) {

    console.error('API handler error', error)
    res.status(500).json({
      error: error.message || 'Internal server error'
    })
  }
}
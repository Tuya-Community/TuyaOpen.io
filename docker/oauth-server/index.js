/**
 * Decap CMS GitHub OAuth Server
 *
 * Handles the GitHub OAuth flow for Decap CMS when self-hosting (no Netlify).
 * - GET /oauth/auth    → Redirects user to GitHub authorization page
 * - GET /oauth/callback → Exchanges code for token, sends it back to CMS via postMessage
 */

const express = require('express')
const crypto = require('crypto')

const app = express()
app.set('trust proxy', true)
const PORT = process.env.OAUTH_PORT || 9060

// GitHub OAuth App credentials
const CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23li0MAyFEPdgrMMwm'
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || ''

if (!CLIENT_SECRET) {
  console.error('❌ GITHUB_CLIENT_SECRET environment variable is required!')
  process.exit(1)
}

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const SCOPES = 'repo,user'

// Store state tokens to prevent CSRF
const stateTokens = new Map()

// Clean up expired state tokens every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, value] of stateTokens) {
      if (now - value.created > 10 * 60 * 1000) {
        stateTokens.delete(key)
      }
    }
  },
  5 * 60 * 1000,
)

/**
 * Step 1: Redirect to GitHub authorization
 */
app.get('/oauth/auth', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex')
  stateTokens.set(state, { created: Date.now() })

  // Build redirect_uri from the incoming request (trust proxy must be enabled)
  const protocol = req.protocol // 'https' when trust proxy is set and X-Forwarded-Proto is sent
  const host = req.get('host')
  const redirectUri = `${protocol}://${host}/oauth/callback`

  console.log(`[OAuth] Auth request - redirecting to GitHub (redirect_uri: ${redirectUri})`)

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    scope: SCOPES,
    state: state,
  })

  res.redirect(`${GITHUB_AUTH_URL}?${params.toString()}`)
})

/**
 * Step 2: Handle the callback from GitHub, exchange code for token
 *
 * Also handles the case where Decap CMS opens the popup directly to /oauth/callback
 * with ?provider=github&site_id=...&scope=repo (no code/state). In that case,
 * redirect to the proper auth flow.
 */
app.get('/oauth/callback', async (req, res) => {
  const { code, state } = req.query

  // If there's no code, this is likely Decap CMS opening the popup directly
  // (old auth_endpoint config). Redirect to the proper auth flow.
  if (!code) {
    console.log('[OAuth] Callback hit without code - redirecting to /oauth/auth')
    return res.redirect('/oauth/auth')
  }

  // Validate state to prevent CSRF
  if (!state || !stateTokens.has(state)) {
    console.log('[OAuth] Invalid state parameter received')
    return res.status(403).send('Invalid state parameter. Please try logging in again.')
  }
  stateTokens.delete(state)

  try {
    // Exchange code for access token
    const response = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return res.status(400).send(`
        <html><body>
          <h1>Authorization Error</h1>
          <p>${data.error_description || data.error}</p>
          <p><a href="/admin/">Back to CMS</a></p>
        </body></html>
      `)
    }

    // Send the token back to the CMS via postMessage
    const content = JSON.stringify({
      token: data.access_token,
      provider: 'github',
    })

    res.send(`
      <html>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("receiveMessage %o", e);
                // send message to main window with the token
                window.opener.postMessage(
                  'authorization:github:success:${content}',
                  e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
              }
              window.addEventListener("message", receiveMessage, false);
              // Tell the opener we're ready
              window.opener.postMessage("authorizing:github", "*");
            })()
          </script>
        </body>
      </html>
    `)
  } catch (error) {
    console.error('OAuth token exchange error:', error)
    res.status(500).send(`
      <html><body>
        <h1>Server Error</h1>
        <p>Failed to complete authentication. Please try again.</p>
        <p><a href="/admin/">Back to CMS</a></p>
      </body></html>
    `)
  }
})

// Health check
app.get('/oauth/health', (req, res) => {
  res.json({ status: 'ok', service: 'decap-cms-oauth' })
})

app.listen(PORT, () => {
  console.log(`✅ Decap CMS OAuth server running on port ${PORT}`)
  console.log(`   Auth endpoint: /oauth/auth`)
  console.log(`   Callback endpoint: /oauth/callback`)
})

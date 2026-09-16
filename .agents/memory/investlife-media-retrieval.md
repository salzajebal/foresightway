---
name: Investlife media retrieval
description: How to reliably retrieve the user's original Investlife homepage media assets.
---

When retrieving media from the original Investlife site, verify every downloaded file by MIME/file signature rather than trusting HTTP 200. Generic GET requests can return an HTML error document while HEAD reports the real asset metadata.

**Why:** Initial image, SVG, and MP4 downloads all produced the same small HTML response despite successful status codes.

**How to apply:** Send a browser-like user agent, the homepage as the `Referer`, and a media-specific `Accept` header. Then validate SVG/JPEG/MP4 signatures and dimensions before using the files.
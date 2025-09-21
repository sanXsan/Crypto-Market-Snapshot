export function renderFrame(title, desc, buttons = []) {
  // buttons: array of {label, target}
  const buttonsMeta = buttons
    .map((btn, i) => `<meta property="fc:frame:button:${i+1}" content="${btn.label}" />
                      <meta property="fc:frame:button:${i+1}:action" content="post" />
                      <meta property="fc:frame:button:${i+1}:target" content="${btn.target}" />`)
    .join("\n");

  return `
    <html>
      <head>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="https://dummyimage.com/600x400/000/fff&text=${encodeURIComponent(title)}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://dummyimage.com/600x400/000/fff&text=${encodeURIComponent(title)}" />
        ${buttonsMeta}
      </head>
      <body>
        <h1>${title}</h1>
        <p>${desc}</p>
      </body>
    </html>
  `;
}

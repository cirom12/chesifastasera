// Small helper to build DOM nodes safely.
// Text is always inserted as text (never as HTML), so event data cannot inject markup.

export function el(tag, attributes = {}, children = []) {
  const node = document.createElement(tag);

  for (const [name, value] of Object.entries(attributes)) {
    if (value === undefined || value === null || value === false) continue;
    if (name === 'class') node.className = value;
    else if (name === 'text') node.textContent = value;
    else if (name.startsWith('on') && typeof value === 'function') {
      node.addEventListener(name.slice(2), value);
    } else node.setAttribute(name, value === true ? '' : value);
  }

  for (const child of [].concat(children)) {
    if (child === undefined || child === null || child === false) continue;
    node.append(child);
  }
  return node;
}

// Only http(s) links are allowed, to avoid "javascript:" URLs coming from the data.
export function safeUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function hexToRgba(hex, alpha) {
  // Ensure alpha is in the correct range
  alpha = Math.max(0, Math.min(1, alpha));

  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hex color
  let r, g, b;

  if (hex.length === 3) {
    // In case of a shorthand hex color, e.g., #FFF
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else if (hex.length === 6) {
    // In case of a full hex color, e.g., #FFFFFF
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error('Invalid hex color: ' + hex);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


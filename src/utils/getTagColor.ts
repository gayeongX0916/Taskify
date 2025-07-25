const pastelColors = [
  { bg: "#F9EEE3", text: "#D58D49" },
  { bg: "#E7F7DB", text: "#86D549" },
  { bg: "#F7DBF0", text: "#D549B6" },
  { bg: "#DBE6F7", text: "#4981D5" },
];

export function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % pastelColors.length;
  return pastelColors[index];
}

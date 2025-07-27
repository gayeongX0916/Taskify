export const pastelColors = [
  "#A7D7C5",
  "#9FC5E8",
  "#D6A2E8",
  "#FFB3B3",
  "#FFCC99",
  "#AED581",
  "#B39DDB",
];

export function getRandomColor(char: string) {
  const code = char.charCodeAt(0);
  const index = code % pastelColors.length;
  return pastelColors[index];
}

export function getInitialFromUserName(username: string) {
  const trimmed = username.trim();
  const firstChar = trimmed[0];
  return firstChar;
}

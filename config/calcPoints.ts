export default function calculatePoints(result: string) {
  switch (result) {
    case "TD Pass":
    case "TD Run":
      return 7;
    case "Field Goal Made":
    case "Field Goal Missed":
      return 3;
    case "Safety":
      return -2;
    default:
      return 0;
  }
}
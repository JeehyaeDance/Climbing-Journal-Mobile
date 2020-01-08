export function urlResolver() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else if (process.env.NODE_ENV === "production") {
    return "someurl.com";
  }
}

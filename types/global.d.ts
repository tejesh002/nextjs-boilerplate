declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

export type ApiStatus = "idle" | "loading" | "success" | "error";



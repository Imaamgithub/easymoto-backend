export const mockAuth = (req, _res, next) => {
  req.user = {
    id: "dev-user",
    role: "ADMIN",
  };
  next();
};
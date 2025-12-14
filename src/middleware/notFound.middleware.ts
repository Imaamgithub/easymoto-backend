export function notFoundHandler({ req, res }: { req: any; res: any; }): void {
    res.status(404).json({ message: "Route not found" });
}
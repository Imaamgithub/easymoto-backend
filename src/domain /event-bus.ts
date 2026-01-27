type DomainEvent = {
  type: string;
  payload: unknown;
  occurredAt: Date;
};

export const emitEvent = (event: DomainEvent) => {
  console.log("[EVENT]", JSON.stringify(event));
};
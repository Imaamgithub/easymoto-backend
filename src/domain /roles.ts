export enum Role {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  CUSTOMER = "CUSTOMER",
}

export const permissions = {
  ASSIGN_ORDER: [Role.ADMIN],
  PICKUP_ORDER: [Role.RIDER],
  DELIVER_ORDER: [Role.RIDER],
  CANCEL_ORDER: [Role.ADMIN, Role.CUSTOMER],
};

export const can = (role: Role, action: keyof typeof permissions) =>
  permissions[action].includes(role);
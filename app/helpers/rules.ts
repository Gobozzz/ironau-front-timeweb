import { UserRules } from "../enums";

export function canUserRule(rule: UserRules, user: { rules: string[] | null }) {
  if (user.rules === null) {
    return false;
  }
  return user.rules.includes(rule);
}

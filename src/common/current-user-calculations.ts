import { User } from '../clients/user-data';

export function getSenderNameFromRecipients(currentUser: User, recipients: User[]): string {
  return recipients
    .filter((user) => user.name !== currentUser.name)
    .map((user) => user.name)
    .join(', ');
}

export interface Inbox {
  id: string;
  email: string;
  message: string;
  faction: string;
  username: string;
  phoneNumber: string;
  status: string;
  studentId: string;
  dateSent: string;
}

export interface User {
  id: string;
  email: string;
  faction: string;
  isAdmin: boolean;
}

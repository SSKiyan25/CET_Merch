export interface Inbox {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  studentId: string;
  department: string;
  faction: string;
  dateSent: string;
  status: string;
}

export interface Seller {
  contactEmail: string;
  phoneNumber: string;
  faction: string;
  fbLink: string;
  role: string;
}

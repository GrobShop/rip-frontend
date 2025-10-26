export interface Partner {
  id: string;
  email: string;
  password: string;
  role: string;
  company_name: string;
  inn: string;
  contact_person: string;
  phone: string;
  address: string;
  admin_notes: number;
}

export interface PartnerServer extends Partner {
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          role: 'admin' | 'editor' | 'viewer';
          status: 'active' | 'inactive' | 'pending';
          department: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          role?: 'admin' | 'editor' | 'viewer';
          status?: 'active' | 'inactive' | 'pending';
          department: string;
          avatar_url?: string | null;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          role?: 'admin' | 'editor' | 'viewer';
          status?: 'active' | 'inactive' | 'pending';
          department?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      data_records: {
        Row: {
          id: string;
          category: string;
          product: string;
          region: string;
          sales: number;
          revenue: number;
          profit: number;
          record_date: string;
          quarter: string;
          created_at: string;
        };
        Insert: {
          category: string;
          product: string;
          region: string;
          sales: number;
          revenue: number;
          profit: number;
          record_date: string;
          quarter: string;
        };
        Update: {
          category?: string;
          product?: string;
          region?: string;
          sales?: number;
          revenue?: number;
          profit?: number;
          record_date?: string;
          quarter?: string;
        };
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type DataRecord = Database['public']['Tables']['data_records']['Row'];
export type DataRecordInsert = Database['public']['Tables']['data_records']['Insert'];
export type DataRecordUpdate = Database['public']['Tables']['data_records']['Update'];
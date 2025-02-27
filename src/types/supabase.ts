export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          tier: string;
          listings_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          tier?: string;
          listings_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          tier?: string;
          listings_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string;
          condition: number;
          price: number;
          location: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: string;
          condition: number;
          price: number;
          location?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          condition?: number;
          price?: number;
          location?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_images: {
        Row: {
          id: string;
          listing_id: string;
          image_url: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          image_url: string;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          image_url?: string;
          position?: number;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string | null;
          seller_id: string | null;
          listing_id: string | null;
          status: string;
          total_amount: number;
          commission_amount: number;
          seller_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          buyer_id?: string | null;
          seller_id?: string | null;
          listing_id?: string | null;
          status?: string;
          total_amount: number;
          commission_amount: number;
          seller_amount: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          buyer_id?: string | null;
          seller_id?: string | null;
          listing_id?: string | null;
          status?: string;
          total_amount?: number;
          commission_amount?: number;
          seller_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

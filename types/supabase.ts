export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          full_name: string | null
          learning_style: string | null
          created_at: string
          updated_at: string
          xp: number | null
          streak: number | null
          role: string | null
          bio: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          full_name?: string | null
          learning_style?: string | null
          created_at?: string
          updated_at?: string
          xp?: number | null
          streak?: number | null
          role?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          full_name?: string | null
          learning_style?: string | null
          created_at?: string
          updated_at?: string
          xp?: number | null
          streak?: number | null
          role?: string | null
          bio?: string | null
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          content_path: string
          duration: number
          level: string
          created_at: string
          learning_style: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content_path: string
          duration: number
          level: string
          created_at?: string
          learning_style: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content_path?: string
          duration?: number
          level?: string
          created_at?: string
          learning_style?: string
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
          invite_code: string
          is_private: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
          invite_code?: string
          is_private?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
          invite_code?: string
          is_private?: boolean
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: string
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: string
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: string
          joined_at?: string
        }
      }
      group_activity: {
        Row: {
          id: string
          group_id: string
          user_id: string
          activity_type: string
          points: number
          created_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          activity_type: string
          points?: number
          created_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          activity_type?: string
          points?: number
          created_at?: string
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

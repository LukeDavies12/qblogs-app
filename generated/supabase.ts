export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      fall_camps: {
        Row: {
          id: string
          season_id: string
        }
        Insert: {
          id?: string
          season_id: string
        }
        Update: {
          id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_fall_camps_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      game_drives: {
        Row: {
          end: string
          game_id: string | null
          id: string
          notes: string | null
          result: Database["public"]["Enums"]["drive_results"]
          spring_game_id: string | null
          start: string
        }
        Insert: {
          end: string
          game_id?: string | null
          id?: string
          notes?: string | null
          result: Database["public"]["Enums"]["drive_results"]
          spring_game_id?: string | null
          start: string
        }
        Update: {
          end?: string
          game_id?: string | null
          id?: string
          notes?: string | null
          result?: Database["public"]["Enums"]["drive_results"]
          spring_game_id?: string | null
          start?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_game_drives_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_games_drives_spring_game_id_fkey"
            columns: ["spring_game_id"]
            isOneToOne: false
            referencedRelation: "spring_games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          date: string
          drive_td_percentage: number | null
          id: string
          season_id: string | null
        }
        Insert: {
          date: string
          drive_td_percentage?: number | null
          id?: string
          season_id?: string | null
        }
        Update: {
          date?: string
          drive_td_percentage?: number | null
          id?: string
          season_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_games_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["auth_id"]
          },
        ]
      }
      plays: {
        Row: {
          backed_up: boolean | null
          call: string
          call_family: string | null
          defense_coverage: string | null
          defense_front: string | null
          defense_pressure: boolean | null
          distance: number | null
          down: number | null
          easy_audible_missed: Database["public"]["Enums"]["yes_no_na"] | null
          formation: string
          game_id: string | null
          hash: Database["public"]["Enums"]["hashes"] | null
          hot_throw_missed: Database["public"]["Enums"]["yes_no_na"] | null
          id: string
          motion: string | null
          notes: string | null
          personnel: number | null
          practice_block_id: string | null
          qb_ball_placement_good:
            | Database["public"]["Enums"]["yes_no_na"]
            | null
          qb_read_correct: Database["public"]["Enums"]["yes_no_na"] | null
          redzone: boolean | null
          result: string
          spring_game_id: string | null
          two_minute: boolean | null
          type: Database["public"]["Enums"]["run_or_pass"] | null
          yard_line: string | null
        }
        Insert: {
          backed_up?: boolean | null
          call: string
          call_family?: string | null
          defense_coverage?: string | null
          defense_front?: string | null
          defense_pressure?: boolean | null
          distance?: number | null
          down?: number | null
          easy_audible_missed?: Database["public"]["Enums"]["yes_no_na"] | null
          formation: string
          game_id?: string | null
          hash?: Database["public"]["Enums"]["hashes"] | null
          hot_throw_missed?: Database["public"]["Enums"]["yes_no_na"] | null
          id?: string
          motion?: string | null
          notes?: string | null
          personnel?: number | null
          practice_block_id?: string | null
          qb_ball_placement_good?:
            | Database["public"]["Enums"]["yes_no_na"]
            | null
          qb_read_correct?: Database["public"]["Enums"]["yes_no_na"] | null
          redzone?: boolean | null
          result: string
          spring_game_id?: string | null
          two_minute?: boolean | null
          type?: Database["public"]["Enums"]["run_or_pass"] | null
          yard_line?: string | null
        }
        Update: {
          backed_up?: boolean | null
          call?: string
          call_family?: string | null
          defense_coverage?: string | null
          defense_front?: string | null
          defense_pressure?: boolean | null
          distance?: number | null
          down?: number | null
          easy_audible_missed?: Database["public"]["Enums"]["yes_no_na"] | null
          formation?: string
          game_id?: string | null
          hash?: Database["public"]["Enums"]["hashes"] | null
          hot_throw_missed?: Database["public"]["Enums"]["yes_no_na"] | null
          id?: string
          motion?: string | null
          notes?: string | null
          personnel?: number | null
          practice_block_id?: string | null
          qb_ball_placement_good?:
            | Database["public"]["Enums"]["yes_no_na"]
            | null
          qb_read_correct?: Database["public"]["Enums"]["yes_no_na"] | null
          redzone?: boolean | null
          result?: string
          spring_game_id?: string | null
          two_minute?: boolean | null
          type?: Database["public"]["Enums"]["run_or_pass"] | null
          yard_line?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_plays_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_plays_practice_block_id_fkey"
            columns: ["practice_block_id"]
            isOneToOne: false
            referencedRelation: "practice_blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_plays_spring_game_id_fkey"
            columns: ["spring_game_id"]
            isOneToOne: false
            referencedRelation: "spring_games"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_blocks: {
        Row: {
          id: string
          name: string
          practice_id: string
          situation: Database["public"]["Enums"]["practice_block_situation"]
          type: Database["public"]["Enums"]["practice_block_type"]
        }
        Insert: {
          id?: string
          name: string
          practice_id: string
          situation: Database["public"]["Enums"]["practice_block_situation"]
          type: Database["public"]["Enums"]["practice_block_type"]
        }
        Update: {
          id?: string
          name?: string
          practice_id?: string
          situation?: Database["public"]["Enums"]["practice_block_situation"]
          type?: Database["public"]["Enums"]["practice_block_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_practice_blocks_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      practices: {
        Row: {
          date: string
          fall_camp_id: string | null
          game_id: string | null
          id: string
          spring_game_id: string | null
        }
        Insert: {
          date: string
          fall_camp_id?: string | null
          game_id?: string | null
          id?: string
          spring_game_id?: string | null
        }
        Update: {
          date?: string
          fall_camp_id?: string | null
          game_id?: string | null
          id?: string
          spring_game_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_practices_fall_camp_id_fkey"
            columns: ["fall_camp_id"]
            isOneToOne: false
            referencedRelation: "fall_camps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_practices_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_practices_spring_game_id_fkey"
            columns: ["spring_game_id"]
            isOneToOne: false
            referencedRelation: "spring_games"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          id: string
          team_id: string | null
          year: number
        }
        Insert: {
          id?: string
          team_id?: string | null
          year: number
        }
        Update: {
          id?: string
          team_id?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_seasons_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      spring_games: {
        Row: {
          date: string
          drive_td_percentage: number | null
          id: string
          spring_season_id: string
        }
        Insert: {
          date: string
          drive_td_percentage?: number | null
          id?: string
          spring_season_id: string
        }
        Update: {
          date?: string
          drive_td_percentage?: number | null
          id?: string
          spring_season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_spring_games_spring_season_id_fkey"
            columns: ["spring_season_id"]
            isOneToOne: false
            referencedRelation: "spring_seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      spring_seasons: {
        Row: {
          drive_id: string | null
          id: string
          year: number
        }
        Insert: {
          drive_id?: string | null
          id?: string
          year: number
        }
        Update: {
          drive_id?: string | null
          id?: string
          year?: number
        }
        Relationships: []
      }
      teams: {
        Row: {
          city: string | null
          id: string
          name: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          id?: string
          name?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          id?: string
          name?: string | null
          state?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string
          current_team_id: string | null
          full_name: string
          role: Database["public"]["Enums"]["user_role"]
          type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          auth_id?: string
          current_team_id?: string | null
          full_name: string
          role: Database["public"]["Enums"]["user_role"]
          type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          auth_id?: string
          current_team_id?: string | null
          full_name?: string
          role?: Database["public"]["Enums"]["user_role"]
          type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      drive_results:
        | "TD Pass"
        | "TD Run"
        | "Field Goal Made"
        | "Field Goal Missed"
        | "Punt"
        | "Interception"
        | "Fumble"
        | "End of Half"
        | "8 Point Drive"
        | "6 Point Drive"
      hashes: "L" | "LM" | "M" | "RM" | "R"
      practice_block_situation:
        | "Base Downs"
        | "Redzone"
        | "Backed Up"
        | "Two Minute"
        | "Third Long"
        | "Third Medium"
        | "Third Short"
        | "Blitz Period"
        | "Inside Run"
      practice_block_type:
        | "Skelly"
        | "Team Thud"
        | "Team Live"
        | "Team Helmets Only"
      run_or_pass: "Run" | "Pass"
      season_type: "Fall" | "Spring"
      user_role: "QB" | "Coach"
      user_type:
        | "QB"
        | "Head Coach"
        | "Offensive Coordinator"
        | "Pass Game Coordinator"
        | "Run Game Coordinator"
        | "QB Coach"
        | "RB Coach"
        | "WR Coach"
        | "OL Coach"
      yes_no_na: "Yes" | "No" | "NA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

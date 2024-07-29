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
          drive_in_game: number | null
          end: number
          game_id: string | null
          id: string
          notes: string | null
          qb_id: string | null
          result: Database["public"]["Enums"]["game_drive_results"] | null
          start: number
        }
        Insert: {
          drive_in_game?: number | null
          end: number
          game_id?: string | null
          id?: string
          notes?: string | null
          qb_id?: string | null
          result?: Database["public"]["Enums"]["game_drive_results"] | null
          start: number
        }
        Update: {
          drive_in_game?: number | null
          end?: number
          game_id?: string | null
          id?: string
          notes?: string | null
          qb_id?: string | null
          result?: Database["public"]["Enums"]["game_drive_results"] | null
          start?: number
        }
        Relationships: [
          {
            foreignKeyName: "game_drives_qb_id_fkey"
            columns: ["qb_id"]
            isOneToOne: false
            referencedRelation: "team_qbs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_game_drives_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          date: string
          id: string
          name: string
          season_id: string | null
          spring_game: boolean | null
        }
        Insert: {
          date: string
          id?: string
          name: string
          season_id?: string | null
          spring_game?: boolean | null
        }
        Update: {
          date?: string
          id?: string
          name?: string
          season_id?: string | null
          spring_game?: boolean | null
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
      plays: {
        Row: {
          bad_play_reason: string | null
          call: string
          call_family: string
          distance: number
          down: number
          game_drive_id: string | null
          id: string
          notes: string | null
          num_in_drive: number
          personnel: string
          practice_block_id: string | null
          qb_exceptional: boolean | null
          qb_id: string
          qb_play_yn: Database["public"]["Enums"]["yes_no_na"]
          qb_pressured: Database["public"]["Enums"]["yes_no_na"] | null
          qb_read_yn: Database["public"]["Enums"]["yes_no_na"]
          turnover_worthy_play: Database["public"]["Enums"]["yes_no_na"] | null
          type: Database["public"]["Enums"]["play_results"]
          yard_line: number
          yards: string
        }
        Insert: {
          bad_play_reason?: string | null
          call: string
          call_family: string
          distance: number
          down: number
          game_drive_id?: string | null
          id?: string
          notes?: string | null
          num_in_drive: number
          personnel: string
          practice_block_id?: string | null
          qb_exceptional?: boolean | null
          qb_id: string
          qb_play_yn: Database["public"]["Enums"]["yes_no_na"]
          qb_pressured?: Database["public"]["Enums"]["yes_no_na"] | null
          qb_read_yn: Database["public"]["Enums"]["yes_no_na"]
          turnover_worthy_play?: Database["public"]["Enums"]["yes_no_na"] | null
          type: Database["public"]["Enums"]["play_results"]
          yard_line: number
          yards: string
        }
        Update: {
          bad_play_reason?: string | null
          call?: string
          call_family?: string
          distance?: number
          down?: number
          game_drive_id?: string | null
          id?: string
          notes?: string | null
          num_in_drive?: number
          personnel?: string
          practice_block_id?: string | null
          qb_exceptional?: boolean | null
          qb_id?: string
          qb_play_yn?: Database["public"]["Enums"]["yes_no_na"]
          qb_pressured?: Database["public"]["Enums"]["yes_no_na"] | null
          qb_read_yn?: Database["public"]["Enums"]["yes_no_na"]
          turnover_worthy_play?: Database["public"]["Enums"]["yes_no_na"] | null
          type?: Database["public"]["Enums"]["play_results"]
          yard_line?: number
          yards?: string
        }
        Relationships: [
          {
            foreignKeyName: "plays_game_drive_id_fkey"
            columns: ["game_drive_id"]
            isOneToOne: false
            referencedRelation: "game_drives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plays_qb_id_fkey"
            columns: ["qb_id"]
            isOneToOne: false
            referencedRelation: "team_qbs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_plays_practice_block_id_fkey"
            columns: ["practice_block_id"]
            isOneToOne: false
            referencedRelation: "practice_blocks"
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
        ]
      }
      seasons: {
        Row: {
          id: string
          season_name: string | null
          team_id: string | null
          type: Database["public"]["Enums"]["season_type"]
          year: number
        }
        Insert: {
          id?: string
          season_name?: string | null
          team_id?: string | null
          type: Database["public"]["Enums"]["season_type"]
          year: number
        }
        Update: {
          id?: string
          season_name?: string | null
          team_id?: string | null
          type?: Database["public"]["Enums"]["season_type"]
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
      team_qbs: {
        Row: {
          active: boolean | null
          available: boolean | null
          full_name: string
          id: string
          team_id: string | null
        }
        Insert: {
          active?: boolean | null
          available?: boolean | null
          full_name: string
          id?: string
          team_id?: string | null
        }
        Update: {
          active?: boolean | null
          available?: boolean | null
          full_name?: string
          id?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_qbs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string
          current_game_id: string | null
          current_game_name: string | null
          current_season_id: string | null
          current_season_name: string | null
          full_name: string
          role: Database["public"]["Enums"]["app_role"]
          team_id: string | null
          team_name: string | null
          type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          auth_id?: string
          current_game_id?: string | null
          current_game_name?: string | null
          current_season_id?: string | null
          current_season_name?: string | null
          full_name: string
          role?: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          team_name?: string | null
          type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          auth_id?: string
          current_game_id?: string | null
          current_game_name?: string | null
          current_season_id?: string | null
          current_season_name?: string | null
          full_name?: string
          role?: Database["public"]["Enums"]["app_role"]
          team_id?: string | null
          team_name?: string | null
          type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: [
          {
            foreignKeyName: "users_current_game_id_fkey"
            columns: ["current_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_current_season_id_fkey"
            columns: ["current_season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      season_type_to_text: {
        Args: {
          "": Database["public"]["Enums"]["season_type"]
        }
        Returns: string
      }
      user_has_role_or_higher: {
        Args: {
          user_id: string
          min_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "standard" | "limited"
      game_drive_results:
        | "TD Pass"
        | "TD Run"
        | "Field Goal Made"
        | "Field Goal Missed"
        | "Punt"
        | "Turnover on Downs"
        | "Interception"
        | "Fumble"
        | "End of Half"
        | "Safety"
        | "TD Run QB"
      hashes: "L" | "LM" | "M" | "RM" | "R"
      play_results:
        | "Complete"
        | "Incomplete"
        | "Incomplete Drop"
        | "Rush"
        | "QB Rush"
        | "Sack"
        | "Penalty"
        | "Interception"
        | "Fumble"
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
      run_or_pass: "Run" | "Pass" | "Penalty"
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

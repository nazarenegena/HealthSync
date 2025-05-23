export interface IUser {
  firstname?: string | null;
  lastname?: string | null;
  name?: string | null;
  email: string | null;
  uid?: string | null;
  isNewUser?: boolean;
}

export interface IProfile {
  user_id: string;
  age?: number | null;
  height?: number | null;
  height_unit: string | null;
  weight: number | null;
  weight_unit: string | null;
}

export interface IProfileFormData {
  firstname?: string;
  lastname?: string;
  age?: number;
  height?: number;
  weight?: number;
  height_unit?: "cm" | "feet";
  weight_unit?: "kg" | "lbs";
}

export interface IWorkout {
  id: number;
  uuid?: string;
  category?: ICategory;
  muscles?: IMuscle[];
  muscles_secondary?: IMusclesSecondary[];
  equipment?: IEquipment[];
  images?: Image[];
  variations?: any;
  videos?: any[];
  translations?: ITranslation[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IMuscle {
  id: number;
  name: string;
  name_en?: string;
  is_front?: boolean;
  image_url_main?: string;
  image_url_secondary?: string;
}

export interface IMusclesSecondary {
  id: number;
  name: string;
  name_en?: string;
  is_front?: boolean;
  image_url_main?: string;
  image_url_secondary?: string;
}

export interface IEquipment {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  uuid?: string;
  exercise?: number;
  exercise_uuid?: string;
  image?: string;
  is_main?: boolean;
  style?: string;
}

export interface ITranslation {
  id: number;
  uuid: string;
  name: string;
  exercise: number;
  description: string;
}

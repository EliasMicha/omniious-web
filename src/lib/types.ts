export type ProjectCategory =
  | 'residencial'
  | 'comercial'
  | 'corporativo'
  | 'hotelero'
  | 'exhibicion'
  | 'hospitalidad'
  | 'cultural';

export interface Project {
  id: string;
  slug: string;
  name: string;
  client: string | null;
  architect: string | null;
  category: ProjectCategory;
  location: string | null;
  year: string | null;
  area_m2: number | null;
  scope: string[];
  description: string | null;
  cover_image_url: string;
  gallery_urls: string[];
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

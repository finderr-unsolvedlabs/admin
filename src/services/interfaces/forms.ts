export interface IProductUpdateForm {
  category?: string;
  tags?: string[];
}

export interface IBulkUpdateProductsForm {
  products: string[];
  category?: string;
  changeState?: "active" | "inactive";
}

export interface IBrandUpdateForm {
  name: string;
  description: string | null;
  contact: { phone: string };
  logo_key: string;
  profile_pic_key: string;
  cover_images_key: string[];
  state: string;
}

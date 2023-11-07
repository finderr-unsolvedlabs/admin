export interface IUserSlice {
  userLoggedIn: boolean;
  userLoggingIn: boolean;
  productLeadRequested: { productSlug: string } | null;
}

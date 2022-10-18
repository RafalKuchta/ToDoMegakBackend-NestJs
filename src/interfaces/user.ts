export interface RegisterUserResponse {
  id: string;
  email: string;
  roles: [];
}

export interface UserResponse {
  id: string;
  email: string;
  roles: string;
}

export interface UserRolesResponse {
  roles: string;
}

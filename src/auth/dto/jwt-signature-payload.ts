export interface JwtSignaturePayload {
  email: string;
  sub: string;
  roles: string[];
}

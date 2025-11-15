export class AuthRepositoryInMemory {
  async login(email: string, password: string) {
    return { id: "1", email };
  }
}

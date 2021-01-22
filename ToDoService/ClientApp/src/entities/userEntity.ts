type UserEntity =
    | {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
      }
    | undefined
    | null;

export default UserEntity;

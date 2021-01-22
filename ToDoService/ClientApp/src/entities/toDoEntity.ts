type ToDoEntity =
    | {
          id: string;
          userId: string;
          content: string;
          creationDate: string;
      }
    | undefined
    | null;

export default ToDoEntity;

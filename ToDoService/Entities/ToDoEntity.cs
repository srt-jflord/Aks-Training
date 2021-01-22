using System;

namespace ToDoService.Entities {

    public class ToDoEntity {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}
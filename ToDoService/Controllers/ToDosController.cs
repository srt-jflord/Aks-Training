using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoService.DataAccess;
using ToDoService.Entities;

namespace ToDoService.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class ToDosController : ControllerBase {

        public ToDosController(DataContext dataContext, ILogger<UsersController> logger) {
            this.DataContext = dataContext;
            this.Logger = logger;
        }

        protected readonly DataContext DataContext;

        protected readonly ILogger Logger;

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IActionResult> GetAsync(string userId, CancellationToken cancellationToken) {
            var todos = await this.DataContext.ToDos
                .Where(t => EF.Functions.Like(t.UserId, userId))
                .ToListAsync(cancellationToken);

            return this.Ok(todos);
        }

        [HttpPost]
        [Route("user/{userId}")]
        public async Task<IActionResult> PostAsync(string userId, ToDoEntity todo, CancellationToken cancellationToken) {
            await Task.CompletedTask;

            if (string.IsNullOrWhiteSpace(todo?.Content)) {
                return this.BadRequest();
            }

            todo.Id = Guid.NewGuid().ToString();
            todo.UserId = userId;
            todo.CreationDate = DateTimeOffset.Now;

            this.DataContext.ToDos.Add(todo);
            await this.DataContext.SaveChangesAsync(cancellationToken);

            return this.Ok(todo);
        }
    }
}
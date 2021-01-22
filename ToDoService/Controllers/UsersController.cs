using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ToDoService.DataAccess;
using ToDoService.Entities;

namespace ToDoService.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase {

        public UsersController(DataContext dataContext, HttpClient httpClient, IConfiguration configuration, ILogger<UsersController> logger) {
            this.DataContext = dataContext;
            this.HttpClient = httpClient;
            this.Configuration = configuration;
            this.Logger = logger;
        }

        protected readonly DataContext DataContext;

        protected readonly HttpClient HttpClient;

        protected readonly IConfiguration Configuration;

        protected readonly ILogger Logger;

        [HttpGet]
        public async Task<IActionResult> GetAsync(CancellationToken cancellationToken) {
            var users = await this.DataContext.Users.ToListAsync(cancellationToken);
            return this.Ok(users);
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetByUserIdAsync(string userId, CancellationToken cancellationToken) {
            var user = await this.DataContext.Users
                .Where(u => EF.Functions.Like(u.Id, userId))
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null) {
                var userServiceUrl = this.Configuration.GetSection("DataAccess:UserServiceBaseUrl")?.Value;
                var endpointUrl = $"{userServiceUrl}/api/users/{userId}";
                user = await this.HttpClient.GetFromJsonAsync<UserEntity>(endpointUrl, cancellationToken);
                if (user != null) {
                    this.DataContext.Add(user);
                    await this.DataContext.SaveChangesAsync(cancellationToken);
                }
            }

            if (user == null) {
                return this.NotFound();
            }
            else {
                return this.Ok(user);
            }
        }

        [HttpGet]
        [Route("email/{email}")]
        public async Task<IActionResult> GetByEmailAsync(string email, CancellationToken cancellationToken) {
            var user = await this.DataContext.Users
                .Where(u => EF.Functions.Like(u.Email, email))
                .FirstOrDefaultAsync(cancellationToken);

            if (user == null) {
                var userServiceUrl = this.Configuration.GetSection("DataAccess:UserServiceBaseUrl")?.Value;
                var endpointUrl = $"{userServiceUrl}/api/users/email/{email}";
                user = await this.HttpClient.GetFromJsonAsync<UserEntity>(endpointUrl, cancellationToken);
                if (user != null) {
                    this.DataContext.Add(user);
                    await this.DataContext.SaveChangesAsync(cancellationToken);
                }
            }

            if (user == null) {
                return this.NotFound();
            }
            else {
                return this.Ok(user);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(UserEntity user, CancellationToken cancellationToken) {
            await Task.CompletedTask;

            if (string.IsNullOrWhiteSpace(user?.FirstName)) {
                return this.BadRequest();
            }

            if (string.IsNullOrWhiteSpace(user?.LastName)) {
                return this.BadRequest();
            }

            if (string.IsNullOrWhiteSpace(user?.Email)) {
                return this.BadRequest();
            }

            user.Id = Guid.NewGuid().ToString();

            this.DataContext.Users.Add(user);
            await this.DataContext.SaveChangesAsync(cancellationToken);

            return this.Ok(user);
        }
    }
}
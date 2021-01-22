using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoService.Entities;

namespace ToDoService.DataAccess {

    public class DataContext : DbContext {

        public DataContext(DbContextOptions<DataContext> options, ILoggerFactory loggerFactory) : base(options) {
            this.LoggerFactory = loggerFactory;
        }

        protected ILoggerFactory LoggerFactory { get; }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<ToDoEntity> ToDos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            base.OnConfiguring(optionsBuilder);

#if DEBUG
            optionsBuilder.EnableSensitiveDataLogging();
#endif
            if (this.LoggerFactory != null) {
                optionsBuilder.UseLoggerFactory(this.LoggerFactory);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("svc");

            foreach (var entity in modelBuilder.Model.GetEntityTypes()) {
                var tableName = entity.DisplayName().Replace("Entity", string.Empty);
                entity.SetTableName(tableName);
            }
        }
    }
}
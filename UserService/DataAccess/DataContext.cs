using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using UserService.Entities;

namespace UserService.DataAccess {

    public class DataContext : DbContext {

        public DataContext(DbContextOptions<DataContext> options, ILoggerFactory loggerFactory) : base(options) {
            this.LoggerFactory = loggerFactory;
        }

        protected ILoggerFactory LoggerFactory { get; }

        public DbSet<UserEntity> Users { get; set; }

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
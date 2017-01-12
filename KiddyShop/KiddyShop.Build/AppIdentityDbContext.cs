using KiddyShop.Account.Models;
using KiddyShop.Application.Models;
using KiddyShop.Community.Models;
using KiddyShop.Messaging.Models;
using KiddyShop.Security.Commons;
using KiddyShop.Security.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Build
{
    public class AppIdentityDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppIdentityDbContext()
            :base(Constants.ENTITY_FRAMEWORK_CONNECTION_STRING, throwIfV1Schema: false)
        {

        }

        public static AppIdentityDbContext Create()
        {
            return new AppIdentityDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Ignore<User>();

            modelBuilder.Entity<ApplicationUser>().ToTable("Users").Property(x => x.PasswordHash).HasMaxLength(256);
            modelBuilder.Entity<ApplicationUser>().Property(x => x.PhoneNumber).HasMaxLength(20);
            modelBuilder.Entity<ApplicationUser>().Property(x => x.SecurityStamp).HasMaxLength(256);

            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims").Property(x => x.ClaimType).HasMaxLength(500);
            modelBuilder.Entity<IdentityUserClaim>().Property(x => x.ClaimValue).HasMaxLength(500);
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");

            modelBuilder.Entity<User>().HasMany(u => u.RoleGroups)
                                                  .WithMany(r => r.Users)
                                                  .Map(m =>
                                                  {
                                                      m.MapLeftKey("UserId");
                                                      m.MapRightKey("RoleGroupId");
                                                      m.ToTable("UserGroups");
                                                  });

            modelBuilder.Entity<RoleGroup>().HasMany(u => u.AppClaims)
                                                  .WithMany(r => r.RoleGroups)
                                                  .Map(m =>
                                                  {
                                                      m.MapLeftKey("RoleGroupId");
                                                      m.MapRightKey("AppClaimId");
                                                      m.ToTable("GroupClaims");
                                                  });

            modelBuilder.Entity<AppClaim>().HasMany(u => u.AppFunctions)
                                                  .WithMany(r => r.AppClaims)
                                                  .Map(m =>
                                                  {
                                                      m.MapLeftKey("AppClaimId");
                                                      m.MapRightKey("AppFunctionId");
                                                      m.ToTable("FunctionClaims");
                                                  });
            modelBuilder.Entity<Post>().HasMany(u => u.Tags)
                                                  .WithMany(r => r.Posts)
                                                  .Map(m =>
                                                  {
                                                      m.MapLeftKey("PostId");
                                                      m.MapRightKey("TagId");
                                                      m.ToTable("PostTags");
                                                  });
        }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Timezone> Timezone { get; set; }

        public virtual DbSet<AppClaim> AppClaim { get; set; }
        public virtual DbSet<AppFunction> AppFunction { get; set; }

        public virtual DbSet<UserAttachment> UserAttachment { get; set; }

        public virtual DbSet<RoleGroup> RoleGroup { get; set; }
        public virtual DbSet<UserGroup> UserGroup { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Account.Models.Account> Account { get; set; }
        public virtual DbSet<Manager> Manager { get; set; }
        public virtual DbSet<CRM> CRM { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Teacher> Teacher { get; set; }

        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<MenuGroup> MenuGroup { get; set; }
        public virtual DbSet<SystemConfig> SystemConfig { get; set; }

        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostCategory> PostCategory { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }

        public virtual DbSet<MessagingDataMapping> MessagingDataMapping { get; set; }
        public virtual DbSet<MessagingMessage> MessagingMessage { get; set; }
        public virtual DbSet<MessagingTemplate> MessagingTemplate { get; set; }
        public virtual DbSet<MessagingTemplateContent> MessagingTemplateContent { get; set; }
        public virtual DbSet<MessagingType> MessagingType { get; set; }
    }
}

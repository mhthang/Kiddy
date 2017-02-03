namespace KiddyShop.Build.Migrations
{
    using Account.Models;
    using Application.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Security.Identity;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Security.Claims;

    internal sealed class Configuration : DbMigrationsConfiguration<KiddyShop.Build.AppIdentityDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(KiddyShop.Build.AppIdentityDbContext context)
        {
            Random rand = new Random();
            #region System Admin
            Guid clientRoleGroupId = Guid.Parse("01D9E630-4615-48A9-B764-CB08326F73E7");
            List<RoleGroup> roleGroups = new List<RoleGroup>()
            {
                new RoleGroup { Id = clientRoleGroupId, Name ="Clients"},
                new RoleGroup { Id = Guid.NewGuid(), Name ="CRMs"},
                new RoleGroup { Id = Guid.NewGuid(), Name ="Managers"},
                new RoleGroup { Id = Guid.NewGuid(), Name ="Admins"}
            };

            foreach (RoleGroup roleGroup in roleGroups)
            {
                context.RoleGroup.Add(roleGroup);
            }

            List<AppFunction> appFunctions = new List<AppFunction>()
            {
                new AppFunction { Id =  Guid.NewGuid(), Name ="Application"},
                new AppFunction { Id =  Guid.NewGuid(), Name ="AdminPortal"},
                new AppFunction { Id =  Guid.NewGuid(), Name ="Reporting"},
            };

            List<String> claims = new List<string> { "client", "administrator", "staff", "manager" };

            List<AppClaim> appClaims = new List<AppClaim>();
            for (int index = 0; index < claims.Count; index++)
            {
                AppClaim claim = new AppClaim { Id = Guid.NewGuid(), ClaimType = "role", ClaimValue = claims[index] };
                context.AppClaim.Add(claim);
                appClaims.Add(claim);
            }

            foreach (AppFunction appFunction in appFunctions)
            {
                foreach (AppClaim claim in appClaims)
                {
                    appFunction.AppClaims.Add(claim);
                }

                context.AppFunction.Add(appFunction);
            }

            ApplicationUser admin = new ApplicationUser()
            {
                FirstName = "Admin",
                LastName = "System",
                UserName = "admin@stonecastle.com",
                Email = "admin@stonecastle.com",
            };

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            string password = "123456789@Abc";
            IdentityResult result = manager.Create(admin, password);

            foreach (String appClaim in claims)
            {
                manager.AddClaim(admin.Id, new Claim("role", appClaim));
            }


            Profile adminProfile = new Profile()
            {
                Id = Guid.NewGuid(),
                FirstName = "Admin",
                LastName = "System",
                Email = "admin@stonecastle.com",
                HighlightColor = Commons.Ultility.GetHighlightColor(rand),
                UserId = admin.Id,
                UserType = USER_TYPE.ADMIN,
                ProfileType = PROFILE_TYPE.CLIENT,
                IsDeleted = false,
            };

            context.Profile.Add(adminProfile);

            Account adminAccount = new Account()
            {
                Id = Guid.NewGuid(),
                Profile = adminProfile
            };

            context.Account.Add(adminAccount);

            #endregion
        }
    }
}

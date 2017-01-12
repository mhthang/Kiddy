namespace KiddyShop.Build.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateDb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accounts",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ProfileId = c.Guid(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppClaims",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ClaimType = c.String(maxLength: 500),
                        ClaimValue = c.String(maxLength: 500),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppFunctions",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(maxLength: 256),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RoleGroups",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(maxLength: 256),
                        Description = c.String(maxLength: 500),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        AccountId = c.Guid(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accounts", t => t.AccountId, cascadeDelete: true)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CountryCode = c.String(maxLength: 2),
                        CountryName = c.String(maxLength: 128),
                        CountryNumCode = c.Int(),
                        CountryPhoneCode = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CRMs",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ManagerId = c.Guid(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Managers", t => t.ManagerId, cascadeDelete: true)
                .Index(t => t.ManagerId);
            
            CreateTable(
                "dbo.Managers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Menus",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                        URL = c.String(nullable: false),
                        DisplayOrder = c.Int(),
                        GroupID = c.Guid(nullable: false),
                        Target = c.String(),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MenuGroups", t => t.GroupID, cascadeDelete: true)
                .Index(t => t.GroupID);
            
            CreateTable(
                "dbo.MenuGroups",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MessagingDataMapping",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        MappingName = c.String(),
                        TokenKey = c.String(),
                        TableName = c.String(maxLength: 128),
                        ColumnName = c.String(maxLength: 128),
                        RequiredColumnName = c.String(maxLength: 128),
                        Format = c.String(),
                        SqlQuery = c.String(),
                        Value = c.String(),
                        IsPublish = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MessagingMessages",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        MessagingTemplateContentId = c.Guid(nullable: false),
                        EmailDeliveryProvider = c.String(),
                        MessagingSubject = c.String(),
                        MessagingFromName = c.String(),
                        MessagingFromEmailAddress = c.String(),
                        MessagingTo = c.String(),
                        MessagingCc = c.String(),
                        MessagingBcc = c.String(),
                        MessagingContent = c.String(),
                        Tags = c.String(),
                        IsSent = c.Boolean(nullable: false),
                        IsMarkedAsRead = c.Boolean(nullable: false),
                        SentDate = c.DateTime(),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MessagingTemplateContents", t => t.MessagingTemplateContentId, cascadeDelete: true)
                .Index(t => t.MessagingTemplateContentId);
            
            CreateTable(
                "dbo.MessagingTemplateContents",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        MessagingTemplateId = c.Guid(nullable: false),
                        Lang = c.String(),
                        MessagingSubject = c.String(),
                        MessagingFromName = c.String(),
                        MessagingFromEmailAddress = c.String(),
                        MessagingTo = c.String(),
                        MessagingCc = c.String(),
                        MessagingBcc = c.String(),
                        MessagingContent = c.String(),
                        Tags = c.String(),
                        IsPublish = c.Boolean(nullable: false),
                        FromDate = c.DateTime(),
                        EndDate = c.DateTime(),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MessagingTemplates", t => t.MessagingTemplateId, cascadeDelete: true)
                .Index(t => t.MessagingTemplateId);
            
            CreateTable(
                "dbo.MessagingTemplates",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        MessagingTypeId = c.Int(nullable: false),
                        MessagingTemplateName = c.String(maxLength: 255),
                        HighlightColor = c.String(maxLength: 32),
                        IsPublish = c.Boolean(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MessagingTypes", t => t.MessagingTypeId, cascadeDelete: true)
                .Index(t => t.MessagingTypeId);
            
            CreateTable(
                "dbo.MessagingTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MessagingTypeTitle = c.String(maxLength: 32),
                        HighlightColor = c.String(maxLength: 32),
                        IsEnable = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Title = c.String(nullable: false, maxLength: 180),
                        Description = c.String(nullable: false, maxLength: 500),
                        Content = c.String(nullable: false),
                        Alias = c.String(nullable: false, maxLength: 256),
                        Image = c.String(maxLength: 500),
                        IsActive = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        IsShowHome = c.Boolean(),
                        IsHot = c.Boolean(),
                        ViewCount = c.Int(),
                        PostCategoryId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PostCategories", t => t.PostCategoryId, cascadeDelete: true)
                .Index(t => t.PostCategoryId);
            
            CreateTable(
                "dbo.PostCategories",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256),
                        Description = c.String(nullable: false, maxLength: 500),
                        ParentID = c.Int(),
                        DisplayOrder = c.Int(),
                        Image = c.String(maxLength: 500),
                        IsShowHome = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        Type = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Profiles",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Gender = c.Boolean(nullable: false),
                        Email = c.String(),
                        Phone = c.String(),
                        Mobile = c.String(),
                        StartDate = c.DateTime(),
                        DOB = c.DateTime(),
                        Lang = c.String(),
                        CountryCode = c.String(),
                        TimezoneCode = c.String(),
                        AvatarPhotoUrl = c.String(maxLength: 255),
                        HighlightColor = c.String(maxLength: 32),
                        UserId = c.String(),
                        UserType = c.Int(nullable: false),
                        ProfileType = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.SystemConfigs",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Code = c.String(nullable: false, maxLength: 50, unicode: false),
                        ValueString = c.String(maxLength: 50),
                        ValueInt = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        AccountId = c.Guid(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accounts", t => t.AccountId, cascadeDelete: true)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Timezones",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CountryCode = c.String(maxLength: 2),
                        Coordinates = c.String(maxLength: 15),
                        TimezoneName = c.String(maxLength: 35),
                        UtcOffset = c.Single(),
                        UtcDstOffset = c.Single(),
                        RawOffset = c.Single(),
                        IsDefault = c.Boolean(nullable: false),
                        Notes = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserAttachments",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        FileName = c.String(),
                        FilePath = c.String(),
                        FileType = c.Int(nullable: false),
                        FileSize = c.Decimal(nullable: false, precision: 18, scale: 2),
                        IsActive = c.Boolean(nullable: false),
                        IsBase64Format = c.Boolean(nullable: false),
                        PhotoBase64Data = c.String(),
                        UserId = c.String(),
                        IsDeleted = c.Boolean(),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserGroups",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        RoleGroupId = c.Guid(nullable: false),
                        UserId = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RoleGroups", t => t.RoleGroupId, cascadeDelete: true)
                .Index(t => t.RoleGroupId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(nullable: false, maxLength: 256),
                        FirstName = c.String(nullable: false, maxLength: 100),
                        LastName = c.String(maxLength: 100),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(maxLength: 256),
                        SecurityStamp = c.String(maxLength: 256),
                        PhoneNumber = c.String(maxLength: 20),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.UserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(maxLength: 500),
                        ClaimValue = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.FunctionClaims",
                c => new
                    {
                        AppClaimId = c.Guid(nullable: false),
                        AppFunctionId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.AppClaimId, t.AppFunctionId })
                .ForeignKey("dbo.AppClaims", t => t.AppClaimId, cascadeDelete: true)
                .ForeignKey("dbo.AppFunctions", t => t.AppFunctionId, cascadeDelete: true)
                .Index(t => t.AppClaimId)
                .Index(t => t.AppFunctionId);
            
            CreateTable(
                "dbo.GroupClaims",
                c => new
                    {
                        RoleGroupId = c.Guid(nullable: false),
                        AppClaimId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.RoleGroupId, t.AppClaimId })
                .ForeignKey("dbo.RoleGroups", t => t.RoleGroupId, cascadeDelete: true)
                .ForeignKey("dbo.AppClaims", t => t.AppClaimId, cascadeDelete: true)
                .Index(t => t.RoleGroupId)
                .Index(t => t.AppClaimId);
            
            CreateTable(
                "dbo.PostTags",
                c => new
                    {
                        PostId = c.Guid(nullable: false),
                        TagId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.PostId, t.TagId })
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.PostId)
                .Index(t => t.TagId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserGroups", "RoleGroupId", "dbo.RoleGroups");
            DropForeignKey("dbo.Teachers", "AccountId", "dbo.Accounts");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.PostTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.PostTags", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Posts", "PostCategoryId", "dbo.PostCategories");
            DropForeignKey("dbo.MessagingMessages", "MessagingTemplateContentId", "dbo.MessagingTemplateContents");
            DropForeignKey("dbo.MessagingTemplateContents", "MessagingTemplateId", "dbo.MessagingTemplates");
            DropForeignKey("dbo.MessagingTemplates", "MessagingTypeId", "dbo.MessagingTypes");
            DropForeignKey("dbo.Menus", "GroupID", "dbo.MenuGroups");
            DropForeignKey("dbo.CRMs", "ManagerId", "dbo.Managers");
            DropForeignKey("dbo.Clients", "AccountId", "dbo.Accounts");
            DropForeignKey("dbo.GroupClaims", "AppClaimId", "dbo.AppClaims");
            DropForeignKey("dbo.GroupClaims", "RoleGroupId", "dbo.RoleGroups");
            DropForeignKey("dbo.FunctionClaims", "AppFunctionId", "dbo.AppFunctions");
            DropForeignKey("dbo.FunctionClaims", "AppClaimId", "dbo.AppClaims");
            DropIndex("dbo.PostTags", new[] { "TagId" });
            DropIndex("dbo.PostTags", new[] { "PostId" });
            DropIndex("dbo.GroupClaims", new[] { "AppClaimId" });
            DropIndex("dbo.GroupClaims", new[] { "RoleGroupId" });
            DropIndex("dbo.FunctionClaims", new[] { "AppFunctionId" });
            DropIndex("dbo.FunctionClaims", new[] { "AppClaimId" });
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.UserGroups", new[] { "RoleGroupId" });
            DropIndex("dbo.Teachers", new[] { "AccountId" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropIndex("dbo.Posts", new[] { "PostCategoryId" });
            DropIndex("dbo.MessagingTemplates", new[] { "MessagingTypeId" });
            DropIndex("dbo.MessagingTemplateContents", new[] { "MessagingTemplateId" });
            DropIndex("dbo.MessagingMessages", new[] { "MessagingTemplateContentId" });
            DropIndex("dbo.Menus", new[] { "GroupID" });
            DropIndex("dbo.CRMs", new[] { "ManagerId" });
            DropIndex("dbo.Clients", new[] { "AccountId" });
            DropTable("dbo.PostTags");
            DropTable("dbo.GroupClaims");
            DropTable("dbo.FunctionClaims");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.UserGroups");
            DropTable("dbo.UserAttachments");
            DropTable("dbo.Timezones");
            DropTable("dbo.Teachers");
            DropTable("dbo.SystemConfigs");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
            DropTable("dbo.Profiles");
            DropTable("dbo.Tags");
            DropTable("dbo.PostCategories");
            DropTable("dbo.Posts");
            DropTable("dbo.MessagingTypes");
            DropTable("dbo.MessagingTemplates");
            DropTable("dbo.MessagingTemplateContents");
            DropTable("dbo.MessagingMessages");
            DropTable("dbo.MessagingDataMapping");
            DropTable("dbo.MenuGroups");
            DropTable("dbo.Menus");
            DropTable("dbo.Managers");
            DropTable("dbo.CRMs");
            DropTable("dbo.Countries");
            DropTable("dbo.Clients");
            DropTable("dbo.RoleGroups");
            DropTable("dbo.AppFunctions");
            DropTable("dbo.AppClaims");
            DropTable("dbo.Accounts");
        }
    }
}

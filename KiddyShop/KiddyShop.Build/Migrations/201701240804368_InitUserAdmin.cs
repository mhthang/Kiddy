namespace KiddyShop.Build.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitUserAdmin : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Accounts", "ProfileId");
            AddForeignKey("dbo.Accounts", "ProfileId", "dbo.Profiles", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accounts", "ProfileId", "dbo.Profiles");
            DropIndex("dbo.Accounts", new[] { "ProfileId" });
        }
    }
}

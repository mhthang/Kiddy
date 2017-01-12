using KiddyShop.Account.Models;
using KiddyShop.Application.Models;
using KiddyShop.Community.Models;
using KiddyShop.Domain;
using KiddyShop.Domain.Models;
using KiddyShop.Messaging.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace KiddyShop.Data.EntityFramework
{
    public class KSDataContext : DbContext, IKSDataContext
    {
        public KSDataContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            Database.SetInitializer<KSDataContext>(null);
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;

            // Sets DateTimeKinds on DateTimes of Entities, so that Dates are automatically set to be UTC.
            // Currently only processes CleanEntityBase entities. All EntityBase entities remain unchanged.
            // http://stackoverflow.com/questions/4648540/entity-framework-datetime-and-utc
            //((IObjectContextAdapter)this).ObjectContext.ObjectMaterialized += (sender, e) => DateTimeKindAttribute.Apply(e.Entity);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
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

            //modelBuilder.Entity<TeacherDivision>()
            //        .HasKey(c => new { c.DivisionId, c.TeacherId });
        }

        #region DECLARE TABLES

        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Timezone> Timezone { get; set; }

        public virtual DbSet<UserAttachment> UserAttachment { get; set; }

        public virtual DbSet<AppClaim> AppClaim { get; set; }
        public virtual DbSet<AppFunction> AppFunction { get; set; }

        public virtual DbSet<RoleGroup> RoleGroup { get; set; }
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

        #endregion DECLARE TABLES

        #region Extension

        public TEntity FindById<TEntity>(params object[] ids) where TEntity : class
        {
            return base.Set<TEntity>().Find(ids);
        }

        public IQueryable<TEntity> Get<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public TEntity Insert<TEntity>(TEntity entity) where TEntity : class
        {
            var result = base.Set<TEntity>().Add(entity);

            var creationTrackingEntity = entity as IEntityTrackingCreation;
            if (creationTrackingEntity != null)
            {
                creationTrackingEntity.DateCreated = DateTime.UtcNow;
            }

            //((IObjectState)entity).State = ObjectState.Added;
            return result;
        }

        public void Update<TEntity>(TEntity entity) where TEntity : class
        {
            base.Set<TEntity>().Attach(entity);

            var modifyTrackingEntity = entity as IEntityTrackingModified;
            if (modifyTrackingEntity != null)
            {
                modifyTrackingEntity.DateModified = DateTime.UtcNow;
            }

            //((IObjectState)entity).State = ObjectState.Modified;
        }

        public void Update<TEntity, TKey>(TEntity entity, params Expression<Func<TEntity, object>>[] properties) where TEntity : class, IEntity<TKey>
        {
            //base.Set<TEntity>().Attach(entity);
            //DbEntityEntry<TEntity> entry = base.Entry(entity);

            //foreach (var selector in properties)
            //{
            //    entry.Property(selector).IsModified = true;
            //}

            Dictionary<object, object> originalValues = new Dictionary<object, object>();
            TEntity entityToUpdate = base.Set<TEntity>().Find(entity.Id);

            foreach (var property in properties)
            {
                var val = base.Entry(entityToUpdate).Property(property).OriginalValue;
                originalValues.Add(property, val);
            }

            //base.Entry(entityToUpdate).State = EntityState.Detached;

            //base.Entry(entity).State = EntityState.Unchanged;
            foreach (var property in properties)
            {
                base.Entry(entity).Property(property).OriginalValue = originalValues[property];
                base.Entry(entity).Property(property).IsModified = true;
            }
        }

        public void Delete<TEntity>(params object[] ids) where TEntity : class
        {
            var entity = FindById<TEntity>(ids);
            //((IObjectState)entity).State = ObjectState.Deleted;
            Delete(entity);
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : class
        {
            base.Set<TEntity>().Attach(entity);
            base.Set<TEntity>().Remove(entity);
        }

        public IQueryable<TEntity> Get<TEntity>(string storedProcedureName, params object[] args) where TEntity : class
        {
            var query = Database.SqlQuery<TEntity>(storedProcedureName, args).ToList();
            foreach (var entity in query)
            {
                //DateTimeKindAttribute.Apply(entity);
            }
            IQueryable<TEntity> result = query.AsQueryable();
            return result;
        }

        public int Execute(string sqlCommand)
        {
            return Database.ExecuteSqlCommand(sqlCommand);
        }

        public int Execute(string sqlCommand, params object[] args)
        {
            var result = Database.ExecuteSqlCommand(sqlCommand, args);
            return result;
        }

        //public void BulkInsert<TEntity>(IList<TEntity> insertList, string tableName, IList<SqlBulkCopyColumnMapping> mapping, DataTable table) where TEntity : class
        //{
        //    using (var connection = new SqlConnection(Database.Connection.ConnectionString))
        //    {
        //        connection.Open();

        //        using (var bulkCopy = new SqlBulkCopy(connection))
        //        {
        //            bulkCopy.BatchSize = 100;
        //            bulkCopy.DestinationTableName = tableName;

        //            foreach (var columnMapping in mapping)
        //            {
        //                bulkCopy.ColumnMappings.Add(columnMapping);
        //            }

        //            bulkCopy.WriteToServer(table);
        //        }

        //        connection.Close();
        //    }
        //}

        #endregion Extension

        private bool _disposed;

        protected override void Dispose(bool isDisposing)
        {
            if (!_disposed)
            {
                if (isDisposing)
                {
                }
                _disposed = true;
            }
            base.Dispose(isDisposing);
        }
    }
}
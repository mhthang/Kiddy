using KiddyShop.Data.EntityFramework;
using KiddyShop.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace KiddyShop.Data.Repositories
{
    public abstract class Repository<TEntity,TKey> where TEntity : class, IEntity<TKey>, new ()
    {
        protected IKSDataContext DataContext;

        protected Repository(IKSDataContext context)
        {
            DataContext = context;
        }
        public IEnumerable<TEntity> GetAll()
        {
            return DataContext.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> GetByIds(IEnumerable<TKey> ids, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = DataContext.Set<TEntity>();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.Where(i => ids.Contains(i.Id));
        }

        public TEntity GetById(TKey id, params Expression<Func<TEntity, object>>[] includes)
        {
            return GetByIds(new[] { id }, includes).FirstOrDefault();
        }

        public IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = DataContext.Set<TEntity>();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query.Where(predicate).AsEnumerable();
        }

        public void Insert(TEntity entity)
        {
            DataContext.Set<TEntity>().Add(entity);
        }

        public void Insert(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                DataContext.Set<TEntity>().Add(entity);
            }
        }

        public void Update(TEntity entity)
        {
            DataContext.Entry(entity).State = EntityState.Modified;
        }

        public void Update(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                DataContext.Entry(entity).State = EntityState.Modified;
            }
        }

        public void Update(TEntity entity, params Expression<Func<TEntity, object>>[] properties)
        {
            DataContext.Set<TEntity>().Attach(entity);
            DbEntityEntry<TEntity> entry = DataContext.Entry(entity);
            foreach (var selector in properties)
            {
                entry.Property(selector).IsModified = true;
            }
        }
        public virtual void Delete(TKey id)
        {
            TEntity fake = new TEntity { Id = id };
            DataContext.Set<TEntity>().Attach(fake);
            DataContext.Set<TEntity>().Remove(fake);
        }

        public void Delete(IEnumerable<TKey> ids)
        {
            foreach (var id in ids)
            {
                Delete(id);
            }
        }

        public virtual void Delete(TEntity entity)
        {
            if (DataContext.Entry(entity).State == EntityState.Detached)
                DataContext.Set<TEntity>().Attach(entity);
            DataContext.Set<TEntity>().Remove(entity);
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Delete(entity);
            }
        }
    }
}

namespace KiddyShop.Domain
{
    public interface IUnitOfWork
    {
        int SaveChanges();
    }
}
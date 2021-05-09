using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IProductRepository
    {
        void Add(Product product);
        void Delete(int productId);
        List<Product> GetAllProducts();
        List<Product> GetProductByUser(int userProfileId);
        void Update(Product product);
    }
}
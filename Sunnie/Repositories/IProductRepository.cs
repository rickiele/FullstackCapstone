using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts();
    }
}
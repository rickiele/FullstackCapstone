using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavoritesForUser(int id);
    }
}
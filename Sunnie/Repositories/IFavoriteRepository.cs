using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IFavoriteRepository
    {
        Favorite Add(Favorite favorite);
        void Delete(int favoriteId);
        List<Favorite> GetAllFavoritesForUser(int id);
        Favorite GetFavoriteById(int id);
    }
}
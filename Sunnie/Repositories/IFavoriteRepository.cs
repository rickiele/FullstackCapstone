using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IFavoriteRepository
    {
        void Add(Favorite favorite);
        void Delete(int favoriteId);
        List<Favorite> GetAllFavoritesForUser(int id);
        Favorite GetFavoriteById(int id);
    }
}
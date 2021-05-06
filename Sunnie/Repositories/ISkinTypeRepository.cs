using Sunnie.Models.Quiz;
using System.Collections.Generic;
using Sunnie.Models;

namespace Sunnie.Repositories
{
    public interface ISkinTypeRepository
    {
        List<SkinType> GetAllSkinTypes();
        SkinType GetSkinTypeById(int id);
    }
}
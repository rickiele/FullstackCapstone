using Sunnie.Models;
using System.Collections.Generic;

namespace Sunnie.Repositories
{
    public interface IPrecautionRepository
    {
        List<Precaution> GetAllPrecautions();
    }
}
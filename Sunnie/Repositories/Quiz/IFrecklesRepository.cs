using Sunnie.Models.Quiz;
using System.Collections.Generic;

namespace Sunnie.Repositories.Quiz
{
    public interface IFrecklesRepository
    {
        List<Freckles> GetAllFreckles();
    }
}
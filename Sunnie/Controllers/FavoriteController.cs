using Microsoft.AspNetCore.Mvc;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class FavoriteController : Controller
    {
        private readonly IFavoriteRepository _favoriteRepository;

        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }


        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var f = _favoriteRepository.GetAllFavoritesForUser(id);
            if (f == null)
            {
                return NotFound();
            }
            return Ok(f);
        }
    }
}

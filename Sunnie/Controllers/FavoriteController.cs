using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Models;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class FavoriteController : Controller
    {
        private readonly IFavoriteRepository _favoriteRepository;

        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }


        [HttpGet("getbyUserId/{id}")]
        public IActionResult Get(int id)
        {
            var f = _favoriteRepository.GetAllFavoritesForUser(id);
            if (f == null)
            {
                return NotFound();
            }
            return Ok(f);
        }

        [HttpPost("Add")]
        public IActionResult Post(Favorite favorite)
        {
            _favoriteRepository.Add(favorite);
            return CreatedAtAction("Details", new { id = favorite.Id }, favorite);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _favoriteRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("getFavoriteById/{favoriteId}")]
        public IActionResult GetById(int favoriteId)
        {
            var favorite = _favoriteRepository.GetFavoriteById(favoriteId);
            if (favorite == null)
            {
                return NotFound();
            }
            return Ok(favorite);
        }
    }
}

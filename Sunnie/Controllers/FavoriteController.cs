﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Models;
using Sunnie.Repositories;


namespace Sunnie.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class FavoriteController : BaseController
    {

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
            var f = _favoriteRepository.Add(favorite);
            return Ok(f);
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

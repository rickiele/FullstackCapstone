using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Models;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SkinTypeController : BaseController
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_skinTypeRepository.GetAllSkinTypes());
        }

        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            SkinType st = _skinTypeRepository.GetSkinTypeById(id);
            if (st == null)
            {
                return NotFound();
            }
            return Ok(st);
        }

    }
}

using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SkinTypeController : ControllerBase
    {
        private readonly ISkinTypeRepository _skinTypeRepository;
        public SkinTypeController(ISkinTypeRepository skinTypeRepository)
        {
            _skinTypeRepository = skinTypeRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_skinTypeRepository.GetAllSkinTypes());
        }

    }
}

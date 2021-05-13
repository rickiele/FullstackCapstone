using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sunnie.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PrecautionController : BaseController
    {
        public PrecautionController(IPrecautionRepository precautionRepository)
        {
            _precautionRepository = precautionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_precautionRepository.GetAllPrecautions());
        }

    }
}

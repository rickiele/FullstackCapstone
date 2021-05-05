using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Repositories.Quiz;
using Sunnie.Repositories;
using Sunnie.Models;

namespace Sunnie.Controllers.Quiz
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FrecklesController : ControllerBase
    {
        private readonly IFrecklesRepository _frecklesRepository;
        public FrecklesController(IFrecklesRepository frecklesRepository)
        {
            _frecklesRepository = frecklesRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_frecklesRepository.GetAllFreckles());
        }


    }
}

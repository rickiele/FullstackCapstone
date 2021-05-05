using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Models;
using System;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { FirebaseId = userProfile.FirebaseId },
                userProfile);
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUserProfiles());
        }



        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var up = _userProfileRepository.GetUserProfileById(id);
            if (up == null)
            {
                return NotFound();
            }
            return Ok(up);
        }


    }
}

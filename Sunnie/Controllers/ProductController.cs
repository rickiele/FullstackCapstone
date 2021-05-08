using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sunnie.Models;
using Sunnie.Repositories;

namespace Sunnie.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ProductController(
            IProductRepository productRepository,
            IUserProfileRepository userProfileRepository
            )
        {
            _productRepository = productRepository;
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productRepository.GetAllProducts());
        }

        [HttpGet("GetByUser")]
        public IActionResult GetByUser(int userId)
        {
            var userProducts = _productRepository.GetProductByUser(userId);
            if (userProducts == null)
            {
                return NotFound();
            }
            return Ok(userProducts);
        }

        [HttpPost("add")]
        public IActionResult Post(Product product)
        {
            var currentUserProfile = GetCurrentUserProfile();
            product.UserProfileId = currentUserProfile.Id;
            _productRepository.Add(product);
            return CreatedAtAction("Get", new { id = product.Id }, product);
        }

        [HttpDelete("delete/{productId}")]
        public IActionResult Delete(int productId)
        {
            _productRepository.Delete(productId);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseId);
        }

    }
}

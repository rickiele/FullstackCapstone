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
    public class ProductController : BaseController
    {
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
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _productRepository.Add(product);
            return NoContent();
        }

        [HttpDelete("delete/{productId}")]
        public IActionResult Delete(int productId)
        {

            _productRepository.Delete(productId);
            return NoContent();
        }


        [HttpPut("update/{id}")]
        public IActionResult Put(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _productRepository.Update(product);
            return NoContent();
        }




    }
}

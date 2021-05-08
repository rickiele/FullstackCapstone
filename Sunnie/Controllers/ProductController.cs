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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
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

    }
}

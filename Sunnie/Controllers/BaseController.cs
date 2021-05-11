using Sunnie.Models;
using Sunnie.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Sunnie.Controllers
{
    public class BaseController : Controller
    {
        protected IUserProfileRepository _userProfileRepository;
        protected ISkinTypeRepository _skinTypeRepository;
        protected IProductRepository _productRepository;
        protected IFavoriteRepository _favoriteRepository;
        protected UserProfile UserProfile;
        public BaseController() { }

        protected UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseId);
        }
    }
}

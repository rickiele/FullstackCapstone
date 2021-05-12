using Sunnie.Models;
using System.Collections.Generic;

// The interface lets us know what methods are in the repository, and can be used in the controller
namespace Sunnie.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseId);
        UserProfile GetUserProfileById(int id);
        void Update(UserProfile userProfile);
    }
}
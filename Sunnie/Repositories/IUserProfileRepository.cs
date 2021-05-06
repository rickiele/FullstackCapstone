using Sunnie.Models;
using System.Collections.Generic;

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
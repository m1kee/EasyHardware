using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Business.Services
{
    public class AuthService : IAuthService
    {
        public User SignIn(EasyHardwareEntities context, string username, string password)
        {
            // get an user by username and password and returns the user without sending the password
            var user = context.User.FirstOrDefault(x => x.UserName.Equals(username, StringComparison.InvariantCultureIgnoreCase) &&
                                               x.Password.Equals(password, StringComparison.InvariantCultureIgnoreCase));
            if (user != null)
            {
                user.Password = null;
            }

            return user;
        }
    }
}

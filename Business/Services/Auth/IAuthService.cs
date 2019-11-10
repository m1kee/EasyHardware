using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IAuthService
    {
        User SignIn(EasyHardwareEntities context, string username, string password);
    }
}

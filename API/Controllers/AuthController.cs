using API.Models;
using Business.Services;
using Domain;
using Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        private readonly IAuthService authService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [ActionName("SignIn")]
        public IHttpActionResult SignIn([FromBody]SignInRequest credentials)
        {
            IHttpActionResult result = null;
            try
            {
                if (credentials != null)
                {
                    if (string.IsNullOrWhiteSpace(credentials.Username))
                        throw new Exception($"Debe ingresar el nombre de usuario.");

                    if (string.IsNullOrWhiteSpace(credentials.Password))
                        throw new Exception($"Debe ingresar la contraseña.");

                    credentials.Password = EncryptHelper.SHA256(credentials.Password);

                    User user = authService.SignIn(context, credentials.Username, credentials.Password);
                    if (user != null)
                        result = Ok(user.Map(true));
                    else
                        throw new Exception($"Credenciales incorrectas.");
                }
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

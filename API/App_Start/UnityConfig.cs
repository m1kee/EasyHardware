using Business.Services;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace API
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers
            container.RegisterType<ICategoryService, CategoryService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
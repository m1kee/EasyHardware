using Business.Services;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class CategoryController : ApiController
    {
        private readonly ICategoryService categoryService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        /// <summary>
        /// This method returns all categories
        /// </summary>
        /// <returns>List<Category></returns>
        [HttpGet]
        public IHttpActionResult Get()
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.categoryService.Get(context));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }

        /// <summary>
        /// This method returns a specific category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns>Category</returns>
        [HttpGet]
        public IHttpActionResult Get([FromUri(Name = "id")] int categoryId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.categoryService.Get(context, categoryId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Category category)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.categoryService.Add(context, category));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

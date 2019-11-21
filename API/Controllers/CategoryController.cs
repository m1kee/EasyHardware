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
        [ActionName("GetAll")]
        public IHttpActionResult Get([FromUri(Name = "id")] bool onlyUnparent)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.categoryService.Get(context, onlyUnparent).MapAll(true));
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
        [ActionName("GetById")]
        public IHttpActionResult Get([FromUri(Name = "id")] int categoryId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.categoryService.Get(context, categoryId).Map(true));
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
        /// <param name="categoryCode"></param>
        /// <returns>Category</returns>
        [HttpGet]
        [ActionName("GetByCode")]
        public IHttpActionResult Get([FromUri(Name = "id")] string categoryCode)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.categoryService.Get(context, categoryCode).Map(true));
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

        [HttpPut]
        public IHttpActionResult Put([FromUri(Name = "id")] int categoryId, [FromBody]Category category)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.categoryService.Edit(context, categoryId, category));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }

        [HttpDelete]
        public IHttpActionResult Delete([FromUri(Name = "id")] int categoryId)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.categoryService.Delete(context, categoryId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

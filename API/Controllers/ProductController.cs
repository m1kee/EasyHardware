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
    public class ProductController : ApiController
    {
        private readonly IProductService productService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public ProductController(IProductService productService) {
            this.productService = productService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.productService.Get(context));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpGet]
        public IHttpActionResult Get([FromUri(Name = "id")] int productId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.productService.Get(context, productId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]Product product)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.productService.Add(context, product));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPut]
        public IHttpActionResult Put([FromUri(Name = "id")] int productId, [FromBody]Product product)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.productService.Edit(context, productId, product));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpDelete]
        public IHttpActionResult Delete([FromUri(Name = "id")] int productId)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.productService.Delete(context, productId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

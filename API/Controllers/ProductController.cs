﻿using Business.Services;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/Product")]
    public class ProductController : ApiController
    {
        private readonly IProductService productService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public ProductController(IProductService productService) {
            this.productService = productService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        [Route("GetAll")]
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
        [ActionName("GetById")]
        [Route("GetById/{id:int}")]
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
        [HttpGet]
        [ActionName("GetByCode")]
        [Route("GetByCode/{id}")]
        public IHttpActionResult Get([FromUri(Name = "id")] string productPartNumber)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.productService.Get(context, productPartNumber));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPost]
        [ActionName("")]
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
        [ActionName("")]
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
        [ActionName("")]
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

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
    [RoutePrefix("api/Store")]
    public class StoreController : ApiController
    {
        private readonly IStoreService storeService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public StoreController(IStoreService storeService)
        {
            this.storeService = storeService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.storeService.Get(context));
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
        public IHttpActionResult Get([FromUri(Name = "id")] int storeId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.storeService.Get(context, storeId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        /// <summary>
        /// This method returns a specific store
        /// </summary>
        /// <param name="storeCode"></param>
        /// <returns>Store</returns>
        [HttpGet]
        [ActionName("GetByCode")]
        [Route("GetByCode/{id}")]
        public IHttpActionResult Get([FromUri(Name = "id")] string storeCode)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.storeService.Get(context, storeCode));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]Store store)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.storeService.Add(context, store));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPut]
        public IHttpActionResult Put([FromUri(Name = "id")] int storeId, [FromBody]Store store)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.storeService.Edit(context, storeId, store));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpDelete]
        public IHttpActionResult Delete([FromUri(Name = "id")] int storeId)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.storeService.Delete(context, storeId));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

using Business.Services;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Transactions;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/Store")]
    public class StoreController : ApiController
    {
        private readonly IStoreService storeService;
        private readonly IStockService stockService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public StoreController(IStoreService storeService, IStockService stockService)
        {
            this.storeService = storeService;
            this.stockService = stockService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.storeService.Get(context).MapAll(false));
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
                result = Ok(this.storeService.Get(context, storeId).Map(true));
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
                result = Ok(this.storeService.Get(context, storeCode).Map(true));
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
                using (TransactionScope scope = new TransactionScope())
                {
                    // creating the store
                    Store createdStore = this.storeService.Add(context, store);
                    // generate stock for the store
                    this.stockService.GenerateStock(context, store);
                    // commit the transaction
                    scope.Complete();

                    // generate response
                    result = Ok(createdStore.Map(true));
                }
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
                result = Ok(this.storeService.Edit(context, storeId, store).Map(true));
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
                result = Ok(this.storeService.Delete(context, storeId).Map(true));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

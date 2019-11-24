using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models;
using Business.Services;
using Domain;

namespace API.Controllers
{
    [RoutePrefix("api/Stock")]
    public class StockController : ApiController
    {
        private readonly IStockService stockService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public StockController(IStockService stockService)
        {
            this.stockService = stockService;
        }


        [HttpPost]
        [ActionName("GetAll")]
        [Route("GetAll")]
        public IHttpActionResult Get([FromBody] StockFilters stockFilters)
        {
            IHttpActionResult result;

            try
            {
                List<int> storeIds = stockFilters.Stores?.Any() ?? false ? stockFilters.Stores.Select(x => x.Id).ToList() : null;
                result = Ok(this.stockService.Get(context, storeIds, stockFilters.ProductName).MapAll(true));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }

        [HttpPut]
        public IHttpActionResult Put([FromUri(Name = "id")] int stockId, [FromBody]Stock stock)
        {
            IHttpActionResult result;

            try
            {
                // TODO: validate things
                result = Ok(this.stockService.Edit(context, stockId, stock).Map(true));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

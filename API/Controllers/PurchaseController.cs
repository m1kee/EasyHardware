using API.Models;
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
    [RoutePrefix("api/Purchase")]
    public class PurchaseController : ApiController
    {
        private readonly IPurchaseService purchaseService;
        private readonly EasyHardwareEntities context = new EasyHardwareEntities();

        public PurchaseController(IPurchaseService purchaseService)
        {
            this.purchaseService = purchaseService;
        }

        [HttpGet]
        [ActionName("GetAll")]
        [Route("GetAll/{id:int}")]
        public IHttpActionResult GetAll([FromUri(Name = "id")] int userId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.purchaseService.GetAll(context, userId));
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
        public IHttpActionResult Get([FromUri(Name = "id")] int purchaseId)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.purchaseService.Get(context, purchaseId));
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
        public IHttpActionResult Get([FromUri(Name = "id")] Guid purchaseCode)
        {
            IHttpActionResult result;

            try
            {
                result = Ok(this.purchaseService.Get(context, purchaseCode));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
        [HttpPost]
        public IHttpActionResult Post([FromUri(Name = "id")] int userId, [FromBody]PurchaseRequest purchaseRequest)
        {
            IHttpActionResult result;

            try
            {
                // validate that the purchase has an item
                if (purchaseRequest.ShoppingCartItems == null || !purchaseRequest.ShoppingCartItems.Any())
                    throw new InvalidOperationException($"No hay items en el carro de compras");

                // generate details
                List<PurchaseDetail> purchaseDetails = new List<PurchaseDetail>();
                decimal total = 0;
                foreach (ShoppingCartItem shoppingCartItem in purchaseRequest.ShoppingCartItems)
                {
                    purchaseDetails.Add(new PurchaseDetail()
                    {
                        ProductId = shoppingCartItem.Item.Id,
                        ProductValue = shoppingCartItem.Item.Price,
                        Quantity = shoppingCartItem.Count
                    });

                    total += (shoppingCartItem.Item.Price * shoppingCartItem.Count);
                }

                // generate the purchase 
                Purchase purchase = new Purchase()
                {
                    Client = userId,
                    Code = Guid.NewGuid(),
                    Date = DateTime.Now,
                    StateId = (int)Enums.PurchaseState.Paid,
                    Total = total,
                    PurchaseDetail = purchaseDetails
                };

                result = Ok(this.purchaseService.Add(context, purchase));
            }
            catch (Exception ex)
            {
                result = BadRequest(ex.Message);
            }

            return result;
        }
    }
}

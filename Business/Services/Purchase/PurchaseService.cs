using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Business.Services
{
    public class PurchaseService : IPurchaseService
    {
        /// <summary>
        /// Returns all purchases from an user
        /// </summary>
        /// <param name="context"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IList<Purchase> GetAll(EasyHardwareEntities context, int userId)
        {
            return context.Purchase.Where(x => x.Client == userId).ToList();
        }

        /// <summary>
        /// Gets a purchase by Id
        /// </summary>
        /// <param name="context"></param>
        /// <param name="purchaseId"></param>
        /// <returns></returns>
        public Purchase Get(EasyHardwareEntities context, int purchaseId)
        {
            // get the attached purchase 
            return context.Purchase.SingleOrDefault(x => x.Id == purchaseId);
        }

        /// <summary>
        /// Gets a purchase by Code
        /// </summary>
        /// <param name="context"></param>
        /// <param name="purchaseCode"></param>
        /// <returns></returns>
        public Purchase Get(EasyHardwareEntities context, Guid purchaseCode)
        {
            // get the attached purchase 
            return context.Purchase.SingleOrDefault(x => x.Code == purchaseCode);
        }

        /// <summary>
        /// Generate a purchase
        /// </summary>
        /// <param name="context"></param>
        /// <param name="purchase"></param>
        /// <returns></returns>
        public Purchase Add(EasyHardwareEntities context, Purchase purchase)
        {
            // add purchase to context
            context.Purchase.Add(purchase);
            // save changes
            context.SaveChanges();
            return purchase;
        }
    }
}

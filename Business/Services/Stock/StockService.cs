using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Business.Services
{
    public class StockService : IStockService
    {
        public Stock Edit(EasyHardwareEntities context, int stockId, Stock stock)
        {
            // get the attached stock 
            Stock dbStock = context.Stock.Single(x => x.Id == stockId);
            // edit values
            dbStock.Quantity = stock.Quantity;
     
            // save changes after edit
            context.SaveChanges();
            // return edited stock
            return stock;
        }

        public IList<Stock> Get(EasyHardwareEntities context, int? storeId, string productName)
        {
            return context.Stock.Where(x => storeId == null || x.StoreId == storeId)
                .Where(x => string.IsNullOrWhiteSpace(productName) || x.Product.Name.Contains($"/{productName}/"))
                .ToList();
        }
    }
}

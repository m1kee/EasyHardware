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
        public void GenerateStock(EasyHardwareEntities context, Product product)
        {
            // get all stores to generate stock for this product
            List<Store> stores = context.Store.ToList();

            if (stores != null && stores.Any())
            {
                foreach (Store store in stores)
                {
                    context.Stock.Add(new Stock()
                    {
                        ProductId = product.Id,
                        StoreId = store.Id,
                        Quantity = 0
                    });
                }

                context.SaveChanges();
            }
        }

        public void GenerateStock(EasyHardwareEntities context, Store store)
        {
            // get all products to generate stock all products
            List<Product> products = context.Product.ToList();

            if (products != null && products.Any())
            {
                foreach (Product product in products)
                {
                    context.Stock.Add(new Stock()
                    {
                        ProductId = product.Id,
                        StoreId = store.Id,
                        Quantity = 0
                    });
                }

                context.SaveChanges();
            }
        }
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

        public IList<Stock> Get(EasyHardwareEntities context, List<int> storeIds, string productName)
        {
            var stocks = context.Stock.AsQueryable();

            if (storeIds != null && storeIds.Any())
            {
                stocks = stocks.Where(x => storeIds.Any(y => y == x.StoreId));
            }

            if (!string.IsNullOrWhiteSpace(productName))
            {
                stocks = stocks.Where(x => x.Product.Name.Contains(productName));
            }

            return stocks.ToList();
        }
    }
}

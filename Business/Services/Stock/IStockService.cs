using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IStockService
    {
        void GenerateStock(EasyHardwareEntities context, Product product);
        void GenerateStock(EasyHardwareEntities context, Store store);
        IList<Stock> Get(EasyHardwareEntities context, List<int> storeIds, string productName);
        Stock Edit(EasyHardwareEntities context, int stockId, Stock stock);
    }
}

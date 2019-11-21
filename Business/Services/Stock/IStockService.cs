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
        IList<Stock> Get(EasyHardwareEntities context, int? storeId, string productName);
        Stock Edit(EasyHardwareEntities context, int stockId, Stock stock);
    }
}

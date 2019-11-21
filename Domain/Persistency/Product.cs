using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class Product : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (this.Stocks != null && this.Stocks.Any())
            {
                result.DefaultStock = this.Stocks.FirstOrDefault(x => x.Store.Code.Equals("internet", StringComparison.InvariantCultureIgnoreCase)).Map(false);
            }

            if (customMap)
            {
                if (this.Categories != null && this.Categories.Any())
                {
                    result.Categories = this.Categories.MapAll(false);
                }

                if (this.Stocks != null && this.Stocks.Any())
                {
                    result.Stocks = this.Stocks.MapAll(false);
                }
            }

            return result;
        }
    }
}

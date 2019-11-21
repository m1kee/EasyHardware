using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class Store : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.Stocks != null && this.Stocks.Any())
                {
                    result.Stocks = this.Stocks.MapAll(true);
                }
            }

            return result;
        }
    }
}

using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class Stock : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.Product != null)
                {
                    result.Product = this.Product.Map(false);
                }

                if (this.Store != null)
                {
                    result.Store = this.Store.Map(false);
                }
            }

            return result;
        }
    }
}

using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class UserAdress : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.Adress != null)
                {
                    result.Adress = this.Adress.Map(false);
                }
            }

            return result;
        }
    }
}

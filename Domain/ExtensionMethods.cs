using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public static class ExtensionMethods
    {
        public static JArray MapAll<TEntity>(this IEnumerable<TEntity> items, bool customMap = false) where TEntity : EasyHardwareBase
        {
            JArray result = null;

            if (items != null)
            {
                result = new JArray();
            }

            foreach (var item in items)
            {
                result.Add(item.Map(customMap: customMap));
            }

            return result;
        }
    }
}

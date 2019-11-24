using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class StockFilters
    {
        public List<Store> Stores { get; set; }
        public string ProductName { get; set; }
    }
}